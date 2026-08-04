<template>
  <div
    v-if="positioned"
    class="absolute"
    :style="wrapperStyle"
    :class="{ 'opacity-30 transition-opacity duration-300': dimmed }"
  >
    <div
      tabindex="0"
      class="bubble-inner select-none"
      :class="{ 'is-closed': !isOpen, 'is-open': isOpen }"
      :style="innerStyle"
      @click.stop="emit('toggle', project.id)"
      @keydown.enter.prevent="emit('toggle', project.id)"
    >
      <div class="bubble-cap" :style="capStyle">
        <span class="bubble-name" :style="nameStyle">{{ project.name }}</span>
      </div>

      <div v-show="isOpen" class="bubble-content">
        <div class="flex gap-4 shrink-0 content-row">
          <a
            v-if="project.links.live"
            :href="project.links.live"
            target="_blank"
            rel="noopener noreferrer"
            class="link-chip font-mono text-xs uppercase tracking-wider no-underline border-b border-transparent transition-colors duration-150"
            @click.stop
          >
            LIVE
          </a>
          <a
            v-if="project.links.code"
            :href="project.links.code"
            target="_blank"
            rel="noopener noreferrer"
            class="link-chip font-mono text-xs uppercase tracking-wider no-underline border-b border-transparent transition-colors duration-150"
            @click.stop
          >
            CODE
          </a>
        </div>

        <p class="text-sm leading-relaxed mt-3 opacity-85 content-row">
          {{ project.description }}
        </p>

        <div class="flex flex-wrap gap-2 mt-3 content-row">
          <span
            v-for="tech in project.techStack"
            :key="tech"
            class="tech-chip text-xs uppercase border px-2 py-1 font-mono"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ProjectData } from "../../composables/usePortfolio";
import { djb2 } from "../shared/hash";

function getColors(id: string) {
    const h = djb2(id) % 3;
    if (h === 0) {
        return {
            bg: "var(--header-bg)",
            text: "var(--text-invert)",
            border: "var(--border)",
            hover: "var(--shadow-brutal-hover)",
            chipBorder: "var(--text-invert)",
        };
    }
    if (h === 1) {
        return {
            bg: "var(--accent)",
            text: "var(--text-invert)",
            border: "var(--border)",
            hover: "6px 6px 0px 0px var(--accent-navy)",
            chipBorder: "var(--text-invert)",
        };
    }
    return {
        bg: "var(--accent-navy)",
        text: "var(--text-invert)",
        border: "var(--text-invert)",
        hover: "6px 6px 0px 0px var(--accent)",
        chipBorder: "var(--text-invert)",
    };
}

const props = defineProps<{
    project: ProjectData;
    size: number;
    x: number;
    y: number;
    isOpen: boolean;
    positioned: boolean;
    dimmed: boolean;
    direction?: "left" | "right";
}>();

const emit = defineEmits<{
    toggle: [id: string];
}>();

const colors = computed(() => getColors(props.project.id));

const dir = computed(() => props.direction ?? "right");

const nameFontSize = computed(
    () => `${Math.max(10, Math.min(14, props.size / 10))}px`,
);

const openWidth = computed(() => Math.max(props.size + 420, 520));
const halfSize = computed(() => Math.round(props.size / 2));

const wrapperStyle = computed(() => ({
    transform: `translate(${props.x}px, ${props.y}px)`,
    zIndex: props.isOpen ? 50 : 10,
}));

const innerStyle = computed(() => {
    const isOpen = props.isOpen && props.positioned;
    const w = isOpen ? `${openWidth.value}px` : `${props.size}px`;
    const h = `${props.size}px`;

    const base = {
        width: w,
        height: h,
        "--bubble-bg": colors.value.bg,
        "--bubble-text": colors.value.text,
        "--bubble-border": colors.value.border,
        "--bubble-hover": colors.value.hover,
        "--chip-border": colors.value.chipBorder,
    } as Record<string, string>;

    if (!isOpen) {
        return {
            ...base,
            borderRadius: "50%",
            flexDirection: "row" as const,
            marginLeft: "0",
        };
    }

    const r = `${halfSize.value}px`;
    const isLeft = dir.value === "left";
    const br = isLeft ? `0 ${r} ${r} 0` : `${r} 0 0 ${r}`;
    const ml = isLeft ? `${-(openWidth.value - props.size)}px` : "0";

    return {
        ...base,
        borderRadius: br,
        flexDirection: (isLeft ? "row-reverse" : "row") as const,
        marginLeft: ml,
    };
});

const capStyle = computed(() => {
    const isOpen = props.isOpen && props.positioned;
    return {
        width: isOpen ? `${halfSize.value}px` : "100%",
        height: "100%",
        flexShrink: 0,
    };
});

const nameStyle = computed(() => ({
    fontSize: nameFontSize.value,
}));
</script>

<style scoped>
.bubble-inner {
  background: var(--bubble-bg);
  color: var(--bubble-text);
  border: 2px solid var(--bubble-border);
  display: flex;
  align-items: center;
  overflow: hidden;
  transition:
    width 0.55s cubic-bezier(0.16, 1, 0.3, 1),
    border-radius 0.55s cubic-bezier(0.16, 1, 0.3, 1),
    margin-left 0.55s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.25s ease,
    transform 0.25s ease;
  cursor: pointer;
  will-change: width, border-radius;
}

.bubble-inner:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.bubble-inner.is-closed:hover {
  animation: bubble-wiggle 0.5s ease-in-out forwards;
  box-shadow: var(--bubble-hover);
}

.bubble-cap {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: width 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}

.bubble-name {
  font-family: var(--font-mono);
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  padding: 0 6px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  pointer-events: none;
}

.bubble-content {
  flex: 1;
  min-width: 0;
  padding: 16px 24px 16px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Staggered content reveal */
.content-row {
  opacity: 0;
  transform: translateX(-6px);
  transition:
    opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.bubble-inner.is-open .content-row:nth-child(1) {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 0.08s;
}

.bubble-inner.is-open .content-row:nth-child(2) {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 0.18s;
}

.bubble-inner.is-open .content-row:nth-child(3) {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 0.28s;
}

/* Link chips inside bubble */
.link-chip {
  color: var(--bubble-text);
  border-bottom-color: transparent;
  transition: transform 0.15s cubic-bezier(0.16, 1, 0.3, 1),
    border-bottom-color 0.15s ease;
}

.link-chip:hover {
  border-bottom-color: var(--bubble-text);
  transform: translateY(-1px);
}

/* Tech chips inside bubble */
.tech-chip {
  border-color: color-mix(in srgb, var(--chip-border) 35%, transparent);
  color: var(--bubble-text);
  transition: transform 0.15s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.15s ease;
}

.tech-chip:hover {
  transform: translate(-1px, -1px);
  box-shadow: 2px 2px 0 0 var(--chip-border);
}
</style>
