import { request } from '@/utils/request.js'
export const getPetInfo = (uid) => {
  return request({
    method: 'get',
    url: `/user/getPetInfo?uid=${uid}`
  })
}
