import { request } from '@/utils/request.js'
export const userRegister = (data) => {
  return request({
    method: 'post',
    url: '/user/register',
    data
  })
}

export const userLogin = (data) => {
  return request({
    method: 'post',
    url: '/user/login',
    data
  })
}
