<template>
  <uni-section class="resultPanel" title="情绪识别结果" type="line">
    <uni-card :is-shadow="false" is-full>
      <text>
        {{ emotion_result }}
      </text>
      <!-- <div>{{ code }}</div> -->
    </uni-card>
  </uni-section>

  <view v-if="img_src !== undefined">
    <uni-section class="imgPanel" title="图片资源" type="line">
      <uni-card :is-shadow="false" is-full>
        <view>
          <image :src="img_src" mode="aspectFit" />
        </view>
      </uni-card>
    </uni-section>
  </view>
  <view v-if="audio_src !== undefined">
    <uni-section class="audioPanel" title="音频资源" type="line">
      <uni-card :is-shadow="false" is-full>
        <view>
          <audio
            style="text-align: left"
            :src="audio_src"
            :action="audioAction"
            controls
          ></audio>
        </view>
      </uni-card>
    </uni-section>
  </view>

  <uni-section class="feedbackPanel" title="用户反馈" type="line">
    <uni-card :is-shadow="false" is-full>
      <view class="uni-list">
        <view class="uni-list-cell">
          <view class="uni-list-cell-left"> 点击选择您认为正确的情绪 </view>
          <view class="uni-list-cell-db">
            <picker @change="bindPickerChange" :value="index" :range="emotions">
              <view class="uni-input">{{ emotions[index] }}</view>
            </picker>
          </view>
        </view>
      </view>
      <button type="primary" @click="submitFeedBack">提交</button>
    </uni-card>
  </uni-section>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
const img_src = ref('')
const audio_src = ref('')
onLoad((options) => {
  img_src.value = options.img_src
  audio_src.value = options.audio_src
})
const audioAction = {
  method: 'pause'
}

const emotion_result = ref('')
const code = ref(uni.getStorageSync('result_code'))
const emotions = ['愤怒', '恐惧', '开心', '悲伤', '平常']
const showEmotion = () => {
  if (code.value >= 1 && code.value <= 5) {
    emotion_result.value = emotions[code.value - 1]
  } else if (code === 0) {
    emotion_result.value = '系统识别失败!'
    uni.showToast({
      title: '图片清晰度过低!',
      icon: 'error',
      mask: true
    })
  } else {
    emotion_result.value = '系统识别失败!'
    uni.showToast({
      title: '系统出错!',
      icon: 'error',
      mask: true
    })
  }
}
showEmotion()

const index = ref(0)
const bindPickerChange = (e) => {
  index.value = e.detail.value
  // console.log(index.value)
}
const submitFeedBack = () => {
  uni.showLoading({
    title: '加载中'
  })
  uni.uploadFile({
    url: 'http://106.52.3.13:8080/user/uploadImageInfo',
    filePath: img_src.value,
    name: 'file',
    formData: {
      code: index.value + 1
    },
    success: (uploadFileRes) => {
      console.log(uploadFileRes)
    },
    fail: (errRes) => {
      console.log(errRes)
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
.audioPanel,
.imgPanel,
.feedbackPanel {
  margin-top: 12px;
}
</style>
