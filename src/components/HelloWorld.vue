<template>
  <div class="">
    <ul class="numberLit">
      <li class="green">
        <a>治愈</a>
        <b>{{zhiyu}}</b>
        <p>较昨日 <span>+{{prevZhiyu}}</span></p>
      </li>
      <li class="black">
        <a>死亡</a>
        <b>{{siwang}}</b>
        <p>较昨日 <span>+{{prevsiwang}}</span></p>
      </li>
      <li class="yellow">
        <a>疑似</a>
        <b>{{yisi}}</b>
        <p>较昨日 <span>+{{prevyisi}}</span></p>
      </li>
      <li class="blue">
        <a>确诊</a>
        <b>{{quezhen}}</b>
        <p>较昨日 <span>+{{prevquezhen}}</span></p>
      </li>
    </ul>
    <div class="retPro">
        <a href="javascript:void(0);" @click="goBackProeMap()">全国地图</a>
    </div>
    <div class="chinaecharts">
        <div id="mapChart" ref="mapChart" class="mapChart" ></div>
    </div>
    
  </div>
</template>

<script>
var r = require.context('echarts/map/js/province')
r.keys().forEach(r)
export default {
  components: {
  },
  data () {
    return {
      zhiyu:'',
      prevZhiyu:'',
      siwang:'',
      prevsiwang:'',
      yisi:'',
      prevyisi:'',
      quezhen:'',
      prevquezhen:'',

      shengData:[],
      shiData:[],
      mapChart: null,
      level: 1
    }
  },
  mounted () {
    this.getNumber()
    // this.mapFn();
  },
  beforeDestroy () {
    this.mapChart.clear()
  },
  methods: {
    arrangementData (arr1, arr2) {
      let s = arr1.reduce((a, item) => {  
      let obj = {  
        ...item,  
        data: []  
      }  
      arr2.forEach(i => i.cid === item.id && obj.data.push(i))  
      a.push(obj)  
        return a  
      }, [])  
      return s
    },
    goBackProeMap(){
      const _this = this
      $(".retPro").hide()
      // this.mapFn();
      _this.level = 1
      _this.clickMap(_this.shengData)
    },
    getNumber(){
      const _this = this
      this.$axios.post('/api/dayStatistics/findTodayData')
      .then(function (data) {
        // console.log(data)
        data = data.data.result
        // console.log(data)
        _this.zhiyu = data.curedCount
        if(data.cureIncrement == null){
          _this.prevZhiyu = "暂无"
        }else{
          _this.prevZhiyu = data.cureIncrement
        }
        _this.siwang = data.deadCount
        if(data.deathIncrement == null){
          _this.prevsiwang = "暂无"
        }else{
          _this.prevsiwang = data.deathIncrement
        }
        _this.yisi = data.suspectedCount
        if(data.suspectedIncrement == null){
          _this.prevyisi = "暂无"
        }else{
          _this.prevyisi = data.suspectedIncrement
        }
        _this.quezhen = data.confirmedCount
        if(data.caseIncrement == null){
          _this.prevquezhen = "暂无"
        }else{
          _this.prevquezhen = data.caseIncrement
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    mapFn(){
      const _this = this
      this.$axios.get('/api/gmtown/findCitys')
      .then(function (data) {
        let shengData = []
        let shiData = []
        data = data.data.result
        data.map(item => {
          let object = {}
          if(item.townName.includes('内蒙古')){
            object.name = '内蒙古'
          }else if(item.townName.includes('自治区')) {
            let length = item.townName.length
            object.name = item.townName.slice(0,2)
          }else{
            let length = item.townName.length
            object.name = item.townName.slice(0,length - 1)
          }
          object.value = item.currentStatistics.confirmedCount
          object.confirmedCount = item.currentStatistics.confirmedCount
          object.curedCount = item.currentStatistics.curedCount
          object.deadCount = item.currentStatistics.deadCount
          object.suspectedCount = item.currentStatistics.suspectedCount
          shengData.push(object)
          item.citys.map(item2 => {
            let childObj = {}
            childObj.name = item2.townName
            childObj.value = item2.currentStatistics.confirmedCount
            childObj.confirmedCount = item.currentStatistics.confirmedCount
            childObj.curedCount = item.currentStatistics.curedCount
            childObj.deadCount = item.currentStatistics.deadCount
            childObj.suspectedCount = item.currentStatistics.suspectedCount
            shiData.push(childObj)
            return item2
          })
          return item
        })
        _this.shengData = shengData
        console.log(_this.shengData)
        _this.shiData = shiData
        _this.clickMap(_this.shengData)
      })
      .catch(function (error) {
        console.log(error)
      })    
    },
    clickMap(mapData) {
      const _this = this
      // 基于准备好的dom，初始化echarts实例
      // var mapChart = this.$echarts.init(this.$refs.mapChart);
      _this.mapChart = this.$echarts.init(document.getElementById('mapChart'));
      let option = _this.getOption(mapData)
      _this.mapChart.setOption(option, true, false)

      _this.mapChart.on('click', function (result) {
        $(".retPro").show()
        if(_this.level >= 2){
          return
        }
        option = _this.getOption(_this.shiData)
        option.title.text = result.name
        option.series[0].map = result.name
        _this.mapChart.setOption(option, true, false);
        _this.level++
      })
      // window.addEventListener('resize', () => {
      //     // 自动渲染echarts
      //     _this.mapChart.resize();
      // })
    },
    getOption(mapData) {
      console.log(mapData)
      const _this = this
      let option = {
        backgroundColor: '', //背景颜色
        title: {
            text: '中国',
            // subtext: 'China',
            color: '#fff',
            x:'center',
            top: '50px'
        },
        //是视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）。
        visualMap: {
          // min: 0, //最小值
          // max: 1000, //最大值
          // // bottom:"20px",
          // calculable: true, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
          // //text: ['>1000人','1-9人'],
          // color:['#8e232b','#c53036','#f58f79','#f6bb99']
          type: 'piecewise',
          // inverse: true,
          left: 10,
          bottom: 10,
          pieces: [ 
            {gte: 1000,color: '#75141d'},
            {gte: 500, lt: 1000,color: '#c92d30'},
            {gte: 100, lt: 499,color: '#e5624f'},
            {gte: 10, lt: 99,color: '#f2a88d'},
            {gte: 1, lt: 9,color: '#fceed3'},
            {value: 0,color: '#f5f5f5'},
            // {value:0 ,color: '#ccc'}
          ],
          itemGap: 5, // 两个图元之间的间距
        },
        // 提示框，鼠标移入
        tooltip:{
            show:true, //鼠标移入是否触发数据
            trigger: 'item', //出发方式
            formatter:function(value){
              let str = value.name
              for(let i=0;i<mapData.length;i++){
                if(mapData[i].name.includes(value.name)){
                  str = `${str}<br />确诊 ${mapData[i].confirmedCount}
                    <br />治愈 ${mapData[i].curedCount}<br />疑似 ${mapData[i].suspectedCount}
                    <br />死亡 ${mapData[i].deadCount}`
                }
              }
              return str
            }
        },
        series:[
            {
                name:'地图',
                type: 'map',  //地图种类
                map: 'china', //地图类型。
                data: mapData,
                itemStyle: { //地图区域的多边形 图形样式。
                    emphasis:{ //高亮状态下的样试
                        label:{
                            show:true,
                        }
                    }
                },
                zoom:1.2,//放大比例
                label: {  //图形上的文本标签，可用于说明图形的一些数据信息
                    show:true,
                },
            },
            {
                type:'scatter',
                showEffectOn: 'render',//配置什么时候显示特效
                coordinateSystem:'geo',//该系列使用的坐标系
                symbolSize:10,//标记的大小
                zlevel:99999
            }
        ]
      }
      return option
    }
    //
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.numberLit{
  height: 60px;
}
.numberLit li{
  width: 20%;
  float: left;
  background: #efefef;
  border-radius: 5px;
  margin: 10px 2% 0 1%;
}
.numberLit li:nth-child(1){
  margin: 10px 2% 0 5%;
}
.numberLit li a{
  display: block;
  color: #171717;
  text-align: center;
  font-size: 1.2rem;
  margin-top: 8px;
}
.numberLit li b{
  display: block;
  text-align: center;
  font-size: 1.8rem;
}
.numberLit li p{
  color: #999999;
  text-align: center;
  font-size: 0.7rem;
  margin-bottom: 8px;
}
.numberLit li.green b,
.numberLit li.green p span{
  color: #2ec89b;
}
.numberLit li.black b,
.numberLit li.black p span{
  color: #52436b;
}
.numberLit li.yellow b,
.numberLit li.yellow p span{
  color: #f78a16;
}
.numberLit li.blue b,
.numberLit li.blue p span{
  color: #157fc9;
}
.chinaecharts {
    width: 100%;
    height: 400px;
}
.mapChart {
    width: 100%;
    height: 100%;
}
.retPro{z-index:999;position: absolute;top: 280px;left:10px; display: none;}
.retPro a{height:30px;line-height: 30px;border:1px solid #ccc;padding:5px 10px;margin-left:20px;border-radius:5px;cursor: pointer;}
</style>
