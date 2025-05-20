<template>
  <div class="login-home">
    <h1 class="login-home__title">Área de Login</h1>
    <p class="login-home__subtitle">Faça login para acessar nosso super-aplicativo</p>
    <BaseButton class="login-home__button" @click="$emit('open:login')">
      Fazer login com a Huggy
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '~/components/common/BaseButton.vue'
defineEmits(['open:login'])
</script>

<style lang="scss" scoped>
.login-home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  
  &__title {
    @include title-3;
    color: var(--text-on-neutral-low-cta);
    margin-bottom: 12px;
  }
  &__subtitle {
    color: var(--text-on-neutral-low-default);
    margin-bottom: 24px;
    text-align: center;
  }
  &__button {
    margin-top: 32px;
    min-width: 240px;
  }
}
</style> 