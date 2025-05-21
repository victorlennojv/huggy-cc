<template>
  <div class="input-field">
    <input
      v-model="message"
      class="input-field__input"
      type="text"
      :disabled="chatSituation === 'finishing'"
      :placeholder="chatSituation === 'finishing' ? 'Chat finalizado' : 'Escreva sua mensagem...'"
      @keydown.enter.exact.prevent="handleSend"
    >

    <div v-if="previewUrl" class="input-field__preview-row">
      <img :src="previewUrl" class="input-field__preview-img" >
      <button
        class="input-field__remove-btn"
        type="button"
        @click="removeImage"
      >
        <BaseIconButton icon="carbon:close-outline" />
      </button>
    </div>

    <div v-else class="input-field__upload-row">
      <label class="input-field__upload-btn">
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          style="display: none"
          @change="handleUpload"
        >
        <BaseIconButton icon="uil:image" @click="triggerFileInput" />
      </label>
    </div>
  </div>

  <BaseButton
    :disabled="!message.trim() && !imageFile"
    variant="success"
    class="input-field__button"
    full-width
    @click="handleSend"
  >
    Enviar
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from "~/components/common/BaseButton.vue";
import BaseIconButton from "~/components/common/BaseIconButton.vue";

const emit = defineEmits(["send", "upload"])
const props = defineProps<{
  conversationId: string | number
  chatSituation: string
}>();

const message = ref("")
const imageFile = ref<File | null>(null)
const previewUrl = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

watch(() => props.conversationId, () => {
  reset()
})

function reset() {
  message.value = ""
  imageFile.value = null
  previewUrl.value = null
}

function triggerFileInput() {
  if (props.chatSituation === 'finishing') return
  fileInput.value?.click()
}

function handleSend() {
  if (message.value.trim() || imageFile.value) {
    emit("send", message.value.trim(), imageFile.value)
    reset()
  }
}

function handleUpload(event: Event) {
  const files = (event.target as HTMLInputElement).files
  if (files && files[0]) {
    imageFile.value = files[0]
    previewUrl.value = URL.createObjectURL(files[0])
    emit("upload", files[0])
  }
}

function removeImage() {
  imageFile.value = null
  previewUrl.value = null
}
</script>

<style lang="scss">
.input-field {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: var(--fill-neutral-low-0);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  border: 1px solid var(--border-neutral-1);
  gap: 8px;

  &__input {
    background: var(--fill-neutral-low-0);
    box-sizing: border-box;
    border-radius: 4px;
    border: none;
    font-size: var(--font-size-body-1);
    height: 44px;
    padding: 10px 12px;
    outline: none;
    width: 100%;
  }

  &__upload-row {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }

  &__upload-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    color: var(--fill-neutral-medium-2);
  }

  &__preview-row {
    display: flex;
    align-items: end;
    border-top: 1px solid var(--border-neutral-1);
    justify-content: flex-end;
    gap: 8px;
    width: 100%;
    min-height: 80px;
  }

  &__preview-img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 6px;
    margin-top: 8px;
    border: 1px solid var(--border-neutral-2);
    background: var(--fill-neutral-low-1);
  }

  &__remove-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px 4px;
    display: flex;
    align-items: center;
    height: 24px;
    color: var(--fill-neutral-medium-2);
  }

  &__button {
    width: 100%;
    min-width: 0;
    height: 44px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 6px;
    box-sizing: border-box;
  }
}
</style>
