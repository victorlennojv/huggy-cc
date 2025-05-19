<template>
  <button 
    class="base-icon-button"
    :class="{
      'base-icon-button--disabled': disabled
    }"
    :disabled="disabled"
  >
    <Icon 
      class="base-icon-button__icon"
      :class="[`base-icon-button__icon--${size}`]" 
      :name="icon" 
    />
  </button>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

const { size = 'small', disabled = false } = defineProps<Props>()
</script>

<style lang="scss" scoped>
.base-icon-button {
  @include flex-center;
  padding: 2px 4px;
  border: none;
  background: transparent;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: var(--fill-primary-1);
    box-shadow: var(--shadow-md);

    .base-icon-button__icon {
      color: var(--text-on-neutral-low-cta-hover);
    }
  }

  &:active:not(:disabled) {
    background: var(--fill-primary-2);

    .base-icon-button__icon {
      color: var(--text-on-neutral-low-cta);
    }
  }

  &--disabled {
    cursor: not-allowed;
  }

  &__icon {
    color: var(--text-on-neutral-low-default);
    transition: color 0.2s ease;

    &--small {
      width: 24px;
      height: 24px;
    }

    &--medium {
      width: 32px;
      height: 32px;
    }

    &--large {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
