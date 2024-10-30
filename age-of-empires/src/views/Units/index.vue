<script setup lang="ts">
import { computed } from 'vue'
import UnitList from '@/components/Unit/List.vue'
import FiltersAges from '@/components/Filters/Ages.vue'
import FiltersCost from '@/components/Filters/Cost.vue'
import { useUnitsStore } from '../../stores/units.ts'
import type { IUnit } from '@/types/unit.types.ts'

const unitsStore = useUnitsStore()

const filteredUnits = computed<IUnit>(() => unitsStore.filteredUnits)
</script>

<template>
  <main>
    <details>
      <summary>
        Show Filters <strong>({{ filteredUnits.length }} units)</strong>
      </summary>
      <FiltersAges />
      <FiltersCost />
    </details>
    <UnitList />
  </main>
</template>
