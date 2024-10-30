<template>
  <div class="unit-list">
    <UnitItem v-for="unit in filteredUnits" :key="unit.id" :unit="unit" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { useUnitsStore } from '../../stores/units.ts'
import UnitItem from '../Unit/Item.vue'

const unitsStore = useUnitsStore()

onMounted(() => {
  unitsStore.fetchUnits()
})

const filteredUnits = computed(() => unitsStore.filteredUnits)
</script>

<style lang="scss" scoped>
.unit-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
