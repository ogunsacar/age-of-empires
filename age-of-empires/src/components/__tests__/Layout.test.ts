import { describe, it, expect, beforeEach } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import { mount } from '@vue/test-utils'
import Layout from '@/layouts/default.vue'
import CommonHeader from '@/components/Common/Header.vue'

describe('Layout', () => {
  let wrapper: any
  let router: any

  beforeEach(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/',
          component: {
            template: '<div class="home-page">Home Page Content</div>',
          },
        },
        {
          path: '/about',
          component: {
            template: '<div class="about-page">About Page Content</div>',
          },
        },
      ],
    })

    wrapper = mount(Layout, {
      global: {
        plugins: [router],
        stubs: {
          CommonHeader: true,
        },
      },
    })

    await router.isReady()
  })

  it('renders CommonHeader component', () => {
    expect(wrapper.findComponent(CommonHeader).exists()).toBe(true)
  })

  it('renders component based on the route', async () => {
    await router.push('/')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.home-page').exists()).toBe(true)
    expect(wrapper.find('.about-page').exists()).toBe(false)

    await router.push('/about')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.about-page').exists()).toBe(true)
    expect(wrapper.find('.home-page').exists()).toBe(false)
  })
})
