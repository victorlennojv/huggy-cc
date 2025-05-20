<template>
  <button 
    class="base-button" 
    :class="[variant, fullWidth ? 'full-width' : '']"
    :disabled="disabled"
  >
    <slot/>
  </button>
</template>

<script setup lang="ts">

interface Props {
  variant?: 'primary' | 'success' | 'danger'
  fullWidth?: boolean
  disabled?: boolean
}

const { variant = 'primary', fullWidth = false, disabled = false } = defineProps<Props>()

</script>

<style lang="scss">
.base-button {
  @include flex-center;
  @include body-1-bold;
  border-radius: 8px;
  padding: 12px 24px;
  transition: all 0.2s ease;

  &.primary {
    background: var(--fill-primary-4);
    color: var(--text-on-neutral-high-strong);

    &:hover:not(:disabled) {
      background: var(--fill-primary-3);
      box-shadow: var(--shadow-md);
    }

    &:active:not(:disabled) {
      background: var(--fill-primary-5);
    }
  }

  &.success {
    background: var(--fill-success-4);
    color: var(--text-on-neutral-high-strong);

    &:hover:not(:disabled) {
      background: var(--fill-success-3);
      box-shadow: var(--shadow-md);
    }

    &:active:not(:disabled) {
      background: var(--fill-success-5);
    }
  }

  &.danger {
    background: var(--fill-danger-4);
    color: var(--text-on-neutral-high-strong);

    &:hover:not(:disabled) {
      background: var(--fill-danger-3);
      box-shadow: var(--shadow-md);
    }

    &:active:not(:disabled) {
      background: var(--fill-danger-5);
    }
  }

  &:disabled {
    cursor: not-allowed;
    background: var(--fill-neutral-low-4);
    color: var(--text-on-neutral-low-disabled);
  }

  &.full-width {
    width: 100%;
  }
}
</style> 