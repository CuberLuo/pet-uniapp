<template>
  <view class="cameraContainer">
    <img :src="img_src" class="camera" @tap="imgClick" />
  </view>
</template>

<script setup>
import { ref } from 'vue'
const img_src = ref('../../static/camera.png')
const imgClick = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album'], //从相册选择
    success: function (res) {
      console.log(JSON.stringify(res.tempFilePaths))
      img_src.value = res.tempFilePaths[0]
      uni.uploadFile({
        url: 'http://127.0.0.1:3000/upload', //仅为示例，非真实的接口地址
        filePath: res.tempFilePaths[0],
        name: 'file',
        formData: {
          user: 'test'
        },
        success: (uploadFileRes) => {
          console.log(uploadFileRes.data)
        }
      })
    }
  })
}
</script>

<style scoped>
.cameraContainer {
  display: flex;
  justify-content: center;
  border: 2px solid #f9d0c5;
}
.camera {
  width: 100px;
  border: 2px solid #2fd699;
}
</style>
