import router from '@/views/map/router'
import { getToken } from '@/utils/auth' // 验权
import store from '@/store/index'
// register global progress.
const whiteList = ['/login', '/error', '/authredirect']// 不重定向白名单
function hasPermission(roles, tmp) {
  let meta_roles = tmp.meta.roles == null ? '': tmp.meta.roles
  if(!tmp.meta.roles) {
    return true
  } else if (meta_roles.includes(roles)) {
    return true
  } else {
    return false
  }
}
router.beforeEach((to, from, next) => {
  // NProgress.start() // 开启Progress 
  store.commit('clearToken'); // 取消请求
  if (to.meta.title) { // 判断是否有标题
    document.title = to.meta.title;
  }
  console.log(router)
  if (getToken()) { // 判断是否有token
    if (to.path === '/login') {
      console.log('had token')
      next({ path: '/' })
    } else {
      console.log(router)
      let roles = store.getters.roles
      if (roles != '' && router.options.routes.length <= 2) {
        store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
          router.options.routes = router.options.routes.concat(store.getters.routers)
          router.addRoutes(store.getters.routers) // 动态添加可访问路由表
          console.log(router)
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        })
      } else {
        // if ((whiteList.includes(to.path) || JSON.stringify(store.getters.routers).includes(to.path)) && hasPermission(roles, to)) {
        if (hasPermission(roles, to)) {
          next()//
        } else {
          // alert('无权访问！')
          next('/error')
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      // NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
})

