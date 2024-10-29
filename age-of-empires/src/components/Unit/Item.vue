<template>
  <div class="unit-card" @click="showDetail(unit.id)">
    <div class="unit-card_id">{{ unit.id }}</div>
    <div class="unit-card_name">{{ unit.name }}</div>
    <div class="unit-card_age">{{ unit.age }}</div>
    <div style="min-width: 115px; text-align: center" v-if="!unit.cost">-</div>
    <div style="min-width: 115px; text-align: center" v-else>
      <span v-if="unit.cost?.food"
        >{{ unit.cost.food }}
        <span> 🥩 </span>
      </span>
      <span v-if="unit.cost?.wood"
        >{{ unit.cost.wood }} <span> 🪵 </span>
      </span>
      <span v-if="unit.cost?.gold"
        >{{ unit.cost.gold }} <span> 🌕 </span>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  unit: {
    type: Object,
    required: true,
  },
})

function showDetail(id) {
  router.push({ name: 'unit_detail', params: { id } })
}
</script>

<style lang="scss" scoped>
.unit-card {
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 0.5rem 0.5rem;
  display: grid;
  grid-template-columns: 0.2fr 1fr 0.8fr 0.9fr;
  column-gap: 0.1rem;

  &:hover {
    border: 2px solid #1d1d1d;
    cursor: pointer;
  }

  &_id {
    color: #858585;
  }

  &_name {
    font-weight: bold;
  }

  &_age {
    font-style: italic;
  }
}
</style>
