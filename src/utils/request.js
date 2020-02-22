import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store/index'
import router from '@/router'

// import qs from 'qs'
// 创建axios实例
const service = axios.create({
  withCredentials: true,
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 30000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(config => {
  config.cancelToken = new axios.CancelToken(cancel => {
    store.commit('pushToken', {
      cancelToken: cancel
    })
  })
  if (!store.state.user.token) {
    config.headers['Authorization'] = 'Basic YWNhcElkOmFjYXBTZWNyZXQ='
  } else {
    config.headers['Authorization'] = 'Bearer ' + store.state.user.token
  }
  if (config.method === 'post') {
    if (store.state.user.token) {
      config.data['access_token'] = store.state.user.token
    }
    //if (config.data.hasOwnProperty('file') && config.data['file']) {
      let param = new FormData()
      for (let key in config.data) {
        if (key === 'file') {
          for (var i = 0; i < config.data.file.length; i++) {
            var file = config.data.file[i]
            param.append(key, file, file.name)
          }
        } else {
          param.append(key, config.data[key])
        }
      }
      config.data = param
    //}
    // config.data = qs.stringify(config.data)
  } else if (config.method === 'put') {
    if (store.state.user.token) {
      config.data['access_token'] = store.state.user.token
    }
    let param = new FormData()
    for (let key in config.data) {
      param.append(key, config.data[key])
    }
    config.data = param
  } else if (config.method === 'get') {
    config.params = {}
    if (!config.params) {
      config.params = {}
    }
    config.params['access_token'] = store.state.user.token
  }

  // if (store.getters.token) {
  // config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})
function logoutFun () {
  store.dispatch('LogOut').then(() => {
    router.push('/login')
  }).catch(() => {
    router.push('/login')
  })
  let CWin = store.state.CWin
  CWin.close()
}
// respone拦截器
service.interceptors.response.use(response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
  if (response.status === 401 || response.status === 402) {
    // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    if (response.status === 402) {
      // MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      //   confirmButtonText: '重新登录',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   logoutFun()
      //   location.reload()
      // })
      Message({
        message: '用户信息已失效！',
        type: 'warning',
        duration: 5 * 1000
      })
    } else if (response.status === 401) {
      Message({
        message: '无权访问！',
        type: 'warning',
        duration: 5 * 1000
      })
    }
    logoutFun()
    location.reload()
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('error')
  } else {
    return response.data
  }
},
error => {
  //请求取消时，也会进入error，根据axios.isCancel()：true--请求取消  false--请求失败
  //仅在请求失败时做后续处理
  if(axios.isCancel(error)) {
    console.log('请求取消')
  }else {
    // Message({
    //     message: '连接服务器失败，请稍后再试！',
    //     duration: 2000,
    //     className: 'globalMsg'
    // });
    return Promise.reject(error);
  }
}
)

export default service
