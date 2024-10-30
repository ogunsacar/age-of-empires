import { useRouter } from 'vue-router'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import UnitItem from '@/components/Unit/Item.vue'

vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}))

describe('UnitItem', () => {
  let routerMock: any

  beforeEach(() => {
    routerMock = {
      push: vi.fn(),
    }
    ;(useRouter as jest.Mock).mockReturnValue(routerMock)
  })

  it('renders unit details', () => {
    const unit = {
      id: 1,
      name: 'Archer',
      age: 'Feudal',
      cost: {
        food: 50,
        wood: 25,
        gold: 0,
      },
    }

    const wrapper = mount(UnitItem, {
      props: {
        unit,
      },
    })

    expect(wrapper.find('.unit-card_id').text()).toBe('1')

    expect(wrapper.find('.unit-card_name').text()).toBe('Archer')

    expect(wrapper.find('.unit-card_age').text()).toBe('Feudal')

    const costDiv = wrapper.find('div[style*="min-width: 115px"]')

    expect(costDiv.text()).toContain('50')
    expect(costDiv.text()).toContain('🥩')
    expect(costDiv.text()).toContain('25')
    expect(costDiv.text()).toContain('🪵')
  })

  it('renders - when there is no cost', () => {
    const unit = {
      id: 2,
      name: 'Militia',
      age: 'Dark',
    }

    const wrapper = mount(UnitItem, {
      props: {
        unit,
      },
    })

    const costDiv = wrapper.find('div[style*="min-width: 115px"]')

    expect(costDiv.text()).toBe('-')
  })

  it('shows some of the cost data', () => {
    const unit = {
      id: 3,
      name: 'Knight',
      age: 'Castle',
      cost: {
        gold: 75,
      },
    }

    const wrapper = mount(UnitItem, {
      props: {
        unit,
      },
    })

    const costDiv = wrapper.find('div[style*="min-width: 115px"]')

    expect(costDiv.text()).toContain('75')
    expect(costDiv.text()).toContain('🌕')
    expect(costDiv.text()).not.toContain('🥩')
    expect(costDiv.text()).not.toContain('🪵')
  })

  it('navigates to unit detail on click', async () => {
    const unit = {
      id: 4,
      name: 'Scout Cavalry',
      age: 'Feudal',
    }

    const wrapper = mount(UnitItem, {
      props: {
        unit,
      },
    })

    await wrapper.trigger('click')

    expect(routerMock.push).toHaveBeenCalledWith({
      name: 'unit_detail',
      params: { id: 4 },
    })
  })
})
