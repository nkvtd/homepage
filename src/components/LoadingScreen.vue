<template>
  <div
    v-if="show"
    class="fixed inset-0 z-[100] bg-(--bg) grid-bg flex flex-col items-center justify-center transition-opacity duration-700 ease-out"
    :class="exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'"
    aria-hidden="true"
  >
    <div class="flex gap-2 md:gap-4">
      <div
        v-for="(letter, i) in letters"
        :key="letter"
        class="font-display font-black uppercase text-(--text-invert) border-4 border-(--border) flex items-center justify-center aspect-square"
        :class="[letterColors[i], { 'animate-letter-reveal': !exiting }]"
        :style="{
          fontSize: 'clamp(2.5rem, 10vw, 8rem)',
          width: '1.2em',
          boxShadow: 'var(--shadow-brutal)',
          animationDelay: `${i * 110}ms`,
        }"
      >
        {{ letter }}
      </div>
    </div>

    <div
      class="mt-8 font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-(--text)"
    >
      LOADING<span class="animate-cursor-blink" style="animation-duration: 1.2s">_</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const letters = ["N", "K", "V", "T", "D"];
const letterColors = [
    "bg-(--accent)",
    "bg-(--accent-navy)",
    "bg-(--header-bg)",
    "bg-(--accent)",
    "bg-(--accent-navy)",
];

const show = ref(true);
const exiting = ref(false);

onMounted(() => {
    setTimeout(() => {
        exiting.value = true;
        setTimeout(() => {
            show.value = false;
        }, 700);
    }, 1700);
});
</script>
