<template>
  <!-- фиксированный хедер -->
  <header ref="hdr" class="header" :class="{ 'header--scrolled': scrolled }">
    <div class="header__progress" :style="{ '--p': (scrollPct/100).toString() }" aria-hidden="true"></div>

    <div class="header__inner">
      <!-- Бренд -->
      <div class="brand" @click="go('top')" style="cursor:pointer">
        <img class="brand__logo" src="/src/assets/logo.png" alt="IROW" />
        <div class="brand__text">
          <strong class="brand__name">{{ t('brand.name') }}</strong>
          <small class="brand__tagline">{{ t('brand.tagline') }}</small>
        </div>
      </div>

      <!-- Нав (десктоп) -->
      <nav class="nav nav--desktop" aria-label="Primary">
        <button
            v-for="l in links"
            :key="l.id"
            class="nav__chip"
            @click="go(l.id)"
        >{{ t(l.label) }}</button>
      </nav>

      <!-- Действия + бургер -->
      <div class="actions">
        <label class="lang" aria-label="Language">
          <select v-model="loc" class="lang__select">
            <option
                v-for="code in available"
                :key="code"
                :value="code"
            >
              {{ code.toUpperCase() }}
            </option>
          </select>
          <span class="lang__chevron" aria-hidden>▾</span>
        </label>


        <button class="cta" @click="openDiscord">
          <Icon icon="mdi:discord" class="cta__icn" />
          {{ t('brand.cta') }}
        </button>

        <!-- бургер только на <1024px -->
        <button class="burger" @click="menuOpen = true" aria-label="Open menu">
          <Icon icon="mdi:menu" />
        </button>
      </div>
    </div>
  </header>

  <!-- спейсер под фикс-хедер -->
  <div class="header__spacer" :style="{ height: headerH + 'px' }" aria-hidden="true"></div>

  <!-- Мобильное меню (оверлей) -->
  <transition name="fade">
    <div v-if="menuOpen" class="sheet__backdrop" @click.self="menuOpen = false" aria-hidden="true"></div>
  </transition>

  <transition name="slide">
    <aside v-if="menuOpen" class="sheet" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <div class="sheet__head">
        <div class="brand">
          <img class="brand__logo" src="/src/assets/logo.png" alt="IROW" />
          <strong class="brand__name">{{ t('brand.name') }}</strong>
        </div>
        <button class="sheet__close" @click="menuOpen = false" aria-label="Close">
          <Icon icon="mdi:close" />
        </button>
      </div>

      <nav class="sheet__nav">
        <button
            v-for="l in links"
            :key="'m-'+l.id"
            class="sheet__link"
            @click="go(l.id); menuOpen = false"
        >
          {{ t(l.label) }}
        </button>
      </nav>

      <button class="btn btn--primary sheet__cta" @click="openDiscord">
        <Icon icon="mdi:discord" style="font-size:18px" />
        {{ t('brand.cta') }}
      </button>
    </aside>
  </transition>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue'
import { Icon } from '@iconify/vue'

const { t, locale, availableLocales } = useI18n()
const loc = ref<string>(String(locale.value))
watch(loc, v => (locale.value = v))
const available = computed(() => availableLocales)

const links = [
  { id: 'about',      label: 'nav.about' },
  { id: 'offer',      label: 'nav.offer' },
  { id: 'activities', label: 'nav.activities' },
  { id: 'join',       label: 'nav.join' },
  { id: 'reqs',       label: 'nav.reqs' },
  { id: 'goals',      label: 'nav.goals' },
]

// дискорд-инвайт — вставь свой URL
const DISCORD_INVITE = 'https://discord.gg/3DDQgTMk6y' // 'https://discord.gg/xxxxxxx'

function go(id: string) {
  if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
function openDiscord() {
  if (DISCORD_INVITE) window.open(DISCORD_INVITE, '_blank', 'noopener,noreferrer')
  else go('join')
}

// фикс/прогресс
const hdr = ref<HTMLElement | null>(null)
const headerH = ref(64)
const scrolled = ref(false)
const scrollPct = ref(0)
const menuOpen = ref(false)

function measure(){ headerH.value = hdr.value?.offsetHeight || 64 }
function onScroll(){
  const scroller = document.scrollingElement || document.documentElement
  const y = scroller.scrollTop
  const total = scroller.scrollHeight - window.innerHeight
  scrolled.value = y > 6
  scrollPct.value = total > 0 ? (y / total) * 100 : 0
}
onMounted(() => {
  measure(); onScroll()
  window.addEventListener('resize', measure, { passive: true })
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', measure)
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
/* фиксированная шапка */
.header{
  position: fixed; top: 0; left: 0; right: 0; z-index: 9999;
  background: linear-gradient(180deg, rgba(8,12,18,.65), rgba(8,12,18,.35));
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  box-shadow: 0 8px 22px rgba(0,0,0,.28);
  transition: background .2s ease, box-shadow .2s ease, border-color .2s ease;
}
.header--scrolled{
  background: linear-gradient(180deg, rgba(8,12,18,.80), rgba(8,12,18,.55));
  box-shadow: 0 10px 30px rgba(0,0,0,.35);
  border-color: color-mix(in oklab, var(--accent) 20%, var(--border) 80%);
}
.header__progress{
  position:absolute; left:0; top:0; right:0; height:2px;
  background: linear-gradient(90deg, var(--accent), #33e1ff);
  transform-origin: left center;
  transform: scaleX(var(--p, 0));
  box-shadow: 0 0 14px rgba(0,212,255,.35);
}

.header__inner{
  width: min(1180px, 92vw); margin: 0 auto;
  padding: 10px clamp(12px, 2vw, 24px);
  display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 16px;
}

/* Бренд */
.brand{ min-width:0; display:flex; align-items:center; gap:12px }
.brand__logo{ height: 28px; width:auto; display:block; filter: drop-shadow(0 2px 8px rgba(0,0,0,.35)) }
.brand__text{ min-width:0; display:grid }
.brand__name{ font-size: clamp(13px, 1.6vw, 16px); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; letter-spacing:.2px }
.brand__tagline{ color: var(--muted); font-size: 12px; opacity:.9 }

/* Нав — только на ≥1024px, без переносов и без скролла */
.nav--desktop{ display:none }
@media (min-width: 1024px){
  .nav--desktop{ display:flex; gap:8px; justify-content:center }
}
.nav__chip{
  border: 1px solid var(--border);
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(18,26,36,.65), rgba(12,18,28,.55));
  color: var(--text);
  padding: 8px 12px;
  font-size: 13px; font-weight: 800; letter-spacing: .2px;
  cursor:pointer;
  transition: border-color .18s ease, transform .1s ease;
  white-space: nowrap;
}
.nav__chip:hover{ border-color: color-mix(in oklab, var(--accent) 35%, white 0%) }
.nav__chip:active{ transform: translateY(1px) }

/* Действия */
.actions{ display:inline-flex; align-items:center; gap:10px }

/* язык */
.lang{ position:relative; display:inline-flex; align-items:center }
.lang__select{
  appearance:none; -webkit-appearance:none;
  padding: 8px 28px 8px 12px;
  border-radius: 10px; border:1px solid var(--border);
  background: linear-gradient(180deg, var(--card, #121a24), #0f1722);
  color: var(--text); font-weight: 700; letter-spacing:.3px; cursor:pointer;
  transition: border-color .18s ease, transform .12s ease;
}
.lang__select:hover{ border-color: color-mix(in oklab, var(--accent) 45%, white 0%) }
.lang__select:active{ transform: translateY(1px) }
.lang__chevron{ position:absolute; right:10px; pointer-events:none; font-size:12px; color:var(--muted) }

/* CTA */
.cta{
  display:inline-flex; align-items:center; gap:8px;
  padding:10px 16px; border-radius:12px; border:0; cursor:pointer;
  font-weight:900; text-transform:uppercase; letter-spacing:.4px;
  background: linear-gradient(90deg, var(--accent) 0%, #33e1ff 100%);
  color:#062534; box-shadow:0 0 24px rgba(0,212,255,.22);
  transition: transform .12s ease, box-shadow .18s ease, filter .18s ease;
}
.cta:hover{ transform: translateY(-1px); box-shadow: 0 8px 28px rgba(0,212,255,.28); filter: saturate(1.08) }
.cta:active{ transform: translateY(0) }
.cta__icn{ font-size:18px }

/* Бургер */
.burger{
  display:inline-flex; align-items:center; justify-content:center;
  width:38px; height:38px; border-radius:10px; border:1px solid var(--border);
  background: linear-gradient(180deg, rgba(18,26,36,.65), rgba(12,18,28,.55));
  color: var(--text); cursor:pointer;
  transition: border-color .18s ease, transform .1s ease;
}
.burger:hover{ border-color: color-mix(in oklab, var(--accent) 35%, white 0%) }
.burger:active{ transform: translateY(1px) }
@media (min-width: 1024px){
  .burger{ display:none }
}

/* спейсер */
.header__spacer{ width:100% }

/* ===== Мобильное меню (сайд-овер) ===== */
.sheet__backdrop{
  position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 9998;
}
.sheet{
  position: fixed; right: 0; top: 0; bottom: 0; width: min(86vw, 380px);
  background: linear-gradient(180deg, rgba(18,26,36,.95), rgba(12,18,28,.92));
  border-left: 1px solid var(--border);
  box-shadow: -20px 0 40px rgba(0,0,0,.5);
  z-index: 9999; display: flex; flex-direction: column; gap: 12px;
  padding: 14px;
}
.sheet__head{
  display:flex; align-items:center; justify-content:space-between; gap:12px;
}
.sheet__close{
  display:inline-flex; align-items:center; justify-content:center;
  width:36px; height:36px; border-radius:10px; border:1px solid var(--border);
  background: linear-gradient(180deg, rgba(18,26,36,.65), rgba(12,18,28,.55));
  color: var(--text); cursor:pointer;
}
.sheet__nav{
  display:grid; gap:10px; margin-top: 6px;
}
.sheet__link{
  text-align:left; padding:10px 12px; border-radius:12px;
  border:1px solid var(--border);
  background: linear-gradient(180deg, rgba(18,26,36,.65), rgba(12,18,28,.55));
  color: var(--text); font-weight:800; letter-spacing:.2px; cursor:pointer;
}
.sheet__cta{ margin-top:auto }

/* анимации */
.fade-enter-active,.fade-leave-active{ transition: opacity .2s ease }
.fade-enter-from,.fade-leave-to{ opacity:0 }
.slide-enter-active,.slide-leave-active{ transition: transform .22s ease }
.slide-enter-from,.slide-leave-to{ transform: translateX(100%) }
</style>
