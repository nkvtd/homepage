<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-(--border)">
    <div class="md:border-r-2 border-(--border) bg-(--bg-pure)">
      <div
        class="bg-(--header-bg) text-(--text-invert) font-display font-bold uppercase text-lg md:text-xl px-4 py-3 border-b-2 border-(--border) tracking-tight"
      >
        TECHNOLOGIES
      </div>
      <div
        class="bg-(--bg-pure) px-4 py-3 flex flex-wrap gap-2"
      >
        <span
          v-for="tech in technologies"
          :key="tech"
          class="tag-chip tag-accent font-mono text-xs md:text-xs bg-(--accent) text-(--text-invert) border border-(--border) px-2 py-1"
        >
          {{ tech }}
        </span>
      </div>
    </div>

    <div class="bg-(--bg-pure)">
      <div
        class="bg-(--header-bg) text-(--text-invert) font-display font-bold uppercase text-lg md:text-xl px-4 py-3 border-b-2 border-(--border) tracking-tight"
      >
        FOCUS
      </div>
      <div
        class="bg-(--bg-pure) px-4 py-3 flex flex-col gap-2"
      >
        <span
          v-for="area in focusAreas"
          :key="area"
          class="tag-chip tag-navy font-mono text-xs md:text-xs bg-(--accent-navy) text-(--text-invert) border border-(--border) px-2 py-1 inline-block w-fit"
        >
          {{ area }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
    technologies: string[];
    focusAreas: string[];
}>();
</script>

<style scoped>
.tag-chip {
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
}

.tag-chip:hover {
  transform: translate(-1px, -1px);
}

.tag-accent:hover {
  box-shadow: 2px 2px 0 0 var(--accent-navy);
}

.tag-navy:hover {
  box-shadow: 2px 2px 0 0 var(--accent);
}
</style>
