import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUnitsStore = defineStore('units', () => {
  const units = ref([])
  const unit = ref({})

  const selectedAge = ref('all')

  async function fetchUnits() {
    try {
      const response = await fetch('/data/age-of-empires-units.json')
      const data = await response.json()
      units.value = data.units
    } catch (error) {
      console.error('Failed to fetch units:', error)
    }
  }

  async function fetchUnitById(id: number) {
    try {
      const response = await fetch('/data/age-of-empires-units.json')
      const data = await response.json()
      unit.value = data.units.find((u: { id: number }) => u.id === +id)
    } catch (error) {
      console.error('Failed to fetch unit:' + `${id}`, error)
    }
  }

  function setSelectedAge(age) {
    selectedAge.value = age
  }

  const filteredUnits = computed(() => {
    return selectedAge.value === 'all'
      ? units.value
      : units.value.filter(unit => unit.age.toLowerCase() === selectedAge.value)
  })

  return {
    units,
    unit,
    selectedAge,
    filteredUnits,
    fetchUnits,
    fetchUnitById,
    setSelectedAge,
  }
})
