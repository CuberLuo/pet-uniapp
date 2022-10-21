<template>
  <view class="titleBox">
    <h1>宠物情绪识别系统</h1>
  </view>

  <view class="logoBox">
    <image src="../../static/index.jpg" />
  </view>
  <view class="container">
    <navigator url="../login/login">
      <button class="button" type="primary">登录</button>
    </navigator>
    <div style="width: 50px"></div>
    <navigator url="../register/register">
      <button class="button" type="primary" plain="true">注册</button>
    </navigator>
  </view>
</template>

<script setup></script>

<style>
.titleBox,
.logoBox,
.container {
  display: flex;
  justify-content: center;
}
.titleBox {
  margin-top: 50px;
}
.logoBox {
  margin-top: 50px;
}
.container {
  padding: 20px;
  font-size: 14px;
  line-height: 24px;
}

.button {
  /* 上右下左 */
  /* margin: 10px 10px 0 20px; */
  width: 100px;
}
</style>
