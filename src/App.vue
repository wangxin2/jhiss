<template>
  <div id="app" class="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  mounted() {
    // this.init()
  },
  methods: {
    init() {
    }
  }
}
</script>
<style>
html, body { margin: 0 auto; width:100%; height:100%; overflow: hidden; -webkit-font-smoothing: antialiased;  -moz-osx-font-smoothing: grayscale;}
html{font-size:62.5%;}
body{ font-size:12px; color: #333; font-size:1.2rem; font-family: "Microsoft yahei"; width:100%; height:100%; background-size: 100% 100%;}

body >>> .el-dropdown-menu__item--divided:before{
  background:#00081d !important;
}
body >>> .el-dropdown-menu__item--divided{
  border-top:1px solid #00081d !important;
}
body >>> .el-popper .popper__arrow::after{
  border-top-color:#00081d;
}

</style>
<style scoped>
.app{width:100%;height:100%;}
</style>