<template>
  <view>
    <uni-card :is-shadow="false" @click="confirmExit">
      <text>退出登录</text>
    </uni-card>
  </view>
</template>

<script setup>
const confirmExit = () => {
  uni.showModal({
    title: '温馨提示',
    content: '您确定要退出登录吗?',
    showCancel: true,
    success: ({ confirm, cancel }) => {
      if (confirm) {
        uni.reLaunch({ url: '/pages/index/index' })
      }
    }
  })
}
</script>

<style scoped></style>
