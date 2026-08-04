<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 overflow-y-auto">
    <button
      v-for="project in projects"
      :key="project.id"
      class="project-card text-(--text-invert) border-2 border-(--border) p-4 min-h-30 text-left cursor-pointer"
      :class="cardClass(project.id)"
      @click="emit('open', project.id)"
    >
      <span class="font-mono font-bold text-sm uppercase">
        {{ project.name }}
      </span>
      <p class="text-xs leading-relaxed mt-2 opacity-85 line-clamp-2">
        {{ project.description }}
      </p>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ProjectData } from "../../composables/usePortfolio";
import { djb2 } from "../shared/hash";

function cardClass(id: string): string {
    const h = djb2(id) % 3;
    if (h === 0) return "card-black";
    if (h === 1) return "card-accent";
    return "card-navy";
}

defineProps<{
    projects: ProjectData[];
}>();

const emit = defineEmits<{
    open: [id: string];
}>();
</script>

<style scoped>
.project-card {
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.2s ease;
}

.project-card:hover {
  transform: translate(-2px, -2px);
}

.card-black {
  background: var(--header-bg);
  color: var(--text-invert);
}
.card-black:hover {
  box-shadow: 4px 4px 0 0 var(--accent);
}

.card-accent {
  background: var(--accent);
  color: var(--text-invert);
}
.card-accent:hover {
  box-shadow: 4px 4px 0 0 var(--accent-navy);
}

.card-navy {
  background: var(--accent-navy);
  color: var(--text-invert);
}
.card-navy:hover {
  box-shadow: 4px 4px 0 0 var(--accent);
}
</style>
