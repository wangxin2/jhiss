<template>
	<div class="MenuPage">
		<div class="pageTop">头部标题</div>
    <div class="page_body">
      <div style="float:left;height:100%;background:#545c64">
        <el-button type="primary" @click="switchClick" style="width:100%;">切换</el-button>
        <el-menu default-active="2" class="el-menu-vertical-demo" 
          background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
          @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <!--
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            -->
            <el-submenu index="1-4">
              <span slot="title">选项4</span>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="bodyContent" :style="[{width:isCollapse?'calc(100% - 70px)':'calc(100% - 205px)'}]"></div>
    </div>
	</div>
</template>
<script>
export default {
  name: 'MenuPage',
  data () {
    return {
			isCollapse:false,
      menuList:[
      ]
    }
  },
	watch: {
		
	},
  mounted() {
    // this.$root.eventHub.$on("changeParam", (n)=>{
    //     this.getTraffData()
    // });
    this.init()
  },
  methods: {
    init() {
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    switchClick(){
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style lang="stylus" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.MenuPage
	width:100%
	height:100%
.pageTop
  width 100%
  height 100px
  background #545c64
  font-size 20px
  line-height 100px
  text-align center
.page_body
  width:100%
  height:calc(100% - 100px)
  .bodyContent
    float left
    height 100%
</style>
