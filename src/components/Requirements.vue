<template>
  <section id="reqs" class="reqs">
    <div class="container">
      <h2 class="reqs__title">{{ t('nav.reqs') }}</h2>

      <div class="reqs__grid">
        <!-- Hard requirements -->
        <article class="reqs__card">
          <h3 class="reqs__head">
            <Icon icon="mdi:shield-check" class="reqs__head-icon" />
            <span>Hard requirements</span>
          </h3>
          <ul class="reqs__list" role="list">
            <li v-for="(s,i) in hard" :key="`hard-${i}`" class="reqs__item">
              <Icon icon="mdi:check-decagram" class="reqs__icon" />
              <span class="reqs__text">{{ s }}</span>
            </li>
          </ul>
        </article>

        <!-- We’re looking for -->
        <article class="reqs__card">
          <h3 class="reqs__head">
            <Icon icon="mdi:account-search" class="reqs__head-icon" />
            <span>We’re looking for</span>
          </h3>
          <ul class="reqs__list" role="list">
            <li v-for="(s,i) in looking" :key="`lk-${i}`" class="reqs__item">
              <Icon :icon="pickIcon(i)" class="reqs__icon" />
              <span class="reqs__text">{{ s }}</span>
            </li>
          </ul>
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

const hard    = computed(() => (tm('reqs.hard')    as unknown as string[]) ?? [])
const looking = computed(() => (tm('reqs.looking') as unknown as string[]) ?? [])

// немного разнообразим иконки справа
function pickIcon(i: number) {
  // 0: PvP/Industry/PvE, 1: Self-sufficient, 2: Discord + mic
  return ['mdi:sword-cross', 'mdi:hand-coin', 'mdi:headset'][i] || 'mdi:star-outline'
}
</script>

<style scoped>
.reqs{
  padding: clamp(40px, 7vw, 96px) 0;
}

.reqs__title{
  margin: 0 0 16px;
  font-size: clamp(20px, 3vw, 28px);
  display: inline-block;
  padding-bottom: 6px;
  position: relative;
}
.reqs__title::after{
  content:"";
  position:absolute; left:0; right:0; bottom:0; height:2px;
  background: linear-gradient(90deg, var(--accent), transparent 70%);
  filter: drop-shadow(0 6px 16px rgba(0,212,255,.25));
}

.reqs__grid{
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

/* Карточка */
.reqs__card{
  position: relative;
  padding: 18px;
  border-radius: var(--radius);
  background: linear-gradient(180deg, rgba(18,26,36,.88), rgba(12,18,28,.86));
  border: 1px solid var(--border);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: var(--elev-2);
  overflow: hidden;
  transition: transform .16s ease, box-shadow .18s ease, border-color .18s ease;
}
.reqs__card::before{
  content:"";
  position:absolute; inset:0; border-radius:inherit; padding:2px;
  background: linear-gradient(90deg, rgba(0,212,255,.55), rgba(255,209,102,.45));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none;
}
.reqs__card:hover{
  transform: translateY(-1px);
  box-shadow: var(--elev-3);
  border-color: color-mix(in oklab, var(--accent) 35%, white 0%);
}

/* Заголовок карточки */
.reqs__head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 14px;   /* ← увеличил отступ вниз */
  font-size: clamp(16px, 2.4vw, 18px);
}
.reqs__head-icon{
  font-size: 20px;
  color: var(--accent);
  filter: drop-shadow(0 0 6px rgba(0,212,255,.55));
}

/* Список */
.reqs__list {
  list-style: none;
  margin: 0;
  padding: 15px;
  display: grid;
  gap: 12px;          /* чуть больше расстояние между пунктами */
}
.reqs__item{
  display:grid; grid-template-columns: auto 1fr; gap:10px; align-items:start;
}
.reqs__icon{
  font-size: 18px;
  color: var(--accent);
  filter: drop-shadow(0 0 6px rgba(0,212,255,.45));
}
.reqs__text{
  line-height: 1.55;
  font-size: 15px;
}
</style>
