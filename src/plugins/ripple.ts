import type { Directive } from 'vue'

export const vRipple: Directive = {
    mounted (el: HTMLElement) {
        el.style.position ||= 'relative'
        el.style.overflow = 'hidden'
        el.addEventListener('pointerdown', (e: PointerEvent) => {
            const rect = el.getBoundingClientRect()
            const r = document.createElement('span')
            r.className = 'ripple'
            r.style.left = `${e.clientX - rect.left}px`
            r.style.top  = `${e.clientY - rect.top}px`
            el.appendChild(r)
            r.addEventListener('animationend', () => r.remove(), { once: true })
        })
    }
}
