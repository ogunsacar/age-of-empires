import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IUnit, IUnits } from '@/types/unit.types.ts'

export const useUnitsStore = defineStore('units', () => {
  const units = ref<IUnits>([])
  const unit = ref<IUnit>({} as IUnit)
  const selectedAge = ref('all')

  const resources = ['wood', 'food', 'gold'] as const
  type Resource = (typeof resources)[number]

  const initialRanges = ref<Record<Resource, [number, number]>>({
    wood: [0, 999],
    food: [0, 999],
    gold: [0, 999],
  })

  const filterRanges = ref<Record<Resource, [number, number]>>({
    wood: [...initialRanges.value.wood],
    food: [...initialRanges.value.food],
    gold: [...initialRanges.value.gold],
  })

  const isChecked = ref<Record<Resource, boolean>>({
    wood: false,
    food: false,
    gold: false,
  })

  function findMinMaxCosts(units: IUnits) {
    const minMaxCosts: Record<Resource, { min: number; max: number }> = {
      wood: { min: 0, max: 0 },
      food: { min: 0, max: 0 },
      gold: { min: 0, max: 0 },
    }

    for (const resource of resources) {
      const costs = units
        .map(unit => unit.cost?.[resource])
        .filter((cost): cost is number => cost !== undefined)

      if (costs.length > 0) {
        minMaxCosts[resource].min = Math.min(...costs)
        minMaxCosts[resource].max = Math.max(...costs)
      }
    }

    return minMaxCosts
  }

  async function fetchUnits() {
    try {
      const response = await fetch('/data/age-of-empires-units.json')
      const data = await response.json()
      units.value = data.units

      const minMaxCosts = findMinMaxCosts(units.value)

      for (const resource of resources) {
        initialRanges.value[resource] = [
          minMaxCosts[resource].min,
          minMaxCosts[resource].max,
        ]
        filterRanges.value[resource] = [...initialRanges.value[resource]]
      }
    } catch (error) {
      console.error('Failed to fetch units:', error)
    }
  }

  async function fetchUnitById(id: number) {
    try {
      const response = await fetch('/data/age-of-empires-units.json')
      const data = await response.json()
      unit.value = data.units.find((u: IUnit) => u.id === id) || null
    } catch (error) {
      console.error(`Failed to fetch unit: ${id}`, error)
    }
  }

  function setSelectedAge(age: string) {
    selectedAge.value = age
  }

  function setResourceRange(
    resource: Resource,
    range: [number, number],
    isActive: boolean,
  ) {
    filterRanges.value[resource] = range
    isChecked.value[resource] = isActive
  }

  const filteredUnits = computed(() => {
    return units.value.filter(unit => {
      const ageMatches =
        selectedAge.value === 'all' ||
        unit.age.toLowerCase() === selectedAge.value

      for (const resource of resources) {
        if (isChecked.value[resource]) {
          const cost = unit.cost?.[resource] || 0
          const [min, max] = filterRanges.value[resource]
          if (cost < min || cost > max) {
            return false
          }
        }
      }

      return ageMatches
    })
  })

  return {
    units,
    unit,
    selectedAge,
    initialRanges,
    filterRanges,
    isChecked,
    filteredUnits,
    fetchUnits,
    fetchUnitById,
    setSelectedAge,
    setResourceRange,
  }
})
