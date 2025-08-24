<template>
  <HeaderBar />
  <main>
    <Hero />
    <About />
    <OfferGrid />
    <ActivitiesSlider />
    <Goals />
    <Requirements />
    <JoinSteps />
  </main>
  <SiteFooter />
</template>

<script setup lang="ts">
import HeaderBar from './components/HeaderBar.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import OfferGrid from './components/OfferGrid.vue'
import ActivitiesSlider from './components/ActivitiesSlider.vue'
import JoinSteps from './components/JoinSteps.vue'
import Requirements from './components/Requirements.vue'
import Goals from './components/Goals.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>
