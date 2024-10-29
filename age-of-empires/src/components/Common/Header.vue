<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="header">
    <header class="header-title">Age of Empires</header>
    <nav class="header-links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/units">Units</RouterLink>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #1d1d1d;
  margin-bottom: 20px;
  padding: 20px;
  font-size: 32px;
  color: #784b10;

  @media (max-width: 600px) {
    flex-direction: column;
  }

  &-title {
    font-size: 2rem;

    @media (max-width: 600px) {
      font-size: 2rem;
    }
  }

  &-links {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 10px;

    @media (max-width: 600px) {
      margin-top: 10px;
      font-size: 1rem;
    }
  }
}
</style>
