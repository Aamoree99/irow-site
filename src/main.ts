import { createApp } from 'vue'
import App from './App.vue'
import './styles/theme.css'
import { i18n } from './plugins/i18n'
import { vRipple } from './plugins/ripple'

const app = createApp(App)
app.use(i18n)
app.directive('ripple', vRipple)
app.mount('#app')
