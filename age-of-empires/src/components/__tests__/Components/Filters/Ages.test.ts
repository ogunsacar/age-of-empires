import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FiltersAges from '@/components/Filters/Ages.vue'
import { useUnitsStore } from '@/stores/units'

vi.mock('@/stores/units', () => ({
  useUnitsStore: vi.fn(),
}))

describe('FiltersAges', () => {
  let unitsStoreMock: any

  beforeEach(() => {
    unitsStoreMock = {
      fetchUnits: vi.fn(),
      selectedAge: 'all',
      filteredUnits: [],
      setSelectedAge: vi.fn(),
    }
    ;(useUnitsStore as vi.Mock).mockReturnValue(unitsStoreMock)
  })

  it('fetches units on mount', () => {
    mount(FiltersAges)

    expect(unitsStoreMock.fetchUnits).toHaveBeenCalled()
  })

  it('displays the unit count', () => {
    unitsStoreMock.filteredUnits = [{ id: 1 }, { id: 2 }, { id: 3 }]
    unitsStoreMock.selectedAge = 'feudal'

    const wrapper = mount(FiltersAges)

    const unitCountText = wrapper.find('.unit-count').text()

    expect(unitCountText).toContain('3')
    expect(unitCountText).toContain('3 Feudal Age  units found!')
  })

  it('displays when age is all', () => {
    unitsStoreMock.filteredUnits = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
    unitsStoreMock.selectedAge = 'all'

    const wrapper = mount(FiltersAges)

    const unitCountText = wrapper.find('.unit-count').text()

    expect(unitCountText).toContain('4')
    expect(unitCountText).toContain('units found!')
    expect(unitCountText).not.toContain('Age')
  })

  it('calls setSelectedAge when an age is selected', async () => {
    const wrapper = mount(FiltersAges)

    const radioButtons = wrapper.findAll('input[type="radio"]')

    await radioButtons[1].setChecked()

    expect(unitsStoreMock.setSelectedAge).toHaveBeenCalledWith('dark')
  })

  it('selected age changes', async () => {
    unitsStoreMock.selectedAge = 'castle'

    const wrapper = mount(FiltersAges)

    const castleRadio = wrapper.find('input[value="castle"]')

    expect(castleRadio.element.checked).toBe(true)
  })
})
