<script setup lang="ts">
import UnitList from '@/components/Unit/List.vue'
import FiltersAges from '@/components/Filters/Ages.vue'
import FiltersCost from '@/components/Filters/Cost.vue'
</script>

<template>
  <main>
    <details>
      <summary>Show Filters</summary>
      <FiltersAges />
      <FiltersCost />
    </details>
    <UnitList />
  </main>
</template>
