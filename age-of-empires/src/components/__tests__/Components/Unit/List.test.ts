import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest'
import { reactive } from 'vue'
import { mount } from '@vue/test-utils'
import UnitList from '@/components/Unit/List.vue'
import { useUnitsStore } from '@/stores/units'

vi.mock('@/stores/units', () => ({
  useUnitsStore: vi.fn(),
}))

describe('UnitList', () => {
  let unitsStoreMock: any

  beforeEach(() => {
    unitsStoreMock = reactive({
      fetchUnits: vi.fn(),
      filteredUnits: [],
    })
    ;(useUnitsStore as unknown as Mock).mockReturnValue(unitsStoreMock)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('calls fetchUnits on mount', () => {
    mount(UnitList)

    expect(unitsStoreMock.fetchUnits).toHaveBeenCalled()
  })

  it('renders UnitItem components', () => {
    unitsStoreMock.filteredUnits = [
      { id: 1, name: 'Archer' },
      { id: 2, name: 'Knight' },
      { id: 3, name: 'Scout Cavalry' },
    ]

    const wrapper = mount(UnitList, {
      global: {
        stubs: {
          UnitItem: {
            name: 'UnitItem',
            template: '<div class="unit-item"></div>',
          },
        },
      },
    })

    const unitItems = wrapper.findAllComponents({ name: 'UnitItem' })

    expect(unitItems.length).toBe(3)
  })

  it('updates the rendered list when filteredUnits changes', async () => {
    unitsStoreMock.filteredUnits.push({ id: 1, name: 'Archer' })

    const wrapper = mount(UnitList, {
      global: {
        stubs: {
          UnitItem: {
            name: 'UnitItem',
            template: '<div class="unit-item"></div>',
          },
        },
      },
    })

    expect(wrapper.findAllComponents({ name: 'UnitItem' }).length).toBe(1)

    unitsStoreMock.filteredUnits.push({ id: 2, name: 'Knight' })

    await wrapper.vm.$nextTick()

    expect(wrapper.findAllComponents({ name: 'UnitItem' }).length).toBe(2)
  })

  it('shows empty filteredUnits array', () => {
    unitsStoreMock.filteredUnits = []

    const wrapper = mount(UnitList, {
      global: {
        stubs: {
          UnitItem: {
            name: 'UnitItem',
            template: '<div class="unit-item"></div>',
          },
        },
      },
    })

    const unitItems = wrapper.findAllComponents({ name: 'UnitItem' })

    expect(unitItems.length).toBe(0)
  })
})
