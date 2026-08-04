<template>
  <div ref="canvasRef" class="flex-1 relative overflow-hidden w-full min-h-50" @click="onCanvasClick">
    <BubbleCard
      v-for="bubble in bubbles"
      :key="bubble.id"
      :project="getProject(bubble.id)!"
      :size="bubble.size"
      :x="bubble.x"
      :y="bubble.y"
      :is-open="activeId === bubble.id"
      :positioned="true"
      :dimmed="activeId !== null && activeId !== bubble.id"
      :direction="getDirection(bubble)"

      @toggle="onToggle"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import {
    type BubbleLayout,
    useBubbleLayout,
} from "../composables/useBubbleLayout";
import { ProjectData } from "../composables/usePortfolio";
import BubbleCard from "./BubbleCard.vue";

const props = defineProps<{
    projects: ProjectData[];
}>();

const canvasRef = ref<HTMLElement | null>(null);
const bubbles = ref<BubbleLayout[]>([]);
const activeId = ref<string | null>(null);
const activeDirection = ref<"left" | "right">("right");
const canvasSize = ref({ width: 0, height: 0 });

function getProject(id: string) {
    return props.projects.find((p) => p.id === id);
}

function getDirection(bubble: BubbleLayout): "left" | "right" {
    return bubble.id === activeId.value ? activeDirection.value : "right";
}

function onToggle(id: string) {
    if (activeId.value !== id) {
        const bubble = bubbles.value.find((b) => b.id === id);
        if (bubble && canvasSize.value.width > 0) {
            const openWidth = Math.max(bubble.size + 420, 520);
            activeDirection.value =
                bubble.x + openWidth > canvasSize.value.width - 40
                    ? "left"
                    : "right";
        }
        activeId.value = id;
    } else {
        activeId.value = null;
    }
}

function onCanvasClick(e: MouseEvent) {
    if (e.target === canvasRef.value) {
        activeId.value = null;
    }
}

function computeLayout() {
    const el = canvasRef.value;
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return false;

    canvasSize.value = { width: rect.width, height: rect.height };
    bubbles.value = useBubbleLayout(props.projects, rect.width, rect.height);
    return true;
}

let resizeObserver: ResizeObserver | null = null;
let rafId: number | null = null;

onMounted(() => {
    const el = canvasRef.value;
    if (!el) return;

    let attempts = 0;
    function tryLayout() {
        if (computeLayout() || attempts++ >= 60) return;
        rafId = requestAnimationFrame(tryLayout);
    }
    tryLayout();

    resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
            const { width, height } = entry.contentRect;
            if (width > 0 && height > 0) {
                canvasSize.value = { width, height };
                bubbles.value = useBubbleLayout(props.projects, width, height);
            }
        }
    });
    resizeObserver.observe(el);
});

onUnmounted(() => {
    if (rafId !== null) cancelAnimationFrame(rafId);
    if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
    }
});
</script>
