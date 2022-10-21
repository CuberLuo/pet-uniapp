import { createStore } from 'vuex'
import { userLogin } from '@/api/user'
const store = createStore({
  state: {},
  mutations: {},
  actions: {
    loginSystem(context, userInfo) {
      return new Promise((resolve, reject) => {
        userLogin(userInfo)
          .then((res) => {
            if (res.data.code === 0) {
              const uid = res.data.data
              uni.setStorageSync('uid', uid)
            }
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
})

export default store
