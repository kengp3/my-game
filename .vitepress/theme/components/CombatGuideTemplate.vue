<template>
  <div class="combat-guide-template">
    <!-- Header: title + difficulty badge (PRIMARY FOCAL POINT per UI-SPEC) -->
    <div class="combat-header template-section">
      <h1>{{ frontmatter.title ?? '（未命名教學）' }}</h1>
      <span v-if="frontmatter.difficulty" class="difficulty-badge" :data-level="frontmatter.difficulty">
        {{ frontmatter.difficulty }}
      </span>
    </div>

    <!-- Prerequisites block -->
    <div v-if="frontmatter.prerequisites?.length" class="template-section">
      <h2>前置知識</h2>
      <div class="prerequisites-row">
        <span v-for="prereq in frontmatter.prerequisites" :key="prereq" class="prerequisite-pill">
          {{ prereq }}
        </span>
      </div>
    </div>

    <!-- Keybindings table -->
    <div v-if="frontmatter.keybindings?.length" class="template-section">
      <h2>按鍵操作</h2>
      <table class="keybindings-table">
        <thead>
          <tr>
            <th>操作</th>
            <th>按鍵</th>
            <th>說明</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="kb in frontmatter.keybindings" :key="kb.action">
            <td>{{ kb.action }}</td>
            <td><code>{{ kb.key }}</code></td>
            <td>{{ kb.note }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="template-section empty-state">
      <p>按鍵資訊尚未提供，敬請期待。</p>
    </div>

    <!-- Tips list -->
    <div v-if="frontmatter.tips?.length" class="template-section">
      <h2>實用技巧</h2>
      <ol class="tips-list">
        <li v-for="(tip, index) in frontmatter.tips" :key="index">{{ tip }}</li>
      </ol>
    </div>

    <!-- Related pages -->
    <div v-if="frontmatter.relatedPages?.length" class="template-section">
      <h2>相關頁面</h2>
      <div class="related-pages-strip">
        <a v-for="page in frontmatter.relatedPages" :key="page.link" :href="withBase(page.link)" class="related-link">
          {{ page.text }}
        </a>
      </div>
    </div>

    <!-- Slot for Markdown body -->
    <div class="template-section">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData, withBase } from 'vitepress'

const { frontmatter } = useData()
</script>

<style scoped>
.combat-guide-template {
  max-width: 100%;
}

.combat-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.combat-header h1 {
  margin: 0;
  line-height: 1.2;
}

.prerequisites-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.prerequisite-pill {
  display: inline-block;
  padding: 4px 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  font-size: 14px;
}

.tips-list li {
  margin-bottom: 8px;
  padding-left: 8px;
  border-left: 3px solid var(--vp-c-brand-soft);
}

.related-pages-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.related-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  padding: 4px 8px;
}

.related-link:hover {
  text-decoration: underline;
}

.empty-state p {
  color: var(--vp-c-text-3);
  font-style: italic;
}
</style>
