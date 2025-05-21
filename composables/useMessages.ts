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
    isLoadingMessages.value = true
    try {
      await MessageService.sendMessage(selectedConversation.value.id, msg)
      await fetchMessages()
    } catch (error) {
      console.error('Error handling message:', error)
      messages.value = []
    } finally {
      isLoadingMessages.value = false
    }
  }

  return {
    messages,
    isLoadingMessages,
    sendMessage,
    fetchMessages
  }
} 