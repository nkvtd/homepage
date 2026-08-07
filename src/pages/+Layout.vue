<template>
  <div>
    <LoadingScreen />
    <slot />
  </div>
</template>

<script setup lang="ts">
import LoadingScreen from "../components/LoadingScreen.vue";
</script>
