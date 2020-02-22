import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import user from './modules/user'
Vue.use(Vuex)

export default new Vuex.Store(
  {
    state: {
      pointInfo: {type: ''},
      lineInfo: {type: ''},
      PolygonInfo: {type: ''},
      cancelTokenArr: [] // 取消请求token数组
    },
    // mutations: {
    //   change (change_data) {
    //     this.state.pointInfo = change_data
    //   }
    // },
    mutations: {
      pushToken(state, payload){
        state.cancelTokenArr.push(payload.cancelToken);
      },
      clearToken({cancelTokenArr}){
        cancelTokenArr.forEach(item => {
          item('路由跳转取消请求');
        });
        cancelTokenArr = [];
      }
    },
    modules: {
      user
    },
    getters
  })
