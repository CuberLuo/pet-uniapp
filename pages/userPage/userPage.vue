<template>
  <view>
    <uni-section title="">
      <view class="imgBox">
        <image src="../../static/user.png" />
      </view>
    </uni-section>
    <uni-list class="userList">
      <uni-list-item :title="`用户名: ${username}`" />
      <uni-list-item :title="`用户ID: ${uid}`" />
    </uni-list>
    <uni-list class="userOperationList">
      <uni-list-item
        showArrow
        title="上传宠物信息"
        clickable
        @click="gotoUploadPage"
      />
      <uni-list-item
        showArrow
        title="退出登录"
        clickable
        @click="confirmExit"
      />
    </uni-list>
  </view>
</template>

<script setup>
import { ref } from 'vue'
const username = ref('null')
const uid = ref('null')
username.value = uni.getStorageSync('username')
uid.value = uni.getStorageSync('uid')

const gotoUploadPage = () => {
  uni.navigateTo({
    url: '/pages/petInfoUpload/petInfoUpload'
  })
}

const confirmExit = () => {
  uni.showModal({
    title: '温馨提示',
    content: '您确定要退出登录吗?',
    showCancel: true,
    confirmText: '确定',
    cancelText: '取消',
    success: ({ confirm, cancel }) => {
      if (confirm) {
        uni.reLaunch({ url: '/pages/index/index' })
        uni.clearStorageSync()
      }
    }
  })
}
</script>

<style scoped>
.usernameBox,
.imgBox {
  display: flex;
  justify-content: center;
}
.imgBox {
  padding-bottom: 20px;
}

.imgBox image {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}
.userList {
  margin: 10px 0 10px 0;
}
</style>
