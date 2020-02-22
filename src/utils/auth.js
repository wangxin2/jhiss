import Cookies from 'js-cookie'

const TokenKey = 'access_token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}
export function setUserName (username) {
  return Cookies.set('username', username)
}
export function getUserName () {
  return Cookies.get('username')
}
export function setRoles (roles) {
  return Cookies.set('roles', roles)
}
export function getRoles () {
  return Cookies.get('roles')
}
export function removeToken () {
  return Cookies.remove(TokenKey)
}
export function removeUserName () {
  return Cookies.remove('username')
}
export function removeRoles () {
  return Cookies.remove('roles')
}
