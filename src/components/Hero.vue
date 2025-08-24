<template>
  <section class="hero">
    <div class="container">
      <div class="hero__wrap">
        <img src="/src/assets/logo.png" alt="IROW" class="hero__logo" />

        <h1 class="hero__title">{{ t('hero.title') }}</h1>
        <p class="hero__subtitle">{{ t('hero.subtitle') }}</p>

        <ul class="hero__bullets">
          <li v-for="b in bullets" :key="b" class="hero__bullet">{{ b }}</li>
        </ul>

        <div class="hero__actions">
          <button class="btn btn--primary" v-ripple @click="openDiscord">
            <Icon icon="mdi:discord" style="font-size:18px" />
            {{ t('brand.cta') }}
          </button>

          <button class="btn btn--ghost" v-ripple @click="go('about')">
            <Icon icon="mdi:information-outline" style="font-size:18px" />
            {{ t('nav.about') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const { t, tm } = useI18n()
const bullets = computed(() => (tm('hero.bullets') as unknown as string[]) ?? [])

/** Впиши сюда свой инвайт или прокинь через env: import.meta.env.VITE_DISCORD_INVITE */
const DISCORD_INVITE = 'https://discord.gg/3DDQgTMk6y' // <-- put your https://discord.gg/xxxxx

function go(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function openDiscord() {
  if (DISCORD_INVITE) {
    window.open(DISCORD_INVITE, '_blank', 'noopener,noreferrer')
  } else {
    // если ссылки нет, скроллим к секции Join как фолбек
    go('join')
  }
}
</script>

<style scoped>
.hero{
  padding: clamp(44px, 8vw, 120px) 0 clamp(28px, 6vw, 80px);
  position: relative;
}
.hero__wrap {
  position: relative;
  padding: clamp(22px, 4vw, 42px);
  text-align: center;
  border-radius: var(--radius);
  background: linear-gradient(180deg, rgba(18,26,36,.88), rgba(12,18,28,.86));
  overflow: hidden;
  box-shadow: var(--elev-2);
}
.hero__wrap::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 2px;
  background: linear-gradient(90deg, rgba(0,212,255,.55), rgba(255,209,102,.45));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none;
}
.hero__logo{
  width: clamp(90px, 18vw, 140px);
  height: auto;
  margin-bottom: 8px;
  filter: drop-shadow(0 10px 24px rgba(0,0,0,.45));
}
.hero__title{
  font-size: clamp(28px, 4.6vw, 54px);
  margin: 0 0 6px;
  font-weight: 800;
  letter-spacing:.6px;
  line-height: 1.12;
  text-shadow: 0 2px 12px rgba(0,0,0,.35);
}
.hero__subtitle{
  max-width: 900px;
  margin: 0 auto;
  white-space: pre-line;
  color: var(--muted);
  font-size: clamp(15px, 2vw, 18px);
  line-height: 1.6;
}
.hero__bullets{
  list-style: none; padding:0; margin: 18px auto 8px;
  display: grid; gap: 10px;
  width: min(760px, 92%);
  text-align: left;
}
.hero__bullet{
  position: relative; padding-left: 1.5em;
  font-size: 15px;
}
.hero__bullet::before{
  content:"";
  position:absolute; left:0; top:.45em;
  width:.6em; height:.6em; border-radius:50%;
  background: radial-gradient(circle, var(--accent) 0%, rgba(0,212,255,.0) 70%);
  box-shadow: 0 0 18px rgba(0,212,255,.45);
}
.hero__actions{
  display:flex; gap:12px; flex-wrap:wrap; justify-content:center;
  margin-top: 8px;
}
@media (min-width: 760px){
  .hero__bullets{ grid-template-columns: 1fr 1fr }
}
</style>
