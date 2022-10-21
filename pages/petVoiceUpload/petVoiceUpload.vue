<template>
  <view>
    <view class="musicContainer">
      <image
        :src="img_src"
        class="music"
        @tap="chooseAudioFile"
        mode="aspectFit"
      />
    </view>

    <button type="warn" @click="chooseAudioFile">{{ msg }}</button>
    <button type="primary" @click="resetAudio">清空</button>
    <button type="primary" @click="uploadAudio" :disabled="uploadDisabled">
      上传
    </button>
  </view>
</template>

<script setup>
import { ref } from 'vue'
const uploadDisabled = ref(true)
const default_msg = '请选择宠物声音文件'
const msg = ref(default_msg)
const audio_path = ref('')
const img_src = ref('../../static/audio.png')
const chooseAudioFile = () => {
  var AfDocument = uni.requireNativePlugin('Aq-ChooseFile')
  AfDocument.openMode(
    {
      size: '1', //选择总数量
      isDown: true,
      types: [
        {
          name: '音乐',
          value: ['wav']
        }
      ]
    },
    (res) => {
      msg.value = res.res[0].name
      audio_path.value = res.res[0].pathHolp
      uploadDisabled.value = false
    }
  )
}
const resetAudio = () => {
  msg.value = default_msg
  uploadDisabled.value = true
}
const uploadAudio = () => {
  uni.showLoading({
    title: '加载中'
  })
  uni.uploadFile({
    url: 'http://106.52.3.13:8080/user/predictByAudio',
    filePath: audio_path.value,
    name: 'file',
    success: (uploadFileRes) => {
      const code = JSON.parse(uploadFileRes.data).data
      uni.setStorageSync('result_code', code)
      uni.navigateTo({
        url:
          '/pages/recognitionResult/recognitionResult?audio_src=' +
          audio_path.value,
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
.musicContainer {
  margin: 50px 0 10px 0;
  display: flex;
  justify-content: center;
  border: 2px solid #a3aca7;
}
.music {
  width: 50%;
}
button {
  margin: 10px 12px 10px 12px;
}
</style>
