<template>
  <div
    class="bg-(--header-bg) text-(--text-invert) py-3 px-6 md:px-12 border-b-4 border-(--border) flex flex-col md:flex-row items-center justify-center gap-1 md:gap-0"
  >
    <span
      class="font-mono text-xs md:text-sm uppercase tracking-widest text-center"
    >
      {{ coordinates.lat }} {{ coordinates.lng }} — {{ city }}, {{ country }}
    </span>
    <span class="hidden md:inline font-mono text-xs md:text-sm uppercase tracking-widest">, </span>
    <span
      class="font-mono text-xs md:text-sm uppercase tracking-widest text-center"
    >
      <LiveTime /> GMT+2
    </span>
  </div>
</template>

<script setup lang="ts">
import LiveTime from "./LiveTime.vue";

defineProps<{
    coordinates: { lat: string; lng: string };
    city: string;
    country: string;
}>();
</script>
