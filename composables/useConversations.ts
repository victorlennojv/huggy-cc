import { computed } from 'vue'
import type { Chat } from '~/types/chat'
import type { Conversation } from '~/types/conversation'

export const useConversations = async () => {
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

  return {
    conversations
  }
} 