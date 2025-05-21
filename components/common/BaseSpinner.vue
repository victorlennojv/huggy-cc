<template>
  <div class="base-spinner" :class="{ 'base-spinner--small': size === 'small' }">
    <div class="base-spinner__circle"/>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  size?: 'default' | 'small'
}>()
</script>

<style lang="scss">
.base-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  &--small {
    .base-spinner__circle {
      width: 24px;
      height: 24px;
      border-width: 2px;
    }
  }

  &__circle {
    width: 40px;
    height: 40px;
    border: 3px solid var(--fill-neutral-low-2);
    border-top: 3px solid var(--fill-primary-3);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 