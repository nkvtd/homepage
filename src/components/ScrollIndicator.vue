<template>
  <button
    class="scroll-btn w-12 h-12 bg-(--accent) rounded-full flex items-center justify-center border-none cursor-pointer animate-bounce"
    aria-label="Scroll to next section"
    @click="scrollNext"
  >
    <ArrowDown class="text-(--text-invert) w-5 h-5" />
  </button>
</template>

<script setup lang="ts">
import { ArrowDown } from "@vicons/ionicons5";

function scrollNext() {
    const next = document.querySelector('[data-snap-index="1"]');
    if (next) {
        next.scrollIntoView({ behavior: "smooth" });
    }
}
</script>

<style scoped>
.scroll-btn {
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.2s ease;
}

.scroll-btn:hover {
  transform: translateY(-2px) translateX(-2px);
  box-shadow: 2px 2px 0 0 var(--accent-navy);
}
</style>
