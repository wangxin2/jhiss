<template>
  <div class="RealEpidemic">
    <ul>
      <li v-for="(item,index) of DataLi" :key="index">
        <h6>{{item.sendTime}}<span>{{item.fromName}}</span></h6>
        <p class="li_p" v-html="item.content">{{item.content}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      DataLi:[]
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init(){
      const _this = this
      this.$axios.get('http://ncov.news.dragon-yuan.me/api/news?search=&page=')
      .then(function (data) {
        _this.DataLi = data.data.result.list
      })
      .catch(function (error) {
        console.log(error)
      }) 
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.RealEpidemic{
    height: calc( 100% - 32px);
    overflow-y auto;
}
.RealEpidemic li{
  margin: 10px;
  background: #efefef;
  padding: 10px;
}
.RealEpidemic li h6{
  text-align: left;
  color: #999;
  font-size: 0.8rem; 
}
.RealEpidemic li h6 span{
  float right
}
.RealEpidemic li p{
  margin-top: 3px;
  font-size: 1rem;
  text-indent: 24px;
  color: #333;
}
.li_p{
  text-align: left;
  text-indent:50px;
}
</style>
