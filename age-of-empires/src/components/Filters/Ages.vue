<template>
  <div id="form-wrapper">
    <div class="unit-count">
      {{ filteredUnits.length }}
      <span v-if="selectedAge !== 'all'">
        {{ selectedAge.charAt(0).toUpperCase() + selectedAge.slice(1) }} Age
      </span>
      units found!
    </div>

    <form>
      <div id="slider">
        <template v-for="age in ages" :key="`${age.id}`">
          <input
            @change="setSelectedAge(age.value)"
            type="radio"
            name="age"
            :id="String(age.id)"
            :value="age.value"
            :checked="selectedAge === age.value"
          />
          <label :for="String(age.id)" :data-age="age.label" />
        </template>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { useUnitsStore } from '@/stores/units.ts'

const unitsStore = useUnitsStore()

onMounted(() => {
  unitsStore.fetchUnits()
})

const selectedAge = computed(() => unitsStore.selectedAge)
const filteredUnits = computed(() => unitsStore.filteredUnits)
const { setSelectedAge } = unitsStore

const ages = [
  { id: 1, value: 'all', label: 'All' },
  { id: 2, value: 'dark', label: 'Dark' },
  { id: 3, value: 'feudal', label: 'Feudal' },
  { id: 4, value: 'castle', label: 'Castle' },
  { id: 5, value: 'imperial', label: 'Imperial' },
]
</script>

<style lang="scss" scoped>
$number-of-options: 5;

#form-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;

  .unit-count {
    font-weight: 600;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
}

form {
  width: 100%;

  #slider {
    display: flex;
    flex-direction: row;
    align-content: stretch;
    position: relative;
    width: 100%;
    height: 50px;
    user-select: none;

    &::before {
      content: ' ';
      position: absolute;
      height: 2px;
      width: calc(100% * (#{$number-of-options - 1} / #{$number-of-options}));
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #000;
    }

    input,
    label {
      box-sizing: border-box;
      flex: 1;
      user-select: none;
      cursor: pointer;
    }

    label {
      display: inline-block;
      position: relative;
      width: calc(100% / #{$number-of-options});
      height: 100%;
      user-select: none;

      &::before {
        content: attr(data-age);
        position: absolute;
        left: 50%;
        padding-top: 10px;
        transform: translate(-50%, 45px);
        font-size: 14px;
        letter-spacing: 0.4px;
        font-weight: 400;
        white-space: nowrap;
        opacity: 0.85;
        transition: all 0.15s ease-in-out;
      }

      &::after {
        content: ' ';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 30px;
        height: 30px;
        border: 2px solid #000;
        background: #fff;
        border-radius: 50%;
        pointer-events: none;
        user-select: none;
        z-index: 1;
        cursor: pointer;
        transition: all 0.15s ease-in-out;

        &:first-of-type {
          background: #000;
        }
      }

      &:hover::after {
        transform: translate(-50%, -50%) scale(1.25);
      }
    }

    input {
      display: none;

      &:checked {
        + label::before {
          font-weight: 800;
          opacity: 1;
        }

        + label::after {
          border-width: 4px;
          transform: translate(-50%, -50%) scale(0.75);
          background: #000;
        }
      }
    }
  }

  &:valid {
    #slider {
      input {
        + label::before {
          transform: translate(-50%, 45px) scale(0.9);
          transition: all 0.15s linear;
        }

        &:checked + label::before {
          transform: translate(-50%, 45px) scale(1.1);
          transition: all 0.15s linear;
        }
      }
    }
  }
}
</style>
