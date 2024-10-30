<template>
  <div class="detail-item">
    <div class="detail-item_title">
      <div class="detail-item_title_name">
        {{ unit.name }}
      </div>
      <div class="detail-item_title_desc">
        {{ unit.description }}
      </div>
    </div>

    <div class="detail-item_age">{{ unit.id }} - {{ unit.age }} Age</div>

    <div class="detail-item_info">
      <div tooltip="Food" v-if="unit.cost?.food">
        <div>🥩</div>
        <div>
          {{ unit.cost.food }}
        </div>
      </div>
      <div tooltip="Wood" v-if="unit.cost?.wood">
        <div>🪵</div>
        <div>
          {{ unit.cost.wood }}
        </div>
      </div>
      <div tooltip="Gold" v-if="unit.cost?.gold">
        <div>🌕</div>
        <div>
          {{ unit.cost.gold }}
        </div>
      </div>
      <div tooltip="Build Time" v-if="unit.build_time">
        <div>⏳</div>
        <div>
          {{ unit.build_time }}
        </div>
      </div>
      <div tooltip="Reload Time" v-if="unit.reload_time">
        <div>🔋</div>
        <div>
          {{ unit.reload_time }}
        </div>
      </div>
      <div tooltip="Hit Points" v-if="unit.hit_points">
        <div>♥️</div>
        <div>
          {{ unit.hit_points }}
        </div>
      </div>
      <div tooltip="Attack" v-if="unit.attack">
        <div>⚔️</div>
        <div>
          {{ unit.attack }}
        </div>
      </div>
      <div tooltip="Accuracy" v-if="unit.accuracy">
        <div>🎯</div>
        <div>
          {{ unit.accuracy }}
        </div>
      </div>
      <div tooltip="Movement Rate" v-if="unit.movement_rate">
        <div>👣</div>
        <div>
          {{ unit.movement_rate }}
        </div>
      </div>
      <div tooltip="Attack Delay" v-if="unit.attack_delay">
        <div>💤</div>
        <div>
          {{ unit.attack_delay }}
        </div>
      </div>
      <div tooltip="Line Of Sight" v-if="unit.line_of_sight">
        <div>👁️</div>
        <div>
          {{ unit.line_of_sight }}
        </div>
      </div>
      <div tooltip="Search Radius" v-if="unit.search_radius">
        <div>🔍</div>
        <div>
          {{ unit.search_radius }}
        </div>
      </div>
      <div tooltip="Blast Radius" v-if="unit.blast_radius">
        <div>💥</div>
        <div>
          {{ unit.blast_radius }}
        </div>
      </div>
      <div tooltip="Range" v-if="unit.range">
        <div>🏹</div>
        <div>
          {{ unit.range }}
        </div>
      </div>
      <div tooltip="Armor" v-if="unit.armor">
        <div>🦺</div>
        <div>
          {{ unit.armor }}
        </div>
      </div>
    </div>
  </div>

  <div class="detail-cta">
    <RouterLink to="/units">Go back</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUnitsStore } from '../../stores/units.ts'
import type { IUnit } from '@/types/unit.types.ts'
import { RouterLink } from 'vue-router'

const unitsStore = useUnitsStore()

onMounted(() => {
  const { id } = route.params

  unitsStore.fetchUnitById(+id)
})

const route = useRoute()
const unit = computed<IUnit>(() => unitsStore.unit)
</script>

<style lang="scss" scoped>
.detail {
  &-item {
    padding: 20px;
    border: 1px solid #808080;
    border-radius: 10px;

    &_title {
      display: flex;
      justify-content: space-between;

      @media (max-width: 600px) {
        flex-direction: column;
      }

      &_name {
        font-weight: 700;
        font-size: 1.8rem;

        @media (max-width: 600px) {
          font-size: 1.2rem;
        }
      }
      &_desc {
        font-size: 1.2rem;
        font-weight: 500;
        font-style: italic;
        max-width: 900px;

        @media (max-width: 600px) {
          font-size: 0.9rem;
        }
      }
    }
    &_age {
      color: gray;
      font-size: 1.2rem;

      @media (max-width: 600px) {
        font-size: 0.9rem;
        margin-top: 0.5rem;
      }
    }
    &_info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 2rem;

      @media (max-width: 600px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.5rem;
      }

      & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
  &-cta {
    margin-top: 2rem;
    padding: 0.5rem 1rem;
    border: #1d1d1d 1px solid;
    border-radius: 8px;
    width: 120px;
    text-align: center;

    & > a {
      color: #808080;
    }
  }
}
</style>
