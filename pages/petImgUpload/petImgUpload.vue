<template>
  <view class="cameraContainer">
    <image
      :src="img_src"
      class="camera"
      id="camera"
      @tap="imgClick"
      mode="aspectFit"
    />
  </view>

  <button type="primary" @click="resetImg">清空</button>
  <button type="primary" @click="uploadFile" :disabled="uploadDisabled">
    上传
  </button>
</template>

<script setup>
import { ref } from 'vue'
const uploadDisabled = ref(true)
const default_img_src = '../../static/camera.png'
const img_src = ref(default_img_src)
const imgClick = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['original'],
    success: function (res) {
      img_src.value = res.tempFilePaths[0]
      uploadDisabled.value = false
    }
  })
}
const resetImg = () => {
  img_src.value = default_img_src
  uploadDisabled.value = true
}
const uploadFile = () => {
  uni.showLoading({
    title: '加载中'
  })
  uni.uploadFile({
    url: 'http://106.52.3.13:8080/user/predictByImage',
    filePath: img_src.value,
    name: 'file',
    success: (uploadFileRes) => {
      const code = JSON.parse(uploadFileRes.data).data
      uni.setStorageSync('result_code', code)
      uni.navigateTo({
        url: `/pages/recognitionResult/recognitionResult?img_src=${img_src.value}`,
        animationType: 'zoom-fade-out', //页面过渡动画
        animationDuration: 200
      })
    },
    fail: (errRes) => {
      uni.showToast({
        title: errRes,
        icon: 'error',
        mask: true //显示透明蒙层，防止触摸穿透
      })
    },
    complete: () => {
      uni.hideLoading()
    }
  })
}
</script>

<style scoped>
.cameraContainer {
  margin: 50px 0 10px 0;
  display: flex;
  justify-content: center;
  border: 2px solid #a3aca7;
}
.camera {
  width: 50%;
  border: 2px dashed #ff3c00;
}
button {
  margin: 10px 12px 10px 12px;
}
</style>
