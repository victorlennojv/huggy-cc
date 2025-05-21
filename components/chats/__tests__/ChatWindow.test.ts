import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ChatWindow from '../ChatWindow.vue'
import { formatTime } from '~/utils/date'
import type { Message } from '~/types/messages'

vi.mock('~/utils/date', () => ({
  formatTime: vi.fn().mockReturnValue('10:00')
}))

vi.mock('~/components/common/BaseAvatar.vue', () => ({
  default: {
    name: 'BaseAvatar',
    template: '<div class="base-avatar"><img :src="src" :alt="name" /></div>',
    props: ['src', 'name', 'size']
  }
}))

describe('ChatWindow', () => {
  const mockConversation = {
    id: 1,
    name: 'Fulano da Silva',
    avatar: 'avatar.jpg',
    lastMessage: 'Hello'
  }

  const mockMessages = [
    {
      id: 270954690,
      text: "https://cdn.pzw.io/1ec9d63c92527f8c794093c78e86561f1a.png",
      isInternal: false,
      isEmail: false,
      sender: {
        id: 33980,
        name: "Fulano da Silva",
        mobile: "557576767676",
        phone: "557576767676",
        email: "teste@abc.com",
        photo: "https://cdn.pzw.io/b4cae08a6373897658bb99b076bdb9257fd.jpg"
      },
      senderType: "agent",
      receiver: {
        id: 1841996,
        name: "John",
        mobile: "999999999",
        phone: "33333333",
        email: "john@doe.com",
        photo: "https://c.pzw.io/img/avatar-user-boy.jpg"
      },
      receiverType: "widget",
      file: null,
      chat: {
        id: 13122329,
        channel: "widget",
        situation: "in_chat",
        department: false,
        customer: {
          id: 1841996,
          name: "John",
          mobile: "999999999",
          phone: "33333333",
          email: "john@doe.com",
          photo: "https://c.pzw.io/img/avatar-user-boy.jpg"
        }
      },
      sendAt: "2019-10-01 10:43:20",
      readAt: null,
      type: "text"
    }
  ]

  describe('Header', () => {
    it('displays conversation name and avatar', () => {
      const wrapper = mount(ChatWindow, {
        props: {
          conversation: mockConversation,
          messages: [],
          isLoading: false
        }
      })

      expect(wrapper.find('.chat-window__name').text()).toBe('Fulano da Silva')
      const avatar = wrapper.findComponent({ name: 'BaseAvatar' })
      expect(avatar.props('src')).toBe('avatar.jpg')
      expect(avatar.props('name')).toBe('Fulano da Silva')
    })
  })

  describe('Messages', () => {
    it('displays messages with correct styling', () => {
      const wrapper = mount(ChatWindow, {
        props: {
          conversation: mockConversation,
          messages: mockMessages as Message[],
          isLoading: false
        }
      })

      const messages = wrapper.findAll('.chat-window__message')
      expect(messages).toHaveLength(1)
      expect(messages[0].classes()).toContain('chat-window__message--me')
      expect(messages[0].find('span').text()).toBe('https://cdn.pzw.io/1ec9d63c92527f8c794093c78e86561f1a.png')
    })

    it('formats and displays message time', () => {
      const wrapper = mount(ChatWindow, {
        props: {
          conversation: mockConversation,
          messages: mockMessages as Message[],
          isLoading: false
        }
      })

      const times = wrapper.findAll('.chat-window__time')
      expect(times).toHaveLength(1)
      expect(times[0].text()).toBe('10:00')
      expect(formatTime).toHaveBeenCalledWith(mockMessages[0].sendAt)
    })
  })
}) 