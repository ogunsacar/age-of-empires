import { describe, it, expect, beforeEach } from 'vitest'
import { createRouter, createWebHistory, RouterLink } from 'vue-router'
import { mount } from '@vue/test-utils'
import CommonHeader from '@/components/Common/Header.vue'

describe('CommonHeader', () => {
  let router: any

  beforeEach(() => {
    const routes = [
      { path: '/', name: 'home' },
      { path: '/units', name: 'units' },
    ]

    router = createRouter({
      history: createWebHistory(),
      routes,
    })
  })

  it('renders the header title', () => {
    const wrapper = mount(CommonHeader, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.find('.header-title').text()).toBe('Age of Empires')
  })

  it('renders navigation links', () => {
    const wrapper = mount(CommonHeader, {
      global: {
        plugins: [router],
        stubs: {
          RouterLink: false,
        },
      },
    })

    const navLinks = wrapper.findAllComponents(RouterLink)

    expect(navLinks.length).toBe(2)

    expect(navLinks[0].props('to')).toBe('/')
    expect(navLinks[0].text()).toBe('Home')

    expect(navLinks[1].props('to')).toBe('/units')
    expect(navLinks[1].text()).toBe('Units')
  })

  it('navigates to the route when links are clicked', async () => {
    const wrapper = mount(CommonHeader, {
      global: {
        plugins: [router],
        stubs: {
          RouterLink: false,
        },
      },
    })

    await router.isReady()

    const navLinks = wrapper.findAll('a')

    await navLinks[1].trigger('click')
    await wrapper.vm.$nextTick()

    await new Promise(resolve => setTimeout(resolve, 0))

    expect(router.currentRoute.value.path).toBe('/units')

    await navLinks[0].trigger('click')
    await wrapper.vm.$nextTick()

    await new Promise(resolve => setTimeout(resolve, 0))

    expect(router.currentRoute.value.path).toBe('/')
  })
})
