import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import FiltersCost from '@/components/Filters/Cost.vue'
import { useUnitsStore } from '@/stores/units'
import { nextTick } from 'vue'

vi.mock('@/stores/units', () => ({
  useUnitsStore: vi.fn(),
}))

vi.mock('vue-simple-range-slider', () => ({
  default: {
    name: 'VueSimpleRangeSlider',
    props: ['min', 'max', 'activeBarColor', 'modelValue'],
    template: '<div class="vue-simple-range-slider"></div>',
  },
}))

describe('FiltersCost', () => {
  let unitsStoreMock: any

  const mockResources = [
    {
      name: 'wood',
      label: 'Wood 🪵',
      icon: '🪵',
      color: '#cc976e',
    },
    {
      name: 'food',
      label: 'Food 🥩',
      icon: '🥩',
      color: '#a11c10',
    },
    {
      name: 'gold',
      label: 'Gold 🟡',
      icon: '🌕',
      color: '#f0da32',
    },
  ]

  beforeEach(() => {
    unitsStoreMock = {
      initialRanges: {
        wood: [0, 100],
        food: [0, 200],
        gold: [0, 300],
      },
      filterRanges: {
        wood: [0, 100],
        food: [0, 200],
        gold: [0, 300],
      },
      isChecked: {
        wood: false,
        food: false,
        gold: false,
      },
      setResourceRange: vi.fn(),
    }
    ;(useUnitsStore as unknown as vi.Mock).mockReturnValue(unitsStoreMock)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('initializes resourceData', () => {
    const wrapper = mount(FiltersCost)

    const resourceData = wrapper.vm.resourceData

    mockResources.forEach(resource => {
      expect(resourceData[resource.name].range).toEqual(
        unitsStoreMock.filterRanges[resource.name],
      )
      expect(resourceData[resource.name].isChecked).toBe(
        unitsStoreMock.isChecked[resource.name],
      )
    })
  })

  it('renders checkboxes and sliders', () => {
    const wrapper = mount(FiltersCost)

    mockResources.forEach(resource => {
      const checkbox = wrapper.find(`input#${resource.name}`)
      expect(checkbox.exists()).toBe(true)
      expect(checkbox.element.type).toBe('checkbox')

      const slider = wrapper.findComponent({
        name: 'VueSimpleRangeSlider',
        ref: resource.name,
      })
      expect(slider.exists()).toBe(false)
    })
  })

  it('calls setResourceRange', async () => {
    vi.useFakeTimers()

    const wrapper = mount(FiltersCost)

    wrapper.vm.resourceData.wood.isChecked = true
    await nextTick()

    vi.advanceTimersByTime(500)

    expect(unitsStoreMock.setResourceRange).toHaveBeenCalledWith(
      'wood',
      wrapper.vm.resourceData.wood.range,
      true,
    )

    wrapper.vm.resourceData.wood.range = [10, 90]
    await nextTick()

    vi.advanceTimersByTime(500)

    expect(unitsStoreMock.setResourceRange).toHaveBeenCalledWith(
      'wood',
      [10, 90],
      true,
    )

    wrapper.vm.resourceData.wood.isChecked = false
    await nextTick()

    vi.advanceTimersByTime(500)

    expect(unitsStoreMock.setResourceRange).toHaveBeenCalledWith(
      'wood',
      unitsStoreMock.filterRanges.wood,
      false,
    )

    vi.useRealTimers()
  })

  it('handles multiple resources', async () => {
    vi.useFakeTimers()

    const wrapper = mount(FiltersCost)

    wrapper.vm.resourceData.wood.isChecked = true
    wrapper.vm.resourceData.food.isChecked = true
    await nextTick()

    vi.advanceTimersByTime(500)

    expect(unitsStoreMock.setResourceRange).toHaveBeenCalledWith(
      'wood',
      wrapper.vm.resourceData.wood.range,
      true,
    )
    expect(unitsStoreMock.setResourceRange).toHaveBeenCalledWith(
      'food',
      wrapper.vm.resourceData.food.range,
      true,
    )

    wrapper.vm.resourceData.gold.isChecked = true
    await nextTick()

    vi.advanceTimersByTime(500)

    expect(unitsStoreMock.setResourceRange).toHaveBeenCalledWith(
      'gold',
      wrapper.vm.resourceData.gold.range,
      true,
    )

    vi.useRealTimers()
  })

  it('updates the store', async () => {
    vi.useFakeTimers()

    const wrapper = mount(FiltersCost)

    wrapper.vm.resourceData.wood.isChecked = true
    await nextTick()

    vi.advanceTimersByTime(500)

    wrapper.vm.resourceData.wood.isChecked = false
    await nextTick()

    vi.advanceTimersByTime(500)

    expect(unitsStoreMock.setResourceRange).toHaveBeenCalledWith(
      'wood',
      unitsStoreMock.filterRanges.wood,
      false,
    )

    vi.useRealTimers()
  })
})
