<template>
  <main class="h-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar relative">
    <HeroSection
      :personal="portfolio.personal"
      :technologies="portfolio.technologies"
      :focus-areas="portfolio.focusAreas"
    />
    <ProjectsSection :projects="portfolio.projects" />
    <PixelBurst />
  </main>
</template>

<script setup lang="ts">
import HeroSection from "../../components/HeroSection.vue";
import PixelBurst from "../../components/PixelBurst.vue";
import ProjectsSection from "../../components/ProjectsSection.vue";
import { usePortfolio } from "../../composables/usePortfolio";

const portfolio = usePortfolio();
</script>
