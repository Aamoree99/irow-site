import { createI18n } from 'vue-i18n'
import { en } from '../content/irow.en'
import { ru } from '../content/irow.ru'
import { fr } from '../content/irow.fr'
import { es } from '../content/irow.es'
import { de } from '../content/irow.de'
import { zh } from '../content/irow.zh'

export const i18n = createI18n({
    legacy: false,
    locale: 'en',          // язык по умолчанию
    fallbackLocale: 'en',  // запасной язык
    messages: { en, ru, fr, es, de, zh },
})
