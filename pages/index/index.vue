<template>
  <view class="container">
    <navigator url="../login/login">
      <button class="button" type="primary">登录</button>
    </navigator>

    <navigator url="../register/register">
      <button class="button" type="primary">注册</button>
    </navigator>
  </view>
</template>

<script setup></script>

<style>
.container {
  padding: 20px;
  font-size: 14px;
  line-height: 24px;
}

.button {
  /* 上下左右 */
  margin: 10px 10px 0 0;
}
</style>
