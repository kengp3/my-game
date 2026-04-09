import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import BossTemplate from './components/BossTemplate.vue'
import EquipmentTemplate from './components/EquipmentTemplate.vue'
import AreaTemplate from './components/AreaTemplate.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('BossTemplate', BossTemplate)
    app.component('EquipmentTemplate', EquipmentTemplate)
    app.component('AreaTemplate', AreaTemplate)
  }
} satisfies Theme
