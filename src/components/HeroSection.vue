<template>
  <section
    data-snap-index="0"
    class="h-screen flex flex-col snap-start bg-(--bg) relative overflow-hidden"
  >
    <div
      class="absolute inset-0 z-0 pointer-events-none grid-bg"
      aria-hidden="true"
    />

    <div class="relative z-10 flex flex-col h-full">
      <HeroHeader
        :coordinates="personal.location.coordinates"
        :city="personal.location.city"
        :country="personal.location.country"
      />

      <div class="flex-1 flex flex-col px-6 md:px-12 lg:px-16 min-h-0">
        <div class="pt-4 md:pt-6 pb-2 shrink-0">
          <HeroDisplay :display-name="personal.displayName" />
        </div>

        <hr class="border-t-2 border-(--accent) w-full shrink-0" />

        <div class="grid grid-cols-1 md:grid-cols-3 border-b-2 border-(--border) shrink-0">
          <div class="md:col-span-2 py-2 md:py-3 min-w-0">
            <h2
              class="font-display font-bold uppercase text-base md:text-xl tracking-[0.25em] text-(--text)"
            >
              {{ personal.fullName }}
            </h2>
            <HeroTitles :titles="personal.titles" />
          </div>

          <div
            class="hidden md:flex items-center justify-center bg-(--header-bg) border-l-2 border-(--border)"
          >
            <HeroSocials :socials="personal.socials" :dark="true" />
          </div>
        </div>

        <div class="md:hidden mt-3 shrink-0">
          <HeroSocials :socials="personal.socials" :dark="false" />
        </div>

        <div class="mt-4 md:mt-6 md:w-2/3 shrink-0 pb-16">
          <HeroInfoGrid
            :technologies="technologies"
            :focus-areas="focusAreas"
          />
        </div>
      </div>

      <ScrollIndicator class="absolute bottom-0 right-0 mb-8 mr-8" />
    </div>
  </section>
</template>

<script setup lang="ts">
import HeroDisplay from "./HeroDisplay.vue";
import HeroHeader from "./HeroHeader.vue";
import HeroInfoGrid from "./HeroInfoGrid.vue";
import HeroSocials from "./HeroSocials.vue";
import HeroTitles from "./HeroTitles.vue";
import ScrollIndicator from "./ScrollIndicator.vue";

defineProps<{
    personal: {
        displayName: string;
        fullName: string;
        titles: string[];
        location: {
            city: string;
            country: string;
            coordinates: { lat: string; lng: string };
            timezone: string;
        };
        socials: Array<{ name: string; url: string; icon: string }>;
    };
    technologies: string[];
    focusAreas: string[];
}>();
</script>
