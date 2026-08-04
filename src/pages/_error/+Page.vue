<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-(--bg) relative overflow-hidden"
  >
    <!-- Line grid background -->
    <div
      class="absolute inset-0 z-0 pointer-events-none grid-bg"
      aria-hidden="true"
    />

    <PixelBurst />

    <div class="relative z-10 flex flex-col items-center">
      <!-- Error code: large, pink, monogram style -->
      <h1
        class="font-display font-black uppercase leading-[0.85] tracking-[-0.04em] text-(--accent) select-none"
        :style="{ fontSize: 'clamp(4rem, 18vw, 14rem)' }"
      >
        {{ code }}
      </h1>

      <!-- Separator -->
      <hr class="border-t-2 border-(--accent) w-full max-w-xs my-4" />

      <!-- Status text -->
      <p
        class="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-(--text) mb-6"
      >
        {{ status }}
      </p>

      <!-- Info box: brutalist bordered -->
      <div
        class="border-2 border-(--border) bg-(--bg-pure) px-6 py-4 max-w-sm"
      >
        <p class="font-mono text-sm text-(--text) leading-relaxed">
          {{ message }}
        </p>
      </div>

      <!-- Return link -->
      <a
        href="/"
        class="return-link mt-8 bg-(--header-bg) text-(--text-invert) font-mono text-xs tracking-[0.2em] uppercase px-6 py-3 no-underline border-2 border-(--border)"
      >
        RETURN
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePageContext } from "vike-vue/usePageContext";
import PixelBurst from "../../components/PixelBurst.vue";

const pageContext = usePageContext();
const { is404, abortReason } = pageContext;

const code = is404 ? "404" : "500";
const status = is404 ? "PAGE NOT FOUND" : "INTERNAL ERROR";
const message =
    abortReason ??
    (is404
        ? "The page you requested does not exist."
        : "Something went wrong on our end.");
</script>

<style scoped>
.return-link {
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.2s ease;
}

.return-link:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 0 var(--accent);
}
</style>
