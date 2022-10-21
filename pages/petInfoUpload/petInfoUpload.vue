<template>
  <view class="infoContainer">
    <uni-section title="">
      <uni-file-picker
        limit="1"
        title="请选择您的宠物照片"
        :image-styles="imageStyles"
        v-model="imageValue"
        fileMediatype="image"
        @select="select"
      ></uni-file-picker>
    </uni-section>
  </view>
  <view class="formContainer">
    <uni-forms ref="petInfoForm" :modelValue="formData" :rules="rules">
      <uni-forms-item name="petName" label="昵称" required>
        <uni-easyinput
          v-model="formData.petName"
          type="text"
          placeholder="请输入您的爱宠昵称"
        />
      </uni-forms-item>
    </uni-forms>

    <view class="buttonContainer">
      <button type="primary" @click="submitInfo">上传</button>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
const img_url = ref('')
const imageValue = ref([])
const petInfoForm = ref()
const formData = reactive({
  petName: ''
})
const rules = reactive({
  petName: {
    rules: [
      {
        required: true,
        errorMessage: '昵称不能为空'
      }
    ]
  }
})
const imageStyles = {
  width: 256,
  height: 256,
  border: {
    color: '#ff5a5f',
    width: 2,
    style: 'dashed',
    radius: '2px'
  }
}
const select = (res) => {
  img_url.value = res.tempFilePaths[0]
}

const submitInfo = () => {
  petInfoForm.value.validate().then((res) => {
    uni.uploadFile({
      url: 'http://106.52.3.13:8080/user/uploadPetInfo',
      filePath: img_url.value,
      name: 'file',
      formData: {
        uid: uni.getStorageSync('uid'),
        petName: res.petName
      },
      success: (uploadFileRes) => {
        if (JSON.parse(uploadFileRes.data).code === 0) {
          uni.showToast({
            title: '上传成功',
            icon: 'success',
            mask: true
          })
          uni.reLaunch({ url: '/pages/petInfo/petInfo' })
        }
      },
      fail: (err) => {
        uni.showToast({
          title: err,
          icon: 'error',
          mask: true
        })
      }
    })
  })
}
</script>

<style scoped>
.infoContainer {
  background: #ffffff;
  padding-bottom: 12px;
  display: flex;
  justify-content: center;
}
.buttonContainer {
  margin-top: 20px;
  height: 50px;
}
.formContainer {
  margin-top: 12px;
  padding: 10px;
  background: #ffffff;
}
</style>
