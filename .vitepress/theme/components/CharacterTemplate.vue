<template>
  <div class="character-template">
    <!-- Header -->
    <div class="character-header template-section">
      <h1>{{ frontmatter.name ?? '（未命名）' }}</h1>
      <span v-if="frontmatter.classType" class="class-type-badge">{{ frontmatter.classType }}</span>
    </div>

    <!-- Image -->
    <div class="character-image template-section">
      <img
        v-if="frontmatter.image"
        :src="withBase(frontmatter.image)"
        :alt="frontmatter.name ?? ''"
      />
      <div v-else class="character-image-placeholder">
        <span>圖片尚未提供</span>
      </div>
    </div>

    <!-- Info Grid -->
    <div class="template-section">
      <h2>基本資訊</h2>
      <div class="character-info-grid">
        <div class="template-card">
          <div class="info-label">職業類型</div>
          <div class="info-value">{{ frontmatter.classType ?? '未知' }}</div>
        </div>
        <div class="template-card">
          <div class="info-label">主武器類型</div>
          <div class="info-value">{{ frontmatter.mainWeapon ?? '未知' }}</div>
        </div>
        <div class="template-card">
          <div class="info-label">推薦等級</div>
          <div class="info-value">{{ frontmatter.recommendedLevel ?? '未知' }}</div>
        </div>
      </div>
    </div>

    <!-- Skills Table -->
    <div class="template-section">
      <h2>技能列表</h2>
      <table v-if="frontmatter.skills?.length">
        <thead>
          <tr>
            <th>技能名稱</th>
            <th>等級</th>
            <th>效果</th>
            <th>冷卻時間</th>
            <th>備註</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="skill in frontmatter.skills" :key="skill.name">
            <td>{{ skill.name }}</td>
            <td>{{ skill.level }}</td>
            <td>{{ skill.effect }}</td>
            <td>{{ skill.cooldown ?? '—' }}</td>
            <td>{{ skill.note ?? '' }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else style="color: var(--vp-c-text-3)">技能資料尚未收集，請待後續更新。</p>
    </div>

    <!-- Build Recommendations -->
    <div class="template-section">
      <h2>建構推薦</h2>
      <div v-if="frontmatter.builds?.length" class="character-builds">
        <div v-for="build in frontmatter.builds" :key="build.name" class="template-card">
          <div class="build-name">{{ build.name }}</div>
          <div class="build-description">{{ build.description }}</div>
          <div v-if="build.equipmentLinks?.length" class="build-equipment">推薦裝備：<template v-for="(eq, idx) in build.equipmentLinks" :key="eq.text"><span v-if="idx > 0">、</span><a :href="withBase(eq.link)">{{ eq.text }}</a></template></div>
        </div>
      </div>
      <p v-else style="color: var(--vp-c-text-3)">建構推薦資料尚待整理，歡迎參考社群討論。</p>
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
.character-template {
  max-width: 100%;
}

.character-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.character-header h1 {
  margin: 0;
  line-height: 1.2;
}

.class-type-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 14px;
  font-weight: 700;
}

.character-image-placeholder {
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

.character-image img {
  max-width: 100%;
  border-radius: 8px;
}

.character-info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

@media (max-width: 768px) {
  .character-info-grid {
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

.character-builds {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.build-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.build-description {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.build-equipment {
  margin-top: 8px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.build-equipment a {
  color: var(--vp-c-brand-1);
}
</style>
