<template>
  <section id="activities" class="activities">
    <div class="container">
      <h2 class="activities__title">{{ t('nav.activities') }}</h2>

      <div
          class="activities__card"
          @mouseenter="pause()"
          @mouseleave="play()"
          @focusin="pause()"
          @focusout="play()"
      >
        <!-- BG (fade) -->
        <transition name="fade">
          <div
              :key="(curr?.image || 'noimg') + bgSize"
              class="activities__bg"
              :style="{
              backgroundImage: curr?.image ? `url(${curr.image})` : '',
              backgroundSize: bgSize,
            }"
          />
        </transition>
        <div class="activities__bg-overlay" />

        <!-- Tabs -->
        <div class="activities__tabs" role="tablist" aria-label="Activities tabs">
          <button
              v-for="(a, idx) in acts"
              :key="a.key || idx"
              class="tab"
              :class="{ 'tab--active': i === idx }"
              role="tab"
              :aria-selected="i === idx"
              :tabindex="i === idx ? 0 : -1"
              @click="select(idx)"
              @keydown.left.prevent="prev()"
              @keydown.right.prevent="next()"
          >
            <Icon :icon="iconByKey[a.key] || 'mdi:star-outline'" class="tab__icon" />
            <span class="tab__label">{{ a.title }}</span>
          </button>
        </div>

        <!-- Content -->
        <div class="activities__content" role="tabpanel">
          <h3 class="activities__heading">{{ curr?.title }}</h3>
          <p class="activities__text">{{ curr?.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'

const { t, tm } = useI18n()

type Act = { key: string; title: string; text: string; image?: string }

const acts = computed(() => (tm('activities') as unknown as Act[]) || [])

const i = ref(0)
let timer: number | null = null
const AUTOPLAY_MS = 4500

const curr = computed(() => acts.value[i.value])

// если картинка .png — показываем contain; иначе cover
const bgSize = computed(() => {
  const src = curr.value?.image?.toLowerCase() || ''
  return src.endsWith('.png') ? 'contain' : 'cover'
})

const iconByKey: Record<string, string> = {
  pvp: 'mdi:sword-cross',
  industry: 'mdi:factory',
  pve: 'game-icons:crab',      // замена: краб из коллекции game-icons
  mining: 'mdi:pickaxe',
  logistics: 'mdi:rocket-launch',
  mentoring: 'mdi:school',
}

function next() {
  if (!acts.value.length) return
  i.value = (i.value + 1) % acts.value.length
}
function prev() {
  if (!acts.value.length) return
  i.value = (i.value - 1 + acts.value.length) % acts.value.length
}
function select(idx: number) {
  i.value = idx
}
function play() {
  stop()
  timer = window.setInterval(next, AUTOPLAY_MS)
}
function pause() { stop() }
function stop() {
  if (timer) { clearInterval(timer); timer = null }
}

onMounted(play)
onBeforeUnmount(stop)
</script>

<style scoped>
.activities{
  padding: clamp(40px, 7vw, 96px) 0;
}

.activities__title{
  margin: 0 0 16px;
  font-size: clamp(20px, 3vw, 28px);
  display: inline-block;
  padding-bottom: 6px;
  position: relative;
}
.activities__title::after{
  content:"";
  position:absolute; left:0; right:0; bottom:0; height:2px;
  background: linear-gradient(90deg, var(--accent), transparent 70%);
  filter: drop-shadow(0 6px 16px rgba(0,212,255,.25));
}

/* Обёртка (стекло + неоновая рамка) */
.activities__card{
  position: relative;
  border-radius: var(--radius);
  background: linear-gradient(180deg, rgba(18,26,36,.88), rgba(12,18,28,.86));
  border: 1px solid var(--border);
  box-shadow: var(--elev-2);
  overflow: hidden;
  min-height: 320px;
}
.activities__card::before{
  content:"";
  position:absolute; inset:0; border-radius:inherit; padding:2px;
  background: linear-gradient(90deg, rgba(0,212,255,.55), rgba(255,209,102,.45));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none;
}

/* BG слой + overlay */
.activities__bg{
  position:absolute; inset:0;
  background-position:center;
  background-repeat:no-repeat;
  /* background-size задаём динамически (contain/cover) */
  opacity:.40;
}
.fade-enter-active, .fade-leave-active{ transition: opacity .45s ease }
.fade-enter-from, .fade-leave-to{ opacity:0 }

.activities__bg-overlay{
  position:absolute; inset:0;
  background:
      radial-gradient(900px 420px at 50% -10%, rgba(0,212,255,.10), transparent 60%),
      linear-gradient(180deg, rgba(8,12,18,.35), rgba(8,12,18,.65));
  pointer-events:none;
}

/* Tabs */
.activities__tabs{
  position: relative; z-index: 2;
  display:flex; flex-wrap:wrap; gap:8px;
  padding: clamp(12px, 2.5vw, 18px);
}
.tab{
  display:inline-flex; align-items:center; gap:8px;
  padding: 8px 12px; border-radius: 999px;
  border: 1px solid var(--border);
  background: linear-gradient(180deg, rgba(18,26,36,.65), rgba(12,18,28,.55));
  color: var(--text);
  font-weight: 800; letter-spacing: .2px;
  cursor: pointer;
  transition: border-color .18s ease, background .18s ease, transform .1s ease;
}
.tab:hover{ border-color: color-mix(in oklab, var(--accent) 35%, white 0%) }
.tab:active{ transform: translateY(1px) }
.tab--active{
  background: linear-gradient(90deg, var(--accent) 0%, #33e1ff 100%);
  color: #062534;
  border-color: transparent;
}
.tab__icon{ font-size: 18px }
.tab__label{ font-size: 13px }

/* Content */
.activities__content{
  position: relative; z-index: 2;
  padding: 0 clamp(14px, 3vw, 24px) clamp(16px, 3vw, 26px);
}
.activities__heading{
  margin: 6px 0 4px;
  font-size: clamp(18px, 2.8vw, 24px);
  text-shadow: 0 2px 12px rgba(0,0,0,.35);
}
.activities__text{
  margin: 0;
  max-width: 900px;
  color: var(--muted);
  font-size: clamp(14px, 1.9vw, 16px);
  line-height: 1.6;
}

/* Упрощаем на очень малых экранах */
@media (max-width: 420px){
  .tab__label{ display:none }
}
</style>
