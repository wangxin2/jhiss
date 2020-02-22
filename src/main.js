import Vue from "vue";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import request from '@/utils/request'
import echarts from 'echarts';
import 'echarts/map/js/china';
Vue.prototype.$echarts = echarts;
Vue.prototype.$request = request
Vue.prototype.$findRouter = findRouter
// import '@/utils/permission'
import { findRouter } from '@/utils/findRouter'
Vue.config.productionTip = false
Vue.use(ElementUI)
import BaiduMap from 'vue-baidu-map';
Vue.use(BaiduMap, {
      /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
      ak: '0hn8QhIIdXY3F5WnW7X3jYMaKQp1dr6O'
})
Vue.config.productionTip = false
new Vue({
  router,
  store,
  data: {
    eventHub: new Vue()
  },
  render: h => h(App)
}).$mount("#app");
