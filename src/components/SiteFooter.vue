<template>
  <footer class="footer" role="contentinfo">
    <!-- неоновая кайма сверху -->
    <div class="footer__neon" aria-hidden="true" />

    <div class="container footer__inner">
      <!-- Бренд -->
      <div class="footer__brand">
        <img src="/src/assets/logo.png" alt="IROW" class="footer__logo" />
        <div class="footer__brand-text">
          <strong class="footer__name">{{ t('brand.name') }}</strong>
          <span class="footer__tagline">{{ t('brand.tagline') }}</span>
        </div>
      </div>

      <!-- Навигация по секциям -->
      <nav class="footer__nav" aria-label="Footer">
        <a class="footer__link" href="#about">{{ t('nav.about') }}</a>
        <a class="footer__link" href="#offer">{{ t('nav.offer') }}</a>
        <a class="footer__link" href="#activities">{{ t('nav.activities') }}</a>
        <a class="footer__link" href="#join">{{ t('nav.join') }}</a>
        <a class="footer__link" href="#reqs">{{ t('nav.reqs') }}</a>
        <a class="footer__link" href="#goals">{{ t('nav.goals') }}</a>
      </nav>

      <!-- CTA -->
      <div class="footer__cta">
        <button class="btn btn--primary footer__cta-btn" @click="openDiscord">
          <Icon icon="mdi:discord" class="footer__cta-icn" />
          {{ t('brand.cta') }}
        </button>
        <small class="footer__copy">{{ t('footer') }}</small>
      </div>

    </div>

    <!-- нижняя плашка -->
    <div class="footer__bottom">
      <div class="container footer__bottom-inner">
        <small class="footer__small">{{ t('footer') }}</small>
        <button class="footer__top" @click="toTop" aria-label="Back to top">
          <Icon icon="mdi:arrow-up" />
          <span>Top</span>
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'

const { t } = useI18n()

// тут глобальная для этого файла константа
const DISCORD_INVITE = 'https://discord.gg/3DDQgTMk6y'

function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
function openDiscord() {
  window.open(DISCORD_INVITE, '_blank', 'noopener,noreferrer')
}
</script>

<style scoped>
.footer{
  position: relative;
  margin-top: clamp(36px, 6vw, 80px);
  color: var(--text);
  background:
      radial-gradient(1000px 380px at 50% 0%, rgba(0,212,255,.10), transparent 70%),
      linear-gradient(180deg, rgba(10,14,20,.3), rgba(10,14,20,.8));
  border-top: 1px solid var(--border);
}

/* неоновая полоска сверху футера с плавным свечением */
.footer__neon{
  position:absolute; left:0; right:0; top:0; height:2px;
  background: linear-gradient(90deg, rgba(0,212,255,.9), rgba(255,209,102,.9));
  filter: drop-shadow(0 6px 18px rgba(0,212,255,.35));
}

.footer__inner{
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
  padding: clamp(18px, 3vw, 28px) 0;
}
@media (min-width: 860px){
  .footer__inner{
    grid-template-columns: 1.2fr .8fr 1fr; /* бренд · нав · cta */
    align-items: start;
  }
}

/* Бренд */
.footer__brand{
  display:flex; gap:12px; align-items:center;
}
.footer__logo{
  width: 42px; height:auto; display:block;
  filter: drop-shadow(0 8px 22px rgba(0,0,0,.45));
}
.footer__brand-text{ display:grid }
.footer__name{
  font-size: clamp(14px, 1.8vw, 16px);
  letter-spacing:.2px;
}
.footer__tagline{
  color: var(--muted);
  font-size: 12px;
}

/* Нав */
.footer__nav{
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 10px 18px;
}
@media (min-width: 860px){
  .footer__nav{ grid-template-columns: 1fr }
}
.footer__link{
  text-decoration:none;
  color: var(--text);
  opacity:.9;
  border-bottom: 1px dashed transparent;
  transition: opacity .18s ease, border-color .18s ease, transform .1s ease;
}
.footer__link:hover{
  opacity:1;
  border-color: color-mix(in oklab, var(--accent) 50%, white 0%);
}
.footer__link:active{ transform: translateY(1px) }

/* CTA */
.footer__cta{
  display:flex; flex-direction:column; align-items:center; gap:10px;
}
.footer__cta-btn{
  display:inline-flex; align-items:center; gap:10px;
  padding-inline: 18px;
}
.footer__cta-icn{
  font-size: 20px;
  color: #062534;
}
.footer__copy{
  color: var(--muted);
}

/* Нижняя плашка */
.footer__bottom{
  border-top: 1px solid var(--border);
  background: linear-gradient(180deg, rgba(10,14,20,.7), rgba(10,14,20,.9));
}
.footer__bottom-inner{
  display:flex; align-items:center; justify-content:space-between;
  gap: 12px;
  padding: 10px 0;
}
.footer__small{
  color: var(--muted);
  opacity:.9;
}

/* Кнопка вверх */
.footer__top{
  display:inline-flex; align-items:center; gap:8px;
  background: linear-gradient(180deg, rgba(18,26,36,.65), rgba(12,18,28,.55));
  border:1px solid var(--border);
  color: var(--text);
  padding: 8px 12px; border-radius: 999px; cursor: pointer;
  font-weight: 800; letter-spacing:.2px;
  transition: border-color .18s ease, transform .1s ease;
}
.footer__top:hover{
  border-color: color-mix(in oklab, var(--accent) 35%, white 0%);
}
.footer__top:active{ transform: translateY(1px) }

/* Центровка на мобилке */
@media (max-width: 859.98px){
  .footer__brand{ justify-content:center }
  .footer__nav{ justify-content:center }
}
</style>
