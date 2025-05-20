<template>
  <div class="base-input">
    <label v-if="label" class="base-input__label">{{ props.label }}</label>
    <input
      class="base-input__field"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
    >
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  type?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

function onInput(event: Event) {
  const target = event.target as HTMLInputElement | null
  emit('update:modelValue', target?.value ?? '')
}
</script>

<style lang="scss">
.base-input {
  display: flex;
  flex-direction: column;
  gap: 4px;

  &__label {
    font-size: 0.95rem;
    color: var(--text-on-neutral-low-default);
    margin-bottom: 2px;
  }
  &__field {
    padding: 26px 12px;
    border: none;
    border-radius: 8px;
    font-size: var(--body-1-regular);
    outline: none;
    transition: border-color 0.2s;
    background: var(--fill-neutral-low-2);
    color: var(--text-on-neutral-low-default);
    &:focus {
      border-color: var(--fill-primary-4);
    }
  }
}
</style> 