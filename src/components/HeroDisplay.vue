<template>
  <h1
    class="font-display font-black uppercase leading-[0.85] tracking-[-0.04em] text-(--accent) select-none text-center"
    :style="{ fontSize: 'clamp(5rem, 25vw, 26rem)' }"
  >
    {{ displayName }}
  </h1>
</template>

<script setup lang="ts">
defineProps<{
    displayName: string;
}>();
</script>
