<template>
  <section id="offer" class="offer">
    <div class="container">
      <h2 class="offer__title">{{ t('nav.offer') }}</h2>

      <div class="offer__grid">
        <article
            v-for="(item, i) in items"
            :key="i"
            class="offer__card"
        >
          <div class="offer__icon">
            <Icon :icon="icons[i] || 'mdi:star-circle-outline'" class="offer__icon-svg" />
          </div>
          <p class="offer__text">{{ item }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'

const { t, tm } = useI18n()

// массив офферов из i18n
const items = computed(() => (tm('offer') as unknown as string[]) ?? [])

// Подобрал иконки под каждый пункт (по твоему порядку)
const icons = [
  'mdi:calendar-star',        // Weekly Corp events (with handouts)
  'mdi:trophy-variant',       // Corp competitions ... 1000-2000 PLEX
  'mdi:ferry',                 // Access to C.R.A.B.s
  'mdi:pickaxe',              // Multiple corp mining systems (t3) ... 90.6% refine
  'mdi:factory',              // Corp manufacturing and reaction stations
  'mdi:teach',                // Experienced industrialists willing to teach
  'mdi:map-marker-radius',    // Located conveniently close to The Forge
  'mdi:rocket-launch',        // Corp JF service and refining service
  'mdi:account-group',        // Active & experienced leadership and members
]
</script>

<style scoped>
.offer{
  padding: clamp(40px, 7vw, 96px) 0;
}

.offer__title{
  margin: 0 0 16px;
  font-size: clamp(20px, 3vw, 28px);
  display: inline-block;
  padding-bottom: 6px;
  position: relative;
}
.offer__title::after{
  content:"";
  position:absolute; left:0; right:0; bottom:0; height:2px;
  background: linear-gradient(90deg, var(--accent), transparent 70%);
  filter: drop-shadow(0 6px 16px rgba(0,212,255,.25));
}

.offer__grid{
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

/* карточка: стекло + неоновая рамка с радиусом */
.offer__card{
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: 14px;

  padding: 18px;
  border-radius: var(--radius);
  background: linear-gradient(180deg, rgba(18,26,36,.88), rgba(12,18,28,.86));
  border: 1px solid var(--border);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: var(--elev-2);
  overflow: hidden;

  transition: transform .16s ease, box-shadow .18s ease, border-color .18s ease, background .18s ease;
}
.offer__card::before{
  /* неоновая окантовка со скруглением через маску */
  content:"";
  position:absolute; inset:0; border-radius:inherit; padding:2px;
  background: linear-gradient(90deg, rgba(0,212,255,.55), rgba(255,209,102,.45));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none;
}
.offer__card:hover{
  transform: translateY(-2px);
  box-shadow: var(--elev-3);
  border-color: color-mix(in oklab, var(--accent) 35%, white 0%);
}

/* иконка */
.offer__icon{
  display: grid;
  place-items: center;
  width: 34px; height: 34px;
  border-radius: 10px;
  background: linear-gradient(180deg, rgba(18,26,36,.65), rgba(12,18,28,.55));
  border: 1px solid var(--border);
  box-shadow: 0 6px 18px rgba(0,0,0,.25);
  flex-shrink: 0;
}
.offer__icon-svg{
  font-size: 22px;
  color: var(--accent);
  filter: drop-shadow(0 0 6px rgba(0,212,255,.55));
}

/* текст */
.offer__text{
  margin: 0;
  font-size: 15px;
  line-height: 1.55;
  color: var(--text);
}

/* очень малые экраны — компактнее */
@media (max-width: 380px){
  .offer__card{ grid-template-columns: 1fr; gap: 8px }
  .offer__icon{ width: 30px; height: 30px }
}
</style>
