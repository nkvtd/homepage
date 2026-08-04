<template>
  <div style="display: none" aria-hidden="true"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

let clicks = 0;

const PARTICLE_COUNT = 14;
const ANIMATION_DURATION = 800;

function createBurst(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.closest("a, button, [role='button'], [tabindex]")) return;

    const x = e.clientX;
    const y = e.clientY;
    const isAccent = clicks++ % 2 === 0;
    const primary = isAccent ? "var(--accent)" : "var(--accent-navy)";
    const secondary = isAccent ? "var(--accent-navy)" : "var(--accent)";

    const flash = document.createElement("div");
    flash.style.cssText = [
        "position: fixed",
        `left: ${x}px`,
        `top: ${y}px`,
        "width: 0",
        "height: 0",
        "border-radius: 50%",
        `background: ${primary}`,
        "opacity: 0.12",
        "pointer-events: none",
        "z-index: 0",
        "transform: translate(-50%, -50%)",
        `animation: burst-flash ${ANIMATION_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
    ].join(";");
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), ANIMATION_DURATION);

    const ring = document.createElement("div");
    ring.style.cssText = [
        "position: fixed",
        `left: ${x}px`,
        `top: ${y}px`,
        "width: 0",
        "height: 0",
        "border-radius: 50%",
        `border: 2px solid ${primary}`,
        "opacity: 1",
        "pointer-events: none",
        "z-index: 5",
        "transform: translate(-50%, -50%)",
        `animation: burst-ring ${ANIMATION_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
    ].join(";");
    document.body.appendChild(ring);
    setTimeout(() => ring.remove(), ANIMATION_DURATION);

    const core = document.createElement("div");
    core.style.cssText = [
        "position: fixed",
        `left: ${x - 4}px`,
        `top: ${y - 4}px`,
        "width: 8px",
        "height: 8px",
        `background: ${primary}`,
        "pointer-events: none",
        "z-index: 5",
        `animation: burst-core ${ANIMATION_DURATION * 0.5}ms ease-out forwards`,
    ].join(";");
    document.body.appendChild(core);
    setTimeout(() => core.remove(), ANIMATION_DURATION * 0.5);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const angle = (Math.PI * 2 * i) / PARTICLE_COUNT;
        const distance = 40 + Math.random() * 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        const color = i % 2 === 0 ? primary : secondary;
        const size = 3 + Math.random() * 4;

        const particle = document.createElement("div");
        particle.style.cssText = [
            "position: fixed",
            `left: ${x}px`,
            `top: ${y}px`,
            `width: ${size}px`,
            `height: ${size}px`,
            `background: ${color}`,
            "pointer-events: none",
            "z-index: 5",
            `animation: burst-particle ${ANIMATION_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
        ].join(";");
        particle.style.setProperty("--tx", `${tx}px`);
        particle.style.setProperty("--ty", `${ty}px`);
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), ANIMATION_DURATION);
    }
}

onMounted(() => document.addEventListener("click", createBurst));
onUnmounted(() => document.removeEventListener("click", createBurst));
</script>

<style>
@keyframes burst-flash {
  0% {
    width: 0;
    height: 0;
    opacity: 0.18;
  }
  100% {
    width: 350px;
    height: 350px;
    opacity: 0;
  }
}

@keyframes burst-ring {
  0% {
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    width: 70px;
    height: 70px;
    opacity: 0;
  }
}

@keyframes burst-core {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}

@keyframes burst-particle {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(var(--tx), var(--ty)) scale(0);
    opacity: 0;
  }
}
</style>
