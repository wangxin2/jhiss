import { login, logout, getInfo } from '@/api/login'
import { getToken,getUserName,getRoles, setToken,setUserName,setRoles, removeToken, removeUserName, removeRoles } from '@/utils/auth'
import {routes} from '@/router'
let constantRouterMap = routes
// let constantRouterMap = router.options.constantRouterMap
// if (window.name == "business") {
//   constantRouterMap = router.options.constantRouterMap2
// }
const user = {
  state: {
    token: getToken(),
    name: getUserName(),
    avatar: '',
    roles: getRoles(),
    routers: [],
    addRouters: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = routers
      // state.routers = constantRouterMap.concat(routers)// 查到的路由存在vuex中
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data || response
          // setToken(data.access_token)// 存入cookie
          // commit('SET_TOKEN', data.access_token)
          setToken(data.token)// 存入cookie
          commit('SET_TOKEN', data.token)
          commit('SET_NAME', data.userName)
          commit('SET_ROLES', data.userName)
          setUserName(data.userName)
          setRoles(data.userName)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          removeUserName()
          removeRoles()
          resolve()
        }).catch(error => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          removeUserName()
          removeRoles()
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        removeUserName()
        removeRoles()
        resolve()
      })
    },
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        // if (roles.includes('')) { 
        if (roles === '') { 
          accessedRouters = filterHidden(constantRouterMap) // 如果是admin 直接加载所有路由 超级管理员
        } else {
          accessedRouters = filterAsyncRouter(constantRouterMap, roles) // 否则根据权限搜索路由
        }
        commit('SET_ROUTERS', accessedRouters) // 保存vuex中
        resolve()
      })
    }
  }
}
function filterHidden (constantRouterMap) {
  const arr = []
  constantRouterMap.forEach(obj => {
    const tmp = { ...obj }
    if (tmp.children) {
      tmp.children = filterHidden(tmp.children)// 闭包查找所有该roles下的路由
    }
    tmp.hidden = false
    arr.push(tmp)
  })
  return arr
}
function filterAsyncRouter(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)// 闭包查找所有该roles下的路由
      }
      tmp.hidden = false
      res.push(tmp)
    }
  })
  return res
}
function hasPermission(roles, tmp) {
  let meta_roles = tmp.meta.roles == null ? '': tmp.meta.roles
  if (meta_roles.includes(roles) || meta_roles.includes('all')) {
    return true
  } else {
    return false
  }
}
export default user
