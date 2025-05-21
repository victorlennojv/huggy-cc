import type { Message } from '~/types/messages'

export const MessageService = {
  async sendMessage(conversationId: number, text: string): Promise<void> {
    await $fetch(`/api/chats/${conversationId}/messages`, {
      method: 'POST',
      body: { text }
    })
  },

  async getMessages(conversationId: number): Promise<Message[]> {
    const data = await $fetch<Message[]>(`/api/chats/${conversationId}/messages`)
    return data.sort((a, b) => new Date(a.sendAt).getTime() - new Date(b.sendAt).getTime())
  }
} 