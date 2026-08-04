<template>
  <Transition name="modal">
    <div v-if="project" class="fixed inset-0 z-50 flex items-center justify-center" @click.self="close">
      <div
        ref="panelRef"
        class="w-[92vw] h-[92vh] border-2 overflow-y-auto relative"
        :style="panelStyle"
        @click.stop
      >
        <button
          class="close-btn absolute top-3 right-3 p-2 cursor-pointer bg-transparent border-none transition-colors duration-150"
          :style="{ color: colors.text }"
          aria-label="Close modal"
          @click="close"
        >
          <Close class="w-5 h-5" />
        </button>

        <div class="p-8 pt-12">
          <h2 class="font-mono font-bold text-2xl uppercase tracking-tight mb-6">
            {{ project.name }}
          </h2>

          <div class="flex gap-4 mb-6">
            <a
              v-if="project.links.live"
              :href="project.links.live"
              target="_blank"
              rel="noopener noreferrer"
              class="modal-link font-mono text-sm uppercase tracking-wider no-underline border-b border-transparent transition-colors duration-150"
              :style="linkStyle"
            >
              LIVE
            </a>
            <a
              v-if="project.links.code"
              :href="project.links.code"
              target="_blank"
              rel="noopener noreferrer"
              class="modal-link font-mono text-sm uppercase tracking-wider no-underline border-b border-transparent transition-colors duration-150"
              :style="linkStyle"
            >
              CODE
            </a>
          </div>

          <p class="text-base leading-relaxed opacity-85 max-w-150 mb-6">
            {{ project.description }}
          </p>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="tech in project.techStack"
              :key="tech"
              class="modal-tag text-xs uppercase border px-3 py-1.5 font-mono"
              :style="tagStyle"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Close } from "@vicons/ionicons5";
import { computed, nextTick, ref, watch } from "vue";
import { ProjectData } from "../../composables/usePortfolio";
import { djb2 } from "../shared/hash";

function getColors(id: string) {
    const h = djb2(id) % 3;
    if (h === 0) {
        return {
            bg: "var(--header-bg)",
            text: "var(--text-invert)",
            border: "var(--border)",
            chipBorder: "var(--text-invert)",
            closeHover: "var(--accent)",
        };
    }
    if (h === 1) {
        return {
            bg: "var(--accent)",
            text: "var(--text-invert)",
            border: "var(--border)",
            chipBorder: "var(--text-invert)",
            closeHover: "var(--accent-navy)",
        };
    }
    return {
        bg: "var(--accent-navy)",
        text: "var(--text-invert)",
        border: "var(--text-invert)",
        chipBorder: "var(--text-invert)",
        closeHover: "var(--accent)",
    };
}

const props = defineProps<{
    project: ProjectData | null;
}>();

const emit = defineEmits<{
    close: [];
}>();

const panelRef = ref<HTMLElement | null>(null);

const colors = computed(() =>
    props.project ? getColors(props.project.id) : getColors(""),
);

const panelStyle = computed(() => ({
    background: colors.value.bg,
    color: colors.value.text,
    borderColor: colors.value.border,
    "--close-hover": colors.value.closeHover,
}));

const linkStyle = computed(() => ({
    color: colors.value.text,
    "--link-hover": colors.value.text,
}));

const tagStyle = computed(() => ({
    color: colors.value.text,
    borderColor: `color-mix(in srgb, ${colors.value.chipBorder} 40%, transparent)`,
    "--tag-hover": colors.value.chipBorder,
}));

function close() {
    emit("close");
}

function onKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") {
        close();
        return;
    }

    if (e.key === "Tab" && panelRef.value) {
        const focusable = panelRef.value.querySelectorAll<HTMLElement>(
            'a, button, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first?.focus();
        }
    }
}

watch(
    () => props.project,
    async (val) => {
        if (val) {
            document.addEventListener("keydown", onKeydown);
            await nextTick();
            const closeBtn = panelRef.value?.querySelector("button");
            closeBtn?.focus();
        } else {
            document.removeEventListener("keydown", onKeydown);
        }
    },
);
</script>

<style scoped>
.modal-enter-active {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}

.modal-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.modal-enter-from {
  transform: scale(0.98);
  opacity: 0;
}

.modal-leave-to {
  transform: scale(0.98);
  opacity: 0;
}

.close-btn:hover {
  color: var(--close-hover) !important;
}

.modal-link {
  transition: transform 0.15s cubic-bezier(0.16, 1, 0.3, 1),
    border-bottom-color 0.15s ease;
}

.modal-link:hover {
  border-bottom-color: var(--link-hover);
  transform: translateY(-1px);
}

.modal-tag {
  transition: transform 0.15s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.15s ease;
}

.modal-tag:hover {
  transform: translate(-1px, -1px);
  box-shadow: 2px 2px 0 0 var(--tag-hover);
}
</style>
