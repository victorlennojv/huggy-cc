import { vi } from 'vitest'
import { config } from '@vue/test-utils'
import { ref, computed, reactive, watch, onMounted, nextTick } from 'vue'

vi.stubGlobal('ref', ref)
vi.stubGlobal('computed', computed)
vi.stubGlobal('reactive', reactive)
vi.stubGlobal('watch', watch)
vi.stubGlobal('onMounted', onMounted)
vi.stubGlobal('nextTick', nextTick)

vi.stubGlobal('useRoute', () => ({
  path: '/',
  query: {},
  params: {}
}))

vi.stubGlobal('useRouter', () => ({
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn()
}))

config.global.mocks = {
  $t: (key: string) => key
}