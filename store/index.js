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
            resolve(res)
            if (res.data.code === 0) {
              //关闭所有页面后跳转,防止顶部导航栏左上角出现返回箭头
              uni.reLaunch({ url: '/pages/petInfo/petInfo' })
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
})

export default store
