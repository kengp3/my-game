<template>
  <div class="equipment-template">
    <!-- Header -->
    <div class="equipment-header template-section">
      <h1>{{ frontmatter.name }}</h1>
      <span
        v-if="frontmatter.rarity"
        class="rarity-badge equipment-rarity"
        :data-rarity="frontmatter.rarity"
      >{{ frontmatter.rarity }}</span>
    </div>

    <!-- Image -->
    <div class="equipment-image template-section">
      <img
        v-if="frontmatter.image"
        :src="frontmatter.image"
        :alt="frontmatter.name"
      />
      <div v-else class="equipment-image-placeholder">
        <span>圖片尚未提供</span>
      </div>
    </div>

    <!-- Stats Table -->
    <div v-if="frontmatter.stats?.length" class="template-section">
      <h2>屬性數值</h2>
      <table>
        <thead>
          <tr>
            <th>屬性</th>
            <th>數值</th>
            <th>備註</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="stat in frontmatter.stats" :key="stat.name">
            <td>{{ stat.name }}</td>
            <td>{{ stat.value }}</td>
            <td>{{ stat.note ?? '' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Sources -->
    <div v-if="frontmatter.sources?.length" class="template-section">
      <h2>取得方式</h2>
      <ul class="equipment-sources">
        <li v-for="source in frontmatter.sources" :key="source.type">
          <strong>{{ source.type }}：</strong>
          <a v-if="source.link" :href="withBase(source.link)">{{ source.from }}</a>
          <span v-else>{{ source.from }}</span>
        </li>
      </ul>
    </div>

    <!-- Enhancement -->
    <div v-if="frontmatter.enhancement?.length" class="template-section">
      <h2>強化路線</h2>
      <ol class="equipment-enhancement">
        <li
          v-for="(step, index) in frontmatter.enhancement"
          :key="index"
        >{{ step }}</li>
      </ol>
    </div>

    <!-- Build Recommendations -->
    <div v-if="frontmatter.builds?.length" class="template-section">
      <h2>適用建構</h2>
      <div class="equipment-builds">
        <div
          v-for="build in frontmatter.builds"
          :key="build.name"
          class="template-card"
        >
          <div class="build-name">{{ build.name }}</div>
          <div class="build-description">{{ build.description }}</div>
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
.equipment-template {
  max-width: 100%;
}

.equipment-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.equipment-header h1 {
  margin: 0;
  line-height: 1.2;
}

.equipment-rarity {
  font-size: 15px;
  font-weight: 700;
}

.equipment-image-placeholder {
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

.equipment-image img {
  max-width: 100%;
  border-radius: 8px;
}

.equipment-sources {
  padding-left: 20px;
  line-height: 2;
}

.equipment-enhancement {
  padding-left: 20px;
  line-height: 2;
}

.equipment-builds {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.build-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.build-description {
  font-size: 14px;
  color: var(--vp-c-text-2);
}
</style>
