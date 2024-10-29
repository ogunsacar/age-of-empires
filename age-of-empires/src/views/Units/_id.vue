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
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUnitsStore } from '../../stores/units.ts'

const unitsStore = useUnitsStore()

onMounted(() => {
  const { id } = route.params

  unitsStore.fetchUnitById(id)
})

const route = useRoute()
const unit = computed(() => unitsStore.unit)
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
}

[tooltip] {
  position: relative;
}

[tooltip]::before,
[tooltip]::after {
  text-transform: none;
  font-size: 0.9em;
  line-height: 1;
  user-select: none;
  pointer-events: none;
  position: absolute;
  display: none;
  opacity: 0;
}
[tooltip]::before {
  content: '';
  border: 5px solid transparent;
  z-index: 1001;
}
[tooltip]::after {
  content: attr(tooltip);
  text-align: center;
  min-width: 3em;
  max-width: 21em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 1ch 1.5ch;
  border-radius: 0.3ch;
  box-shadow: 0 1em 2em -0.5em rgba(0, 0, 0, 0.35);
  background: #333;
  color: #fff;
  z-index: 1000;
}

[tooltip]:hover::before,
[tooltip]:hover::after {
  display: block;
}

[tooltip='']::before,
[tooltip='']::after {
  display: none !important;
}

[tooltip]:not([flow])::before,
[tooltip][flow^='up']::before {
  bottom: 100%;
  border-bottom-width: 0;
  border-top-color: #333;
}
[tooltip]:not([flow])::after,
[tooltip][flow^='up']::after {
  bottom: calc(100% + 5px);
}
[tooltip]:not([flow])::before,
[tooltip]:not([flow])::after,
[tooltip][flow^='up']::before,
[tooltip][flow^='up']::after {
  left: 50%;
  transform: translate(-50%, -0.5em);
}

@keyframes tooltips-vert {
  to {
    opacity: 0.9;
    transform: translate(-50%, 0);
  }
}

@keyframes tooltips-horz {
  to {
    opacity: 0.9;
    transform: translate(0, -50%);
  }
}

[tooltip]:not([flow]):hover::before,
[tooltip]:not([flow]):hover::after,
[tooltip][flow^='up']:hover::before,
[tooltip][flow^='up']:hover::after {
  animation: tooltips-vert 300ms ease-out forwards;
}
</style>
