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
        :conversation="selectedConversation"
        :messages="messages"
        :is-loading="isLoadingMessages"
        @send="sendMessage"
      />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue'
import ChatList from '~/components/chats/ChatList.vue'
import ChatWindow from '~/components/chats/ChatWindow.vue'
import { useConversations } from '~/composables/useConversations'
import { useMessages } from '~/composables/useMessages'
import { useAuth } from '~/composables/useAuth'
import type { Conversation } from '~/types/conversation'

const { conversations } = await useConversations()
const selectedConversation = ref<Conversation | undefined>(undefined)

const selectConversation = (conv: Conversation) => {
  selectedConversation.value = conv
}

const { 
  messages, 
  isLoadingMessages, 
  sendMessage, 
  fetchMessages 
} = useMessages(selectedConversation)

watchEffect(async () => {
  if (!selectedConversation.value && conversations.value.length > 0) {
    selectedConversation.value = conversations.value[0]
  }
  
  if (selectedConversation.value) {
    await fetchMessages()
  }
})

const handleLogout = async () => {
  try {
    const { logout } = useAuth()
    await logout()
    navigateTo('/login', { replace: true })
  } catch (error) {
    console.error('Error:', error)
  }
}

onMounted(async () => {
  const { checkAuth } = useAuth()
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