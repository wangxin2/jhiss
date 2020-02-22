<template>
  <div class="OnlineClinic">
      <iframe src="https://i.snssdk.com/ugc/hotboard_fe/hot_list/template/hot_list/forum_tab.html?activeWidget=8&city_code=110000&city_name=%E5%8C%97%E4%BA%AC&tt_from=weixin&utm_source=weixin&utm_medium=toutiao_ios&utm_campaign=client_share&wxshare_count=1" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
    }
  },
  mounted () {

  },
  methods: {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.OnlineClinic{
    height: calc( 100% - 191px);
    position: absolute;
    top: 190px;
    width: 100%;
}
.OnlineClinic iframe{
    width:100%;
    height 100%;
    overflow-y auto;
}
</style>
