<template>
  <div class="chat-window">
    <div class="chat-window__header">
      <BaseAvatar
        :src="conversation.avatar"
        :name="conversation.name"
        class="chat-window__avatar"
      />
      <div>
        <strong class="chat-window__name">{{ conversation.name }}</strong>
      </div>
    </div>
    <div class="chat-window__main">
      <BaseSpinner v-if="isLoading" />
      <div
        v-for="msg in messages"
        v-else
        :key="msg.id"
        :class="[
          'chat-window__message-group',
          {
            'chat-window__message-group--me':
              msg.senderType === 'user' || msg.senderType === 'agent',
          },
        ]"
      >
        <div
          :class="[
            'chat-window__message',
            {
              'chat-window__message--me':
                msg.senderType === 'user' || msg.senderType === 'agent',
            },
          ]"
        >
          <span>{{ msg.text }}</span>
        </div>
        <div
          :class="[
            'chat-window__time',
            {
              'chat-window__time--me':
                msg.senderType === 'user' || msg.senderType === 'agent',
            },
          ]"
        >
          {{ formatTime(msg.sendAt) }}
        </div>
      </div>
    </div>
    <div class="chat-window__footer">
      <InputField
        :conversation-id="conversation.id"
        @send="$emit('send', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import InputField from "~/components/chats/InputField.vue";
import BaseAvatar from "~/components/common/BaseAvatar.vue";
import BaseSpinner from "~/components/common/BaseSpinner.vue";
import type { Message } from "~/types/messages";
import { formatTime } from "~/utils/date";

interface Conversation {
  id: number
  avatar: string
  name: string
  lastMessage: string
}

defineProps<{
  conversation: Conversation
  messages: Message[]
  isLoading: boolean
}>();

defineEmits(["send"])
</script>

<style lang="scss">
.chat-window {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--fill-neutral-low-1);

  &__header {
    display: flex;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid var(--fill-neutral-low-1);
    background: var(--fill-neutral-low-0);
  }
  &__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 12px;
  }
  &__name {
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body-1);
  }
  &__main {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
    background: var(--fill-neutral-low-1);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  &__message-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &--me {
      align-items: flex-end;
    }
  }
  &__message {
    background: var(--fill-neutral-low-0);
    box-shadow: 0 1px 2px var(--fill-neutral-low-2);
    border-radius: 6px 6px 6px 2px;
    color: var(--text-on-color-low-strong);
    max-width: 60%;
    margin-bottom: 2px;
    padding: 14px 20px;
    word-break: break-word;
    white-space: pre-wrap;
    overflow-wrap: anywhere;

    &--me {
      background: var(--fill-primary-3);
      color: var(--text-on-color-high-strong);
      border-radius: 6px 6px 2px 6px;
      align-self: flex-end;
    }
  }
  &__time {
    font-size: 0.75em;
    color: var(--text-on-color-low-strong);
    margin: 2px 4px 12px 4px;
    align-self: flex-start;

    &--me {
      align-self: flex-end;
    }
  }
  &__footer {
    padding: 12px;
    background: var(--fill-neutral-low-0);
    border-top: 1px solid var(--fill-neutral-low-1);
  }
}
</style>
