<template>
  <div class="login-container">
    <LoginHome />
  </div>
</template>

<script setup lang="ts">
import LoginHome from '~/components/login/LoginHome.vue'

</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #fff;
  flex-direction: column;
}

</style> 