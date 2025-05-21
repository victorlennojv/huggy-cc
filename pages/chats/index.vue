<template>
  <div class="chat-container">
      <ChatList
        :conversations="conversations"
        :selected="selectedConversation"
        @select="selectConversation"
        @logout="handleLogout"
      />
      <ChatWindow
        v-if="selectedConversation"
        ref="chatWindowRef"
        :conversation="selectedConversation"
        :messages="messages"
        :is-loading="isLoadingMessages"
        @send="sendMessage"
      />
  </div>
</template>

<script setup lang="ts">
import type { Conversation } from '~/types/conversation'
import { useConversations } from '~/composables/useConversations'
import { useMessages } from '~/composables/useMessages'
import { useAuth } from '~/composables/useAuth'
import { ref, watchEffect, onMounted, nextTick } from 'vue'

const ChatList = defineAsyncComponent(() => import('~/components/chats/ChatList.vue'))
const ChatWindow = defineAsyncComponent(() => import('~/components/chats/ChatWindow.vue'))

const { conversations } = await useConversations()
const { checkAuth, logout } = useAuth()
const selectedConversation = ref<Conversation | undefined>(undefined)
const chatWindowRef = ref()

const { 
  messages, 
  isLoadingMessages, 
  sendMessage, 
  fetchMessages 
} = useMessages(selectedConversation)

const scrollToBottom = () => {
  const container = chatWindowRef.value?.$el.querySelector('.chat-window__main')
  if (container) {
    container.scrollTop = container.scrollHeight
  }
}

const selectConversation = (conv: Conversation) => {
  selectedConversation.value = conv
}

const handleLogout = async () => {
  try {
    await logout()
    navigateTo('/login', { replace: true })
  } catch (error) {
    console.error('Error:', error)
  }
}

watchEffect(async () => {
  if (!selectedConversation.value && conversations.value.length > 0) {
    selectedConversation.value = conversations.value[0]
  }
  
  if (selectedConversation.value) {
    await fetchMessages()
  }
})

watch(() => messages.value, () => {
  nextTick(scrollToBottom)
}, { deep: true })

watch(() => isLoadingMessages.value, (newValue) => {
  if (!newValue) {
    nextTick(scrollToBottom)
  }
})

onMounted(async () => {
  const isAuthenticated = await checkAuth()
  if (!isAuthenticated) {
    navigateTo('/login')
  }
})
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
    border-radius: 6px;
    height: 100%;
    box-shadow: none;
    position: fixed;
    padding: 8px;
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