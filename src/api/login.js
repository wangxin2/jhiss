import request from '@/utils/request'

export function login (userName, password) {
  // return request({
  //   url: '/api/oauth/token',
  //   method: 'post',
  //   data: {
  //     username,
  //     password,
  //     scope: 'all',
  //     grant_type: 'password'
  //   }
  // })
  return request({
    url: '/api/login',
    // url: 'http://39.106.157.136:8790/login',
    method: 'post',
    data: {
      userName,
      password
    }
  })
}

export function getInfo (token) {
  return request({
    url: '/user/info' + '?username=' + token,
    method: 'get'
  })
}

export function logout () {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}
