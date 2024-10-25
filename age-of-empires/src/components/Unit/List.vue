<template>
  <div>
    <div class="unit-list">
      <UnitItem v-for="unit in units" :key="unit.id" :unit="unit" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import UnitItem from '../Unit/Item.vue'

const units = ref(null)

onMounted(() => {
  fetch('/data/age-of-empires-units.json')
    .then(response => response.json())
    .then(data => {
      units.value = data.units
    })
    .catch(error => console.error(error))
})
</script>

<style lang="scss" scoped>
.unit-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
