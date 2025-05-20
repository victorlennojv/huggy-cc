<template>
  <div class="base-card">
    <slot />
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.base-card {
  background: var(--fill-neutral-low-0);
  border-radius: 16px;
  box-shadow: var(--shadow-md);
  padding: 32px 24px;
  width: 100%;
}
</style> 