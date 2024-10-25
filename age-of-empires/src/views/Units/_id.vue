<template>
  <div class="detail">
    <div class="detail-item">
      <div class="detail-item_title">
        <div class="detail-item_title_name">
          {{ unit.id }} / {{ unit.name }}
        </div>
        <div class="detail-item_title_desc">{{ unit.description }}</div>
      </div>

      <div class="detail-item_age">{{ unit.age }} Age</div>
    </div>

    <div class="detail-item">
      <div v-if="unit.cost?.food">{{ unit.cost.food }} 🥩</div>
      <div v-if="unit.cost?.wood">{{ unit.cost.wood }} 🪵</div>
      <div v-if="unit.cost?.gold">{{ unit.cost.gold }} 🌕</div>
      <div v-if="unit.build_time">
        <span>Build Time:</span>
        <span>{{ unit.build_time }}</span>
      </div>
      <div v-if="unit.reload_time">
        <span>Reload Time:</span>
        <span>{{ unit.reload_time }} </span>
      </div>
      <div v-if="unit.hit_points">
        <span>{{ unit.hit_points }} ♥️</span>
      </div>
      <div v-if="unit.attack">
        <span>{{ unit.attack }} ⚔️</span>
      </div>
      <div v-if="unit.accuracy">
        <span>{{ unit.accuracy }} 🎯</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const unit = ref({})

onMounted(() => {
  const { id } = route.params

  fetch('/data/age-of-empires-units.json')
    .then(response => response.json())
    .then(data => {
      unit.value = data.units.find(u => u.id === +id)
    })
    .catch(error => console.error(error))
})
</script>

<style lang="scss" scoped>
.detail {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &-item {
    padding: 20px 10px;
    border: 1px solid #aaaaaa;
    border-radius: 10px;

    &_title {
      display: flex;
      justify-content: space-between;

      &_name {
        font-size: 1.2rem;
        font-weight: 700;
      }
      &_desc {
        font-size: 1rem;
        font-weight: 500;
        font-style: italic;
      }
    }
    &_age {
      color: gray;
    }
  }
}
</style>
