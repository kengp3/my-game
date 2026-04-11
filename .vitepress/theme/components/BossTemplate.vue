<template>
  <div class="boss-template">
    <!-- Header -->
    <div class="boss-header template-section">
      <h1>{{ frontmatter.name ?? '（未命名）' }}</h1>
      <span
        v-if="frontmatter.difficulty"
        class="difficulty-badge"
        :data-level="frontmatter.difficulty"
      >{{ frontmatter.difficulty }}</span>
    </div>

    <!-- Image -->
    <div class="boss-image template-section">
      <img
        v-if="frontmatter.image"
        :src="withBase(frontmatter.image)"
        :alt="frontmatter.name ?? ''"
      />
      <div v-else class="boss-image-placeholder">
        <span>圖片尚未提供</span>
      </div>
    </div>

    <!-- Info Grid -->
    <div class="template-section">
      <h2>基本資訊</h2>
      <div class="boss-info-grid">
        <div class="template-card">
          <div class="info-label">等級</div>
          <div class="info-value">{{ frontmatter.level ?? '未知' }}</div>
        </div>
        <div class="template-card">
          <div class="info-label">弱點屬性</div>
          <div class="info-value">{{ frontmatter.weakness?.join('、') ?? '未知' }}</div>
        </div>
        <div class="template-card">
          <div class="info-label">所在區域</div>
          <div class="info-value">
            <a v-if="frontmatter.areaLink" :href="withBase(frontmatter.areaLink)">
              {{ frontmatter.area ?? '未知' }}
            </a>
            <span v-else>{{ frontmatter.area ?? '未知' }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Drops Section -->
    <div v-if="frontmatter.drops?.length" class="template-section">
      <h2>掉落物品</h2>
      <div class="boss-drops-list">
        <div
          v-for="drop in frontmatter.drops"
          :key="drop.name"
          class="template-card boss-drop-item"
        >
          <a v-if="drop.link" :href="withBase(drop.link)">{{ drop.name }}</a>
          <span v-else>{{ drop.name }}</span>
          <span
            v-if="drop.rarity"
            class="rarity-badge"
            :data-rarity="drop.rarity"
          >{{ drop.rarity }}</span>
        </div>
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
.boss-template {
  max-width: 100%;
}

.boss-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.boss-header h1 {
  margin: 0;
  line-height: 1.2;
}

.boss-image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  background: var(--vp-c-bg-soft);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 8px;
  color: var(--vp-c-text-3);
  font-size: 14px;
}

.boss-image img {
  max-width: 100%;
  border-radius: 8px;
}

.boss-info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

@media (max-width: 768px) {
  .boss-info-grid {
    grid-template-columns: 1fr;
  }
}

.info-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  margin-bottom: 4px;
}

.info-value {
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.boss-drops-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.boss-drop-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
