<template>
  <div class="story-chapter-template">
    <!-- Chapter header (PRIMARY FOCAL POINT per UI-SPEC) -->
    <div class="chapter-header template-section">
      <span v-if="frontmatter.chapterNumber" class="chapter-number-badge">
        第 {{ frontmatter.chapterNumber }} 章
      </span>
      <h1>{{ frontmatter.chapterName ?? frontmatter.title ?? '（未命名章節）' }}</h1>
      <span v-if="frontmatter.recommendedLevel" class="chapter-meta">
        推薦等級：{{ frontmatter.recommendedLevel }}
      </span>
    </div>

    <!-- Areas involved -->
    <div v-if="frontmatter.areas?.length" class="template-section">
      <h2>涉及區域</h2>
      <div class="areas-chips">
        <span v-for="area in frontmatter.areas" :key="area" class="area-chip">
          {{ area }}
        </span>
      </div>
    </div>
    <div v-else class="template-section empty-state">
      <p>涉及區域資訊尚未填入，請待後續更新。</p>
    </div>

    <!-- Key bosses -->
    <div v-if="frontmatter.bosses?.length" class="template-section">
      <h2>關鍵 Boss</h2>
      <div class="boss-links">
        <template v-for="boss in frontmatter.bosses" :key="boss.name">
          <a v-if="boss.link" :href="withBase(boss.link)" class="boss-link template-card">
            {{ boss.name }}
          </a>
          <span v-else class="boss-link boss-link-pending template-card">
            {{ boss.name }}
          </span>
        </template>
      </div>
    </div>
    <div v-else class="template-section empty-state">
      <p>本章無關鍵 Boss，繼續探索主線。</p>
    </div>

    <!-- Choice points (per D-05) -->
    <div v-if="frontmatter.choices?.length" class="template-section">
      <h2>關鍵選擇</h2>
      <ChoicePoint
        v-for="(choice, index) in frontmatter.choices"
        :key="index"
        :title="choice.title"
        :choices="choice.options"
      />
    </div>

    <!-- Slot for Markdown body (story walkthrough, collectible hints) -->
    <div class="template-section">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import ChoicePoint from './ChoicePoint.vue'

const { frontmatter } = useData()
</script>

<style scoped>
.story-chapter-template {
  max-width: 100%;
}

.chapter-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chapter-header h1 {
  margin: 0;
  line-height: 1.2;
}

.chapter-number-badge {
  display: inline-block;
  padding: 4px 12px;
  background: var(--vp-c-brand-1);
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  width: fit-content;
}

.chapter-meta {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.areas-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.area-chip {
  display: inline-block;
  padding: 4px 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  font-size: 14px;
}

.boss-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.boss-link {
  display: inline-block;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.boss-link:hover {
  text-decoration: underline;
}

.boss-link-pending {
  color: var(--vp-c-text-2);
  cursor: default;
  font-style: italic;
}

.empty-state p {
  color: var(--vp-c-text-3);
  font-style: italic;
}
</style>
