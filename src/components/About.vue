<template>
  <section id="about" class="about">
    <div class="container">
      <div class="about__card">
        <header class="about__head">
          <h2 class="about__title">{{ t('nav.about') }}</h2>
          <div class="about__chips">
            <span class="chip">EU TZ</span>
            <span class="chip">IRL-first</span>
            <span class="chip">90.6% refine</span>
          </div>
        </header>

        <div class="about__grid">
          <!-- Левая колонка: 3 секции из about[] -->
          <div class="about__col about__col--left">
            <div class="about__block">
              <Icon icon="mdi:account-group" class="about__ico" />
              <div class="about__block-body">
                <h3 class="about__sub">Who we are</h3>
                <p class="about__p">{{ about[0] }}</p>
              </div>
            </div>

            <div class="about__block">
              <Icon icon="mdi:radar" class="about__ico" />
              <div class="about__block-body">
                <h3 class="about__sub">Looking for</h3>
                <p class="about__p">{{ about[1] }}</p>
              </div>
            </div>

            <div class="about__block">
              <Icon icon="mdi:heart" class="about__ico" />
              <div class="about__block-body">
                <h3 class="about__sub">How we play</h3>
                <p class="about__p">{{ about[2] }}</p>
              </div>
            </div>
          </div>

          <!-- Правая колонка: Highlights из offer[0..2] -->
          <div class="about__col about__col--right">
            <div class="about__side cardish">
              <h3 class="about__side-title">Highlights</h3>
              <ul class="about__list" role="list">
                <li v-for="(o, i) in highlights" :key="i" class="about__li">
                  <Icon :icon="highlightIcons[i] || 'mdi:star-outline'" class="about__li-ico" />
                  <span class="about__li-text">{{ o }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'

const { t, tm } = useI18n()

// Три абзаца «о нас»
const about = computed(() => (tm('about') as unknown as string[]) ?? [])

// Три хайлайта из offer: берём первые 3 пункта 1:1
const offerAll = computed(() => (tm('offer') as unknown as string[]) ?? [])
const highlights = computed(() => offerAll.value.slice(0, 3))

// Иконки под Highlights
const highlightIcons = [
  'mdi:calendar-star',      // Weekly Corp events (with handouts)
  'mdi:trophy-variant',     // Corp competitions ... 1000-2000 PLEX
  'game-icons:crab',        // Access to C.R.A.B.s
]
</script>

<style scoped>
.about{
  padding: clamp(40px, 7vw, 96px) 0;
}

/* Карточка секции */
.about__card{
  position: relative;
  padding: clamp(20px, 3.4vw, 34px);
  border-radius: var(--radius);
  background: linear-gradient(180deg, rgba(18,26,36,.88), rgba(12,18,28,.86));
  border: 1px solid var(--border);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: var(--elev-2);
  overflow: hidden;
}
.about__card::before{
  content:"";
  position:absolute; inset:0; border-radius:inherit; padding:2px;
  background: linear-gradient(90deg, rgba(0,212,255,.55), rgba(255,209,102,.45));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none;
}
.about__card::after{
  content:"";
  position:absolute; inset:-2px -2px auto -2px; height:35%;
  background: radial-gradient(900px 320px at 50% -10%, rgba(0,212,255,.10), transparent 60%);
  pointer-events:none;
}

/* Заголовок + чипсы */
.about__head{
  display:flex; align-items:flex-end; justify-content:space-between;
  gap: 16px; margin-bottom: clamp(12px, 2.2vw, 18px);
  flex-wrap: wrap;
}
.about__title{
  margin:0;
  font-size: clamp(20px, 3vw, 28px);
  line-height:1.2;
  position: relative;
  display:inline-block;
  padding-bottom: 6px;
}
.about__title::after{
  content:"";
  position:absolute; left:0; right:0; bottom:0; height:2px;
  background: linear-gradient(90deg, var(--accent), transparent 70%);
  filter: drop-shadow(0 6px 16px rgba(0,212,255,.25));
}
.about__chips{ display:flex; gap:8px; flex-wrap:wrap }
.chip{
  display:inline-flex; align-items:center; gap:6px;
  padding:6px 10px; border-radius:999px;
  font-size:12px; letter-spacing:.2px; font-weight:800;
  background: linear-gradient(180deg, rgba(18,26,36,.65), rgba(12,18,28,.55));
  border:1px solid var(--border);
  box-shadow: 0 6px 18px rgba(0,0,0,.25);
  color: var(--text);
}

/* Сетка 2 колонки */
.about__grid{
  display:grid; gap: clamp(14px, 2vw, 20px);
}
@media (min-width: 920px){
  .about__grid{ grid-template-columns: 1.5fr 1fr }
}

/* Левая колонка — 3 блока */
.about__block{
  display:grid; grid-template-columns:auto 1fr; gap:12px; align-items:start;
  padding: 12px 10px;
  border-radius: 12px;
  transition: background .18s ease, border-color .18s ease;
}
.about__block:hover{
  background: linear-gradient(180deg, rgba(18,26,36,.35), rgba(12,18,28,.25));
  border-color: color-mix(in oklab, var(--accent) 25%, white 0%);
}
.about__ico{
  font-size: 22px;
  color: var(--accent);
  filter: drop-shadow(0 0 6px rgba(0,212,255,.55));
}
.about__block-body{ display:grid; gap:6px }
.about__sub{
  margin:0;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: .2px;
  color: var(--text);
}
.about__p{
  margin:0;
  color: var(--text);
  line-height: 1.65;
  font-size: clamp(14px, 1.8vw, 16px);
}

/* Правая колонка — боковая карточка */
.about__col--right{ align-self: stretch }
.cardish{
  position: relative;
  padding: 14px;
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(18,26,36,.55), rgba(12,18,28,.45));
  border:1px solid var(--border);
  box-shadow: var(--elev-1);
}
.about__side-title{
  margin: 0 0 10px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: .4px;
  opacity: .9;
}
.about__list{
  list-style:none; margin:0; padding:0; display:grid; gap:10px;
}
.about__li{
  display:grid; grid-template-columns:auto 1fr; gap:10px; align-items:start;
}
.about__li-ico{
  font-size:18px; color: var(--accent);
  filter: drop-shadow(0 0 6px rgba(0,212,255,.45));
}
.about__li-text{
  font-size: 14px; line-height:1.5;
}
</style>
