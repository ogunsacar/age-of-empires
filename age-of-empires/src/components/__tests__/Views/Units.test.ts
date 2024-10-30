import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import Units from '@/views/Units/index.vue'
import UnitList from '@/components/Unit/List.vue'
import FiltersAges from '@/components/Filters/Ages.vue'
import FiltersCost from '@/components/Filters/Cost.vue'

describe('Units', () => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
  })

  it('renders UnitList and filters components', () => {
    const wrapper = mount(Units, {
      global: {
        plugins: [createPinia()],
      },
    })

    expect(wrapper.findComponent(UnitList).exists()).toBe(true)
    expect(wrapper.findComponent(FiltersAges).exists()).toBe(true)
    expect(wrapper.findComponent(FiltersCost).exists()).toBe(true)
  })

  it('toggles filters visibility when filters is clicked', async () => {
    const wrapper = mount(Units, {
      global: {
        plugins: [createPinia()],
      },
    })

    const details = wrapper.find('details')
    expect(details.exists()).toBe(true)

    expect(details.element.open).toBe(false)
  })
})
