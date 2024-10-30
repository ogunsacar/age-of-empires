<template>
  <div>
    <form>
      <div
        class="range-input"
        v-for="resource in resources"
        :key="resource.name"
      >
        <div>
          <div>{{ resource.label }}</div>
          <div class="checkbox-wrapper">
            <input
              class="tgl tgl-light"
              :id="resource.name"
              type="checkbox"
              :name="resource.name"
              v-model="resourceData[resource.name].isChecked"
            />
            <label class="tgl-btn" :for="resource.name" />
          </div>
        </div>

        <VueSimpleRangeSlider
          v-if="resourceData[resource.name].isChecked"
          style="width: 100%"
          :min="unitsStore.initialRanges[resource.name][0]"
          :max="unitsStore.initialRanges[resource.name][1]"
          :active-bar-color="resource.color"
          v-model="resourceData[resource.name].range"
        >
          <template #prefix> {{ resource.icon }} </template>
        </VueSimpleRangeSlider>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import VueSimpleRangeSlider from 'vue-simple-range-slider'
import 'vue-simple-range-slider/css'
import { reactive, watch } from 'vue'
import { useUnitsStore } from '@/stores/units.ts'

const unitsStore = useUnitsStore()

const resources = [
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
] as const

type ResourceName = (typeof resources)[number]['name']

const resourceData = reactive<
  Record<ResourceName, { range: [number, number]; isChecked: boolean }>
>({})

resources.forEach(resource => {
  resourceData[resource.name] = {
    range: [...unitsStore.filterRanges[resource.name]],
    isChecked: unitsStore.isChecked[resource.name],
  }
})

let debounceTimeout: ReturnType<typeof setTimeout> | null = null

watch(
  () =>
    resources.map(resource => [
      resourceData[resource.name].range,
      resourceData[resource.name].isChecked,
    ]),
  () => {
    if (debounceTimeout) clearTimeout(debounceTimeout)

    debounceTimeout = setTimeout(() => {
      resources.forEach(resource => {
        unitsStore.setResourceRange(
          resource.name,
          resourceData[resource.name].isChecked
            ? resourceData[resource.name].range
            : unitsStore.filterRanges[resource.name],
          resourceData[resource.name].isChecked,
        )
      })
    }, 500)
  },
  { deep: true },
)
</script>

<style lang="scss" scoped>
form {
  margin: 2rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 20px;

  @media (max-width: 600px) {
    align-items: unset;
  }
}
.range-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 2rem;
  width: 75vw;

  @media (max-width: 600px) {
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
  }
}
</style>
