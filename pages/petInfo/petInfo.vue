<template>
  <!-- <div>{{ uid }}</div>
  <div>{{ msg }}</div>
  <div>{{ pet_num }}</div> -->
  <view v-for="(item, index) in pet_list">
    <uni-card
      :thumbnail="img_base_url + url_list[index]"
      :title="'宠物昵称: ' + item.petName"
      :extra="`${index + 1}号宠物`"
      @click="previewImg(img_base_url + url_list[index])"
    >
      <text class="uni-body"> </text>
    </uni-card>
  </view>
  <!-- <div>{{ url_list }}</div> -->
</template>

<script setup>
import { ref } from 'vue'
import { getPetInfo } from '@/api/getPetInfo'
import { onPullDownRefresh } from '@dcloudio/uni-app'
const img_base_url = 'http://106.52.3.13:8080/'
const uid = ref()
const msg = ref('')
const pet_list = ref([])
const url_list = ref([])
const previewImg = (url) => {
  // uni.showToast({
  //   title: url
  // })
  uni.previewImage({
    urls: [url],
    success: (result) => {},
    fail: (error) => {}
  })
}

uid.value = uni.getStorageSync('uid')
const getPetInfoList = () => {
  uni.startPullDownRefresh()
  getPetInfo(uid.value)
    .then((res) => {
      // msg.value = res.data.data
      pet_list.value = res.data.data
      url_list.value = pet_list.value.map((item) => {
        return item.url
      })
    })
    .catch((err) => {
      uni.showToast({
        title: err,
        icon: 'error',
        mask: true
      })
    })
    .finally(() => {
      uni.stopPullDownRefresh()
    })
}
getPetInfoList()
//下拉刷新
onPullDownRefresh(() => {
  getPetInfoList()
})
</script>

<style scoped></style>
