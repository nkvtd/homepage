<template>
  <div class="flex flex-row gap-12 flex-nowrap items-center justify-center">
    <a
      v-for="social in socials"
      :key="social.name"
      :href="social.url"
      target="_blank"
      rel="noopener noreferrer"
      class="social-link flex items-center justify-center"
      :class="dark ? 'text-(--text-invert)' : 'text-(--text)'"
      :aria-label="social.name"
    >
      <component :is="iconMap[social.icon]" class="w-6 h-6" />
    </a>
  </div>
</template>

<script setup lang="ts">
import {
    LogoDiscord,
    LogoGithub,
    LogoLinkedin,
    LogoSteam,
    Mail,
} from "@vicons/ionicons5";
import type { Component } from "vue";

const iconMap: Record<string, Component> = {
    LogoGithub,
    LogoDiscord,
    Mail,
    LogoLinkedin,
    LogoSteam,
};

defineProps<{
    socials: Array<{ name: string; url: string; icon: string }>;
    dark: boolean;
}>();
</script>

<style scoped>
.social-link {
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.2s ease,
    color 0.15s ease;
}

.social-link:hover {
  color: var(--accent);
  transform: translateY(-2px) translateX(-2px);
  box-shadow: 2px 2px 0 0 var(--accent);
}
</style>
