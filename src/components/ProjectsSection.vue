<template>
  <section
    data-snap-index="1"
    class="min-h-screen flex flex-col snap-start bg-(--bg) relative"
  >
    <div
      class="absolute inset-0 z-0 pointer-events-none grid-bg"
      aria-hidden="true"
    />

    <div class="relative z-10 flex flex-col min-h-screen">
      <ProjectsHeader />

      <BubbleCanvas
        v-if="isDesktop"
        :projects="projects"
      />

      <div v-else class="flex-1 overflow-y-auto">
        <MobileProjectGrid
          :projects="projects"
          @open="onMobileOpen"
        />
      </div>

      <ProjectModal
        :project="modalProject"
        @close="modalProject = null"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { ProjectData } from "../../composables/usePortfolio";
import BubbleCanvas from "./BubbleCanvas.vue";
import MobileProjectGrid from "./MobileProjectGrid.vue";
import ProjectModal from "./ProjectModal.vue";
import ProjectsHeader from "./ProjectsHeader.vue";

const props = defineProps<{
    projects: ProjectData[];
}>();

const isDesktop = ref(true);
const modalProject = ref<ProjectData | null>(null);

let mq: MediaQueryList | null = null;

function handleChange(e: MediaQueryListEvent) {
    isDesktop.value = e.matches;
}

function onMobileOpen(id: string) {
    modalProject.value = props.projects.find((p) => p.id === id) ?? null;
}

onMounted(() => {
    mq = window.matchMedia("(min-width: 768px)");
    isDesktop.value = mq.matches;
    mq.addEventListener("change", handleChange);
});

onUnmounted(() => {
    if (mq) mq.removeEventListener("change", handleChange);
});
</script>
