import { nextTick, defineComponent } from 'vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useRoute } from 'vue-router'
import { mount, RouterLinkStub } from '@vue/test-utils'
import UnitDetail from '@/views/Units/_id.vue'
import { useUnitsStore } from '@/stores/units'

vi.mock('@/stores/units', () => ({
  useUnitsStore: vi.fn(),
}))

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  RouterLink: defineComponent({
    name: 'RouterLink',
    props: ['to'],
    template: '<a :href="to"><slot /></a>',
  }),
}))

describe('UnitDetail', () => {
  let unitsStoreMock: any
  let routeMock: any

  beforeEach(() => {
    unitsStoreMock = {
      fetchUnitById: vi.fn(),
      unit: {},
    }

    routeMock = {
      params: {
        id: '1',
      },
    }
    ;(useUnitsStore as unknown as vi.Mock).mockReturnValue(unitsStoreMock)
    ;(useRoute as unknown as vi.Mock).mockReturnValue(routeMock)
  })

  it('fetches unit by ID on mount', () => {
    mount(UnitDetail)
    expect(unitsStoreMock.fetchUnitById).toHaveBeenCalledWith(1)
  })

  it('displays unit details', async () => {
    unitsStoreMock.unit = {
      id: 1,
      name: 'Archer',
      description: 'A ranged unit.',
      age: 'Feudal',
      cost: {
        food: 50,
        wood: 25,
        gold: 45,
      },
      build_time: 35,
      reload_time: 2,
      hit_points: 30,
      attack: 4,
      accuracy: '80%',
      movement_rate: 1.2,
      attack_delay: 0.5,
      line_of_sight: 6,
      search_radius: 5,
      blast_radius: 0.5,
      range: 4,
      armor: '0/0',
    }
    const wrapper = mount(UnitDetail, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    await nextTick()

    expect(wrapper.find('.detail-item_title_name').text()).toBe('Archer')

    expect(wrapper.find('.detail-item_title_desc').text()).toBe(
      'A ranged unit.',
    )

    expect(wrapper.find('.detail-item_age').text()).toBe('1 - Feudal Age')

    const costElements = wrapper.findAll('.detail-item_info > div[tooltip]')
    const tooltips = costElements.map(el => el.attributes('tooltip'))

    expect(tooltips).toContain('Food')
    expect(tooltips).toContain('Wood')
    expect(tooltips).toContain('Gold')

    const expectedProperties = [
      'Build Time',
      'Reload Time',
      'Hit Points',
      'Attack',
      'Accuracy',
      'Movement Rate',
      'Attack Delay',
      'Line Of Sight',
      'Search Radius',
      'Blast Radius',
      'Range',
      'Armor',
    ]

    expectedProperties.forEach(property => {
      expect(tooltips).toContain(property)
    })
  })

  it('conditionally renders properties based on unit data', async () => {
    unitsStoreMock.unit = {
      id: 2,
      name: 'Militia',
      description: 'A basic infantry unit.',
      age: 'Dark',
      cost: {
        food: 60,
      },
    }

    const wrapper = mount(UnitDetail, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    await nextTick()

    const costElements = wrapper.findAll('.detail-item_info > div[tooltip]')
    const tooltips = costElements.map(el => el.attributes('tooltip'))

    expect(tooltips).toContain('Food')
    expect(tooltips).not.toContain('Wood')
    expect(tooltips).not.toContain('Gold')

    const propertiesNotPresent = [
      'Build Time',
      'Reload Time',
      'Hit Points',
      'Attack',
      'Accuracy',
      'Movement Rate',
      'Attack Delay',
      'Line Of Sight',
      'Search Radius',
      'Blast Radius',
      'Range',
      'Armor',
    ]

    propertiesNotPresent.forEach(property => {
      expect(tooltips).not.toContain(property)
    })
  })

  it('renders additional properties if there is', async () => {
    unitsStoreMock.unit = {
      id: 3,
      name: 'Siege Engine',
      description: 'A powerful siege unit.',
      age: 'Imperial',
      cost: {
        wood: 200,
        gold: 150,
      },
      hit_points: 200,
      attack: 50,
      range: 12,
      blast_radius: 1.5,
      armor: '3/0',
    }

    const wrapper = mount(UnitDetail, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    await nextTick()

    const costElements = wrapper.findAll('.detail-item_info > div[tooltip]')
    const tooltips = costElements.map(el => el.attributes('tooltip'))

    expect(tooltips).toContain('Wood')
    expect(tooltips).toContain('Gold')

    const propertiesPresent = [
      'Hit Points',
      'Attack',
      'Range',
      'Blast Radius',
      'Armor',
    ]

    propertiesPresent.forEach(property => {
      expect(tooltips).toContain(property)
    })

    const propertiesNotPresent = [
      'Food',
      'Build Time',
      'Reload Time',
      'Accuracy',
      'Movement Rate',
      'Attack Delay',
      'Line Of Sight',
      'Search Radius',
    ]

    propertiesNotPresent.forEach(property => {
      expect(tooltips).not.toContain(property)
    })
  })

  it('renders the Go back button', () => {
    const wrapper = mount(UnitDetail, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    const goBackLink = wrapper.findComponent(RouterLinkStub)

    expect(goBackLink.exists()).toBe(true)
    expect(goBackLink.props('to')).toBe('/units')
    expect(goBackLink.text()).toBe('Go back')
  })
})
