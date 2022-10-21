<template>
  <view class="titleBox">
    <h1>立即注册</h1>
  </view>
  <view class="formBox">
    <uni-forms ref="registerForm" :modelValue="formData" :rules="rules">
      <uni-forms-item class="formItem" name="username" label="用户名" required
        ><uni-easyinput v-model="formData.username" placeholder="请输入用户名"
      /></uni-forms-item>
      <uni-forms-item class="formItem" name="password" label="密码" required
        ><uni-easyinput
          type="password"
          v-model="formData.password"
          placeholder="请输入密码"
      /></uni-forms-item>
      <button
        class="button"
        type="primary"
        plain="true"
        @click="submitRegister"
      >
        注册
      </button>
    </uni-forms>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { userRegister } from '@/api/user.js'
const registerForm = ref()
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
const submitRegister = () => {
  registerForm.value
    .validate()
    .then((res) => {
      userRegister(res)
        .then((res) => {
          if (res.data.code === 0) {
            uni.showToast({
              title: '注册成功'
            })
            uni.redirectTo({ url: '/pages/login/login' })
          } else if (res.data.code === 1006) {
            uni.showToast({
              title: '用户名已存在',
              icon: 'error'
            })
          }
        })
        .catch((err) => {
          uni.showToast({
            title: '注册失败',
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
