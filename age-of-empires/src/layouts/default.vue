<template>
  <div class="layout">
    <CommonHeader />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
import CommonHeader from '../components/Common/Header.vue'
</script>

<style scoped>
.layout {
  width: 100%;
  background-color: #fff;
  color: #1d1d1d;
}
</style>
