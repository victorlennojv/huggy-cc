import { ref } from 'vue'
import type { Message } from '~/types/messages'
import type { Conversation } from '~/types/conversation'
import { MessageService } from '~/services/messages'

export const useMessages = (selectedConversation: Ref<Conversation | undefined>) => {
  const messages = ref<Message[]>([])
  const isLoadingMessages = ref(false)

  const fetchMessages = async () => {
    if (!selectedConversation.value) return

    isLoadingMessages.value = true
    try {
      messages.value = await MessageService.getMessages(selectedConversation.value.id)
    } catch (error) {
      console.error('Error fetching messages:', error)
      messages.value = []
    } finally {
      isLoadingMessages.value = false
    }
  }

  const sendMessage = async (msg: string) => {
    if (!selectedConversation.value) return
    // @ts-expect-error missing types
    const optimisticMessage: Message = {
      id: Date.now(),
      text: msg,
      senderType: 'agent',
      sendAt: new Date().toISOString(),
      status: 'sending'
    }

    messages.value = [...messages.value, optimisticMessage]

    try {
      await MessageService.sendMessage(selectedConversation.value.id, msg)
      const index = messages.value.findIndex(m => m.id === optimisticMessage.id)
      if (index !== -1) {
        messages.value[index] = {
          ...messages.value[index],
          status: 'sent'
        }
      }
    } catch (error) {
      console.error(error)
      const index = messages.value.findIndex(m => m.id === optimisticMessage.id)
      if (index !== -1) {
        messages.value[index] = {
          ...messages.value[index],
          status: 'error',
          text: `${msg}`
        }
      }
    }
  }

  return {
    messages,
    isLoadingMessages,
    sendMessage,
    fetchMessages
  }
} 