<template>
  <div 
    class="base-avatar"
    :class="[`base-avatar--${size}`]"
  >
    <img 
      v-if="src" 
      :src="src" 
      alt="Foto do perfil"
      class="base-avatar__image"
    >
    <div v-else class="base-avatar__placeholder">
      {{ initials }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { getInitials } from '~/utils/string'

interface Props {
  src?: string
  size?: 'small' | 'big'
  name?: string
}

const { size = 'big', name = '', src = '' } = defineProps<Props>()

const initials = computed(() => getInitials(name))
</script>

<style lang="scss" scoped>
.base-avatar {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  background: var(--fill-neutral-low-0);
  border: 1px solid var(--border-neutral-1);
  border-radius: 12px;
  gap: 10px;

  &--small {
    width: 40px;
    height: 40px;
  }

  &--big {
    width: 52px;
    height: 52px;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  &__placeholder {
    @include flex-center;
    width: 100%;
    height: 100%;
    background: var(--fill-neutral-low-1);
    border-radius: 8px;
    color: var(--text-on-neutral-low-weak);
    @include body-2-bold;
  }
}
</style>
