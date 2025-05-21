<template>
  <div class="chat-container">
      <ChatList
        :conversations="conversations"
        :selected="selectedConversation"
        @select="selectConversation"
      />
      <ChatWindow
        v-if="selectedConversation"
        :conversation="selectedConversation"
        :messages="messages"
        :is-loading="isLoadingMessages"
        @send="sendMessage"
      />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import ChatList from '~/components/chats/ChatList.vue'
import ChatWindow from '~/components/chats/ChatWindow.vue'
import type { Chat } from '~/types/chat'
import type { Conversation } from '~/types/conversation'
import type { Message } from '~/types/messages'

const { data: chats } = await useFetch<Chat[]>('/api/chats')

const conversations = computed<Conversation[]>(() =>
  (chats.value || []).map(chat => ({
    id: chat.id,
    name: chat.chatCustomer?.name || 'Sem nome',
    avatar: chat.chatCustomer?.photo || '',
    lastMessage: (chat.lastMessage?.text || '').length > 20
      ? (chat.lastMessage?.text?.slice(0, 20) + ' ...')
      : (chat.lastMessage?.text || ''),
  }))
)

const selectedConversation = ref<Conversation | undefined>(undefined)
const messages = ref<Message[]>([])
const isLoadingMessages = ref(false)

watchEffect(async () => {
  if (!selectedConversation.value && conversations.value.length > 0) {
    selectedConversation.value = conversations.value[0]
  }
  
  if (selectedConversation.value) {
    isLoadingMessages.value = true
    try {
      const data = await $fetch<Message[]>(`/api/chats/${selectedConversation.value.id}/messages`)
      messages.value = (data as Message[]).sort((a, b) => new Date(a.sendAt).getTime() - new Date(b.sendAt).getTime())
    } catch (error) {
      console.error('Error fetching messages:', error)
      messages.value = []
    } finally {
      isLoadingMessages.value = false
    }
  }
})

const selectConversation = (conv: Conversation) => { 
  selectedConversation.value = conv 
}

async function sendMessage(msg: string) {
  if (!selectedConversation.value) return
  $fetch(`/api/chats/${selectedConversation.value.id}/messages`, {
    method: 'POST',
    body: { text: msg }
  })
  if (selectedConversation.value) {
    isLoadingMessages.value = true
    try {
      const data = await $fetch<Message[]>(`/api/chats/${selectedConversation.value.id}/messages`)
      messages.value = (data as Message[]).sort((a, b) => new Date(a.sendAt).getTime() - new Date(b.sendAt).getTime())
    } catch (error) {
      console.error('Error fetching messages:', error)
      messages.value = []
    } finally {
      isLoadingMessages.value = false
    }
  }
}
</script>

<style scoped lang="scss">
.chat-container {
  max-width: 1024px;
  width: 100%;
  height: 800px;
  margin: auto;
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: var(--fill-neutral-low-1);
  border-radius: 6px;
  box-shadow: var(--shadow-md);
  overflow: hidden;
  display: flex;
  transition: border-radius 0.3s, box-shadow 0.3s, height 0.3s, width 0.3s;
}

@media (max-width: 600px) {
  .chat-container {
    max-width: 100vw;
    width: 100vw;
    height: 100vh;
    min-height: 100vh;
    min-width: 100vw;
    border-radius: 0;
    box-shadow: none;
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    animation: slideUp 0.4s cubic-bezier(.4,0,.2,1);
  }
}

@keyframes slideUp {
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>