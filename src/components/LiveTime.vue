<template>
  <span class="live-time">{{ hours }}:{{ minutes }}:{{ seconds }}</span>
</template>

<script setup lang="ts">
import { useLiveTime } from "../composables/useLiveTime";

const { hours, minutes, seconds } = useLiveTime();
</script>

<style scoped>
.live-time {
  display: inline-block;
  white-space: nowrap;
}
</style>
