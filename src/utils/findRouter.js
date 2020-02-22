import store from '@/store/index'
let route = null
let end = false
function findRouter2 (arrList, str) {
  for (let item of arrList) {
    if (item.path == str) {
      route = item
      end = true
      break
    } else if (item.children) {
      findRouter2(item.children,str)
    } else {
      if(end) {
        return route
      }
    }
  }
  // console.log(route)
  return route
}

export function findRouter (str) {
  route = null
  end = false
  const routers = store.getters.routers
  findRouter2(routers, str)
  return route
}
