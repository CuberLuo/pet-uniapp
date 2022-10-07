import { request } from '@/utils/request.js'
export const userRegister = (data) => {
  return request({
    method: 'post',
    url: '/register',
    data
  })
}

export const userLogin = (data) => {
  return request({
    method: 'post',
    url: '/login',
    data
  })
}
