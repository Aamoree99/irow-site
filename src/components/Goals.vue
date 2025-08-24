<template>
  <section id="goals" class="goals">
    <div class="container">
      <div class="goals__card">
        <h2 class="goals__title">{{ t('nav.goals') }}</h2>
        <ul class="goals__list" role="list">
          <li v-for="(g, i) in goals" :key="i" class="goals__item">
            <Icon icon="mdi:star-shooting" class="goals__icon" />
            <span class="goals__text">{{ g }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'

const { t, tm } = useI18n()
const goals = computed(() => (tm('goals') as unknown as string[]) ?? [])
</script>

<style scoped>
.goals {
  padding: clamp(40px, 7vw, 96px) 0;
}

.goals__card {
  position: relative;
  padding: 20px clamp(16px, 3vw, 28px);
  border-radius: var(--radius);
  background: linear-gradient(180deg, rgba(18,26,36,.88), rgba(12,18,28,.86));
  border: 1px solid var(--border);
  box-shadow: var(--elev-2);
  overflow: hidden;
}
.goals__card::before {
  content:"";
  position:absolute; inset:0; border-radius:inherit; padding:2px;
  background: linear-gradient(90deg, rgba(0,212,255,.55), rgba(255,209,102,.45));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events:none;
}

.goals__title {
  margin: 0 0 14px;
  font-size: clamp(20px, 3vw, 26px);
  display: inline-block;
  position: relative;
  padding-bottom: 6px;
}
.goals__title::after {
  content:"";
  position:absolute; left:0; right:0; bottom:0; height:2px;
  background: linear-gradient(90deg, var(--accent), transparent 70%);
  filter: drop-shadow(0 6px 16px rgba(0,212,255,.25));
}

.goals__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
}
.goals__item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  align-items: start;
}
.goals__icon {
  font-size: 18px;
  color: var(--accent);
  filter: drop-shadow(0 0 6px rgba(0,212,255,.45));
}
.goals__text {
  line-height: 1.55;
  font-size: 15px;
}
</style>
