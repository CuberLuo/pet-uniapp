<template>
  <view class="titleBox">
    <h1>欢迎登录</h1>
  </view>

  <view class="formBox">
    <uni-forms ref="loginForm" :modelValue="formData" :rules="rules">
      <uni-forms-item class="formItem" name="username" label="用户名" required
        ><uni-easyinput v-model="formData.username" placeholder="请输入用户名"
      /></uni-forms-item>
      <uni-forms-item class="formItem" name="password" label="密码" required
        ><uni-easyinput
          type="password"
          v-model="formData.password"
          placeholder="请输入密码"
      /></uni-forms-item>
      <button class="button" type="primary" @click="submitLogin">登录</button>
    </uni-forms>
  </view>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const loginForm = ref()
const formData = reactive({
  username: '',
  password: ''
})
const rules = reactive({
  username: {
    rules: [
      {
        required: true,
        errorMessage: '用户名不能为空'
      }
    ]
  },
  password: {
    rules: [
      {
        required: true,
        errorMessage: '密码不能为空'
      }
    ]
  }
})
const submitLogin = () => {
  loginForm.value
    .validate()
    .then((res) => {
      store
        .dispatch('loginSystem', res)
        .then((res) => {
          if (res.data.code === 0) {
            uni.showToast({
              title: '登录成功'
            })
            uni.setStorageSync('username', formData.username)
            //关闭所有页面后跳转,防止顶部导航栏左上角出现返回箭头
            uni.reLaunch({ url: '/pages/petInfo/petInfo' })
          } else if (res.data.code === 1001) {
            uni.showToast({
              title: '用户名不存在',
              icon: 'error'
            })
          } else if (res.data.code === 1002) {
            uni.showToast({
              title: '密码错误',
              icon: 'error'
            })
          }
        })
        .catch((err) => {
          uni.showToast({
            title: '登录失败',
            icon: 'error'
          })
        })
    })
    .catch((err) => {
      uni.showToast({
        title: err,
        icon: 'error'
      })
    })
}
</script>

<style lang="scss">
.titleBox {
  margin-left: 10px;
  margin-top: 20px;
}
.formBox {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.formItem {
  width: 360px;
}
</style>
