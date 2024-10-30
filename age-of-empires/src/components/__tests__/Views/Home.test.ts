import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Home', () => {
  it('renders an image with the src and alt attributes', () => {
    const wrapper = mount(Home)

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/2k-age-of-wp.png')
    expect(img.attributes('alt')).toBe('age-of-empires')
  })
})
