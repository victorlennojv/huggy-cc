<template>
  <div class="login-container">
    <LoginHome v-if="!showForm" @open:login="openForm" />
    <transition name="slide-up">
      <BaseCard v-if="showForm" class="login-container__card">
        <LoginForm @on:login="handleLogin" />
      </BaseCard>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LoginHome from '~/components/login/LoginHome.vue'
import LoginForm from '~/components/login/LoginForm.vue'
import BaseCard from '~/components/common/BaseCard.vue'
import { useAuth } from '~/composables/useAuth'

const showForm = ref(false)
const openForm = () => { showForm.value = true }

const handleLogin = async () => {
  const { login } = useAuth()
  await login()
  navigateTo('/chats')
}

</script>

<style lang="scss">
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--fill-neutral-low-0);
  flex-direction: column;

  &__card {
    margin-top: 32px;
    width: 100%;
    max-width: 400px;
  }
}

.slide-up {
  &-enter-active,
  &-leave-active {
    transition: all 0.4s cubic-bezier(.4,0,.2,1);
  }
  &-enter-from {
    opacity: 0;
    transform: translateY(40px);
  }
  &-enter-to {
    opacity: 1;
    transform: translateY(0);
  }
  &-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
  &-leave-to {
    opacity: 0;
    transform: translateY(40px);
  }
}
</style> 