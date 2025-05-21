<template>
  <aside class="chat-list">
    <h3 class="chat-list__title">Minhas mensagens</h3>
    <hr class="chat-list__divider" >
    <ul class="chat-list__list">
      <li
        v-for="chat in conversations"
        :key="chat.id"
        :class="{ selected: chat.id === selected?.id }"
        class="chat-list__item"
        @click="$emit('select', chat)"
      >
        <BaseAvatar :src="chat.avatar" :name="chat.name" />
        <div class="chat-list__item-content">
          <span class="chat-list__item-name">{{ chat.name }}</span>
          <div class="chat-list__item-last-message">{{ chat.lastMessage }}</div>
        </div>
      </li>
      <li v-if="!conversations.length" class="chat-list__empty">
        Nenhum chat disponível.
      </li>
    </ul>
    <div class="chat-list__footer">
      <BaseIconButton 
        icon="uil:signout" 
        size="medium"
        @click="$emit('logout')"
      />
    </div>
  </aside>
</template>

<script setup lang="ts">
import BaseAvatar from '~/components/common/BaseAvatar.vue'
import BaseIconButton from '~/components/common/BaseIconButton.vue'

interface Conversation {
  id: number
  name: string
  avatar: string
  lastMessage: string
}

defineProps<{
  conversations: Conversation[]
  selected?: Conversation
}>()

defineEmits(['select', 'logout'])
</script>

<style lang="scss">
.chat-list {
  width: 280px;
  background: var(--fill-neutral-low-0);
  border-right: 1px solid var(--fill-neutral-low-1);
  padding: 16px 6px;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;

  &__title {
    font-size: var(--font-size-title-2);
    font-weight: var(--font-weight-regular);
    color: var(--text-on-neutral-low-cta);
    padding: 8px 16px;
  }

  &__divider {
    border: none;
    border-top: 1px solid var(--fill-neutral-low-2);
    margin: 8px 0 16px 0;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow-y: auto;
    flex: 1;
    padding-bottom: 60px;
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    cursor: pointer;
    border-radius: 8px;

    &.selected {
      background: var(--fill-primary-0);
    }

    &:hover {
      background: var(--fill-primary-1);
    }
  }

  &__item-content {
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  &__item-name {
    font-size: var(--font-size-body-1);
    font-weight: var(--font-weight-regular);
    color: var(--text-on-neutral-low-cta);
  }

  &__item-last-message {
    font-size: var(--font-size-caption-1);
    color: var(--text-on-neutral-low-default);
  }

  &__empty {
    font-size: var(--font-size-caption-1);
    color: var(--text-on-neutral-low-default);
    text-align: center;
    padding: 16px 0;
  }

  &__footer {
    position: relative;
    display: flex;
    align-items: center;
    padding: 8px;
  }

  @media (max-width: 600px) {
    width: 72px;
    min-width: 0;
    padding: 8px 0;
  }
}

@media (max-width: 600px) {
  .chat-list {
    width: 72px;
    min-width: 0;
    padding: 8px 0;
  }
  .chat-list__item-content {
    display: none !important;
  }
  .chat-list__item {
    justify-content: center;
    margin: 0 2px 6px 2px;
    padding: 8px 0;
  }
  .chat-list__title,
  .chat-list__divider {
    display: none;
  }
}
</style>