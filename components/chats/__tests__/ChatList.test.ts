import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ChatList from '../ChatList.vue'

describe('ChatList', () => {
  const mockConversations = [
    {
      id: 1,
      name: 'Fula da Silva',
      avatar: 'avatar1.jpg',
      lastMessage: 'Hello'
    },
    {
      id: 2,
      name: 'Ciclano do Carmo',
      avatar: 'avatar2.jpg',
      lastMessage: 'Hi there'
    }
  ]

  describe('Conversation List', () => {
    it('renders conversations with correct content', () => {
      const wrapper = mount(ChatList, {
        props: {
          conversations: mockConversations,
          selected: undefined
        }
      })

      const items = wrapper.findAll('.chat-list__item')
      expect(items).toHaveLength(2)

      const firstItem = items[0]
      expect(firstItem.find('.chat-list__item-name').text()).toBe('Fula da Silva')
      expect(firstItem.find('.chat-list__item-last-message').text()).toBe('Hello')
      expect(firstItem.findComponent({ name: 'BaseAvatar' }).props('src')).toBe('avatar1.jpg')

      const secondItem = items[1]
      expect(secondItem.find('.chat-list__item-name').text()).toBe('Ciclano do Carmo')
      expect(secondItem.find('.chat-list__item-last-message').text()).toBe('Hi there')
      expect(secondItem.findComponent({ name: 'BaseAvatar' }).props('src')).toBe('avatar2.jpg')
    })

    it('shows empty state when no conversations', () => {
      const wrapper = mount(ChatList, {
        props: {
          conversations: [],
          selected: undefined
        }
      })

      expect(wrapper.find('.chat-list__empty').text()).toBe('Nenhum chat disponível.')
      expect(wrapper.findAll('.chat-list__item')).toHaveLength(0)
    })
  })

  describe('Selection', () => {
    it('applies selected class to selected conversation', () => {
      const wrapper = mount(ChatList, {
        props: {
          conversations: mockConversations,
          selected: mockConversations[0]
        }
      })

      const items = wrapper.findAll('.chat-list__item')
      expect(items[0].classes()).toContain('selected')
      expect(items[1].classes()).not.toContain('selected')
    })
  })
})