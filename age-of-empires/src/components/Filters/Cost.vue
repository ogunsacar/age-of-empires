<template>
  <div>
    <form>
      <div class="range-input">
        <div>
          <div>Wood 🪵</div>

          <div class="checkbox-wrapper">
            <input
              class="tgl tgl-light"
              id="wood"
              type="checkbox"
              name="wood"
              v-model="wood.isChecked"
            />
            <label class="tgl-btn" for="wood" />
          </div>
        </div>

        <VueSimpleRangeSlider
          v-if="wood.isChecked"
          style="width: 100%"
          :min="0"
          :max="225"
          active-bar-color="#cc976e"
          v-model="wood.range"
        >
          <template #prefix>🪵</template>
        </VueSimpleRangeSlider>
      </div>

      <div class="range-input">
        <div>
          <div>Food 🥩</div>

          <div class="checkbox-wrapper">
            <input
              class="tgl tgl-light"
              id="food"
              type="checkbox"
              name="food"
              v-model="food.isChecked"
            />
            <label class="tgl-btn" for="food" />
          </div>
        </div>

        <VueSimpleRangeSlider
          v-if="food.isChecked"
          style="width: 100%"
          :min="0"
          :max="225"
          active-bar-color="#a11c10"
          v-model="food.range"
        >
          <template #prefix>🥩</template>
        </VueSimpleRangeSlider>
      </div>

      <div class="range-input">
        <div>
          <div>Gold 🟡</div>
          <div class="checkbox-wrapper">
            <input
              class="tgl tgl-light"
              id="gold"
              type="checkbox"
              name="gold"
              v-model="gold.isChecked"
            />
            <label class="tgl-btn" for="gold" />
          </div>
        </div>

        <VueSimpleRangeSlider
          v-if="gold.isChecked"
          style="width: 100%"
          :min="0"
          :max="225"
          active-bar-color="#f0da32"
          v-model="gold.range"
        >
          <template #prefix>🌕</template>
        </VueSimpleRangeSlider>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import VueSimpleRangeSlider from 'vue-simple-range-slider'
import 'vue-simple-range-slider/css'
import { reactive, watch, ref } from 'vue'

const debounceTimeout = ref(null)

const wood = reactive({ range: [0, 225], isChecked: false })
const food = reactive({ range: [0, 225], isChecked: false })
const gold = reactive({ range: [0, 225], isChecked: false })

watch(
  () => [wood.range, food.range, gold.range],
  () => {
    if (debounceTimeout.value) clearTimeout(debounceTimeout.value)

    debounceTimeout.value = setTimeout(() => {
      console.log('Updated wood range:', wood.range)
      console.log('Updated food range:', food.range)
      console.log('Updated gold range:', gold.range)
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
