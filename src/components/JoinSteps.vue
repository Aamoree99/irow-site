<template>
  <section id="join" class="join">
    <div class="container">
      <h2 class="join__title">{{ t('nav.join') }}</h2>

      <ol class="steps" role="list">
        <li
            v-for="(title, idx) in steps"
            :key="idx"
            class="step"
        >
          <div class="step__lead">
            <span class="step__line" aria-hidden="true"></span>
            <span class="step__badge">
              <Icon :icon="icons[idx] || 'mdi:checkbox-blank-circle-outline'" class="step__icon"/>
              <span class="step__num">{{ idx + 1 }}</span>
            </span>
          </div>

          <div class="step__body">
            <h3 class="step__title">{{ title }}</h3>
            <p class="step__hint" v-if="hints[idx]">{{ hints[idx] }}</p>
          </div>
        </li>
      </ol>

      <div class="join__cta">
        <a
            class="discord-btn"
            :href="DISCORD_INVITE"
            target="_blank"
            rel="noopener noreferrer"
        >
          <Icon icon="mdi:discord" class="discord-btn__icn"/>
          <span>{{ t('join.cta') }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'

const { t, tm } = useI18n()

const steps = computed(() => (tm('join.steps') as unknown as string[]) ?? [])
const hints = computed(() => (tm('join.hints') as unknown as string[]) ?? [])

// иконки под шаги
const icons = [
  'mdi:discord',
  'mdi:key-chain',
  'mdi:account-voice',
  'mdi:rocket-launch',
]

// глобальная константа с линком
const DISCORD_INVITE = 'https://discord.gg/3DDQgTMk6y'
</script>

<style scoped>
.join{
  padding: clamp(40px, 7vw, 96px) 0;
}

.join__title{
  margin: 0 0 20px;
  font-size: clamp(20px, 3vw, 28px);
  display: inline-block;
  padding-bottom: 6px;
  position: relative;
}
.join__title::after{
  content:"";
  position:absolute; left:0; right:0; bottom:0; height:2px;
  background: linear-gradient(90deg, var(--accent), transparent 70%);
  filter: drop-shadow(0 6px 16px rgba(0,212,255,.25));
}

/* ===== СЕТКА ===== */
.steps{
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 16px;
}
.step{
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: var(--radius);
  background: linear-gradient(180deg, rgba(18,26,36,.9), rgba(12,18,28,.86));
  border: 1px solid var(--border);
  box-shadow: var(--elev-2);
  transition: transform .16s ease, box-shadow .18s ease, border-color .18s ease;
}
.step:hover{
  transform: translateY(-2px);
  box-shadow: var(--elev-3);
  border-color: color-mix(in oklab, var(--accent) 40%, white 0%);
}

/* левая колонка */
.step__lead{
  position: relative;
  width: 64px;
  display: grid;
  place-items: center;
}
.step__line{
  position: absolute;
  left: calc(50% - 1px);
  top: -10px;
  bottom: -10px;
  width: 2px;
  background: linear-gradient(180deg, rgba(0,212,255,.3), rgba(255,209,102,.25));
}
.step__badge{
  position: relative;
  width: 48px; height: 48px;
  border-radius: 14px;
  display: grid; place-items: center;
  background: linear-gradient(180deg, rgba(18,26,36,.7), rgba(12,18,28,.55));
  border: 1px solid var(--border);
  box-shadow: 0 0 12px rgba(0,212,255,.35);
  overflow: hidden;
}
.step__badge::before{
  content:"";
  position:absolute; inset:0; border-radius:inherit; padding:2px;
  background: linear-gradient(90deg, rgba(0,212,255,.7), rgba(255,209,102,.5));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
}
.step__icon{
  font-size: 22px;
  color: var(--accent);
  filter: drop-shadow(0 0 8px rgba(0,212,255,.7));
}
.step__num{
  position: absolute;
  inset: auto 6px 4px auto;
  font-size: 10px;
  font-weight: 800;
  color: rgba(255,255,255,.75);
}

/* контент */
.step__body{ display: grid; gap: 6px }
.step__title{ margin: 0; font-size: 16px; line-height: 1.3 }
.step__hint{ margin: 0; font-size: 13px; color: var(--muted) }

/* CTA */
.join__cta{
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.join__invite{
  margin: 0;
  font-size: 14px;
  color: var(--muted);
  text-align: center;
}

.discord-btn{
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  border-radius: 14px;
  font-weight: 900;
  letter-spacing: .4px;
  text-transform: uppercase;
  color: #fff;
  text-decoration: none;
  background: linear-gradient(90deg, #5865F2, #00d4ff);
  box-shadow: 0 0 24px rgba(0,212,255,.35);
  transition: transform .12s ease, box-shadow .18s ease;
}
.discord-btn:hover{
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(0,212,255,.45);
}
.discord-btn:active{ transform: translateY(0) }
.discord-btn__icn{ font-size: 22px }
</style>
