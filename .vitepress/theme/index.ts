import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import BossTemplate from './components/BossTemplate.vue'
import EquipmentTemplate from './components/EquipmentTemplate.vue'
import AreaTemplate from './components/AreaTemplate.vue'
import CombatGuideTemplate from './components/CombatGuideTemplate.vue'
import StoryChapterTemplate from './components/StoryChapterTemplate.vue'
import ChoicePoint from './components/ChoicePoint.vue'
import CharacterTemplate from './components/CharacterTemplate.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('BossTemplate', BossTemplate)
    app.component('EquipmentTemplate', EquipmentTemplate)
    app.component('AreaTemplate', AreaTemplate)
    app.component('CombatGuideTemplate', CombatGuideTemplate)
    app.component('StoryChapterTemplate', StoryChapterTemplate)
    app.component('ChoicePoint', ChoicePoint)
    app.component('CharacterTemplate', CharacterTemplate)
  }
} satisfies Theme
