<template>
  <div class="flex flex-col gap-2">
    <p
      v-for="(title, idx) in titles"
      :key="idx"
      class="font-mono text-sm md:text-base text-(--text)"
    >
      {{ title }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
    titles: string[];
}>();
</script>
