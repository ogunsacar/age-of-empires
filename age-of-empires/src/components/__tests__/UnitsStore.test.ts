import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useUnitsStore } from '@/stores/units'

global.fetch = vi.fn()

const mockUnitsData = {
  units: [
    {
      id: 1,
      name: 'Archer',
      age: 'Feudal',
      cost: { wood: 25, gold: 45 },
    },
    {
      id: 2,
      name: 'Militia',
      age: 'Dark',
      cost: { food: 60 },
    },
    {
      id: 3,
      name: 'Knight',
      age: 'Castle',
      cost: { food: 60, gold: 75 },
    },
  ],
}

describe('Units Store', () => {
  let unitsStore: ReturnType<typeof useUnitsStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    unitsStore = useUnitsStore()

    vi.clearAllMocks()
  })

  it('initializes state variables', () => {
    expect(unitsStore.units).toEqual([])
    expect(unitsStore.unit).toEqual({})
    expect(unitsStore.selectedAge).toBe('all')
    expect(unitsStore.initialRanges).toEqual({
      wood: [0, 999],
      food: [0, 999],
      gold: [0, 999],
    })
    expect(unitsStore.filterRanges).toEqual({
      wood: [0, 999],
      food: [0, 999],
      gold: [0, 999],
    })
    expect(unitsStore.isChecked).toEqual({
      wood: false,
      food: false,
      gold: false,
    })
  })

  it('fetches units', async () => {
    ;(fetch as unknown as vi.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockUnitsData),
    })

    await unitsStore.fetchUnits()

    expect(fetch).toHaveBeenCalledWith('/data/age-of-empires-units.json')
    expect(unitsStore.units).toEqual(mockUnitsData.units)

    expect(unitsStore.initialRanges).toEqual({
      wood: [25, 25],
      food: [60, 60],
      gold: [45, 75],
    })

    expect(unitsStore.filterRanges).toEqual(unitsStore.initialRanges)
  })

  it('fetches the unit', async () => {
    ;(fetch as unknown as vi.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockUnitsData),
    })

    await unitsStore.fetchUnitById(2)

    expect(fetch).toHaveBeenCalledWith('/data/age-of-empires-units.json')

    expect(unitsStore.unit).toEqual({
      id: 2,
      name: 'Militia',
      age: 'Dark',
      cost: { food: 60 },
    })
  })

  it('updates the selectedAge state', () => {
    unitsStore.setSelectedAge('feudal')
    expect(unitsStore.selectedAge).toBe('feudal')
  })

  it('updates filterRanges and isChecked', () => {
    unitsStore.setResourceRange('wood', [10, 50], true)
    expect(unitsStore.filterRanges.wood).toEqual([10, 50])
    expect(unitsStore.isChecked.wood).toBe(true)

    unitsStore.setResourceRange('gold', [30, 80], false)
    expect(unitsStore.filterRanges.gold).toEqual([30, 80])
    expect(unitsStore.isChecked.gold).toBe(false)
  })

  it('filter units', async () => {
    ;(fetch as unknown as vi.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockUnitsData),
    })

    await unitsStore.fetchUnits()

    expect(unitsStore.filteredUnits).toEqual(mockUnitsData.units)

    unitsStore.setSelectedAge('feudal')
    expect(unitsStore.filteredUnits).toEqual([
      {
        id: 1,
        name: 'Archer',
        age: 'Feudal',
        cost: { wood: 25, gold: 45 },
      },
    ])

    unitsStore.setResourceRange('wood', [20, 30], true)
    unitsStore.setResourceRange('gold', [40, 50], true)

    expect(unitsStore.filteredUnits).toEqual([
      {
        id: 1,
        name: 'Archer',
        age: 'Feudal',
        cost: { wood: 25, gold: 45 },
      },
    ])

    unitsStore.setResourceRange('wood', [26, 30], true)
    expect(unitsStore.filteredUnits).toEqual([])

    unitsStore.setResourceRange('wood', [20, 30], false)
    expect(unitsStore.filteredUnits).toEqual([
      {
        id: 1,
        name: 'Archer',
        age: 'Feudal',
        cost: { wood: 25, gold: 45 },
      },
    ])

    unitsStore.setResourceRange('gold', [50, 100], true)
    expect(unitsStore.filteredUnits).toEqual([])

    unitsStore.setSelectedAge('all')
    unitsStore.setResourceRange('gold', [0, 999], false)

    unitsStore.setResourceRange('food', [50, 70], true)
    expect(unitsStore.filteredUnits).toEqual([
      {
        id: 2,
        name: 'Militia',
        age: 'Dark',
        cost: { food: 60 },
      },
      {
        id: 3,
        name: 'Knight',
        age: 'Castle',
        cost: { food: 60, gold: 75 },
      },
    ])
  })
})
