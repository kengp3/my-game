<template>
  <div class="area-template">
    <!-- Header -->
    <div class="area-header template-section">
      <h1>{{ frontmatter.name }}</h1>
      <span v-if="frontmatter.levelRange" class="level-range">
        Lv. {{ frontmatter.levelRange }}
      </span>
    </div>

    <!-- Description -->
    <p v-if="frontmatter.description" class="area-description template-section">
      {{ frontmatter.description }}
    </p>

    <!-- Overview Grid -->
    <div class="template-section">
      <h2>區域概況</h2>
      <div class="area-overview-grid">
        <div class="template-card">
          <div class="info-label">等級範圍</div>
          <div class="info-value">Lv. {{ frontmatter.levelRange ?? '未知' }}</div>
        </div>
        <div class="template-card">
          <div class="info-label">敵人數量</div>
          <div class="info-value">{{ frontmatter.enemies?.length ?? 0 }} 種</div>
        </div>
        <div class="template-card">
          <div class="info-label">關聯任務</div>
          <div class="info-value">{{ frontmatter.quests?.length ?? 0 }} 個</div>
        </div>
      </div>
    </div>

    <!-- Enemy List -->
    <div v-if="frontmatter.enemies?.length" class="template-section">
      <h2>敵人列表</h2>
      <table>
        <thead>
          <tr>
            <th>敵人名稱</th>
            <th>等級</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="enemy in frontmatter.enemies" :key="enemy.name">
            <td>
              <a v-if="enemy.link" :href="withBase(enemy.link)">{{ enemy.name }}</a>
              <span v-else>{{ enemy.name }}</span>
            </td>
            <td>{{ enemy.level ?? '' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- NPC List -->
    <div v-if="frontmatter.npcs?.length" class="template-section">
      <h2>NPC 列表</h2>
      <table>
        <thead>
          <tr>
            <th>NPC 名稱</th>
            <th>位置</th>
            <th>服務</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="npc in frontmatter.npcs" :key="npc.name">
            <td>{{ npc.name }}</td>
            <td>{{ npc.location ?? '' }}</td>
            <td>{{ npc.services ?? '' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Chest List -->
    <div v-if="frontmatter.chests?.length" class="template-section">
      <h2>寶箱位置</h2>
      <ul class="area-chests">
        <li v-for="chest in frontmatter.chests" :key="chest.location">
          <strong>{{ chest.location }}：</strong>{{ chest.contents ?? '' }}
        </li>
      </ul>
    </div>

    <!-- Hidden Areas -->
    <div v-if="frontmatter.hiddenAreas?.length" class="template-section">
      <h2>隱藏區域</h2>
      <div
        v-for="area in frontmatter.hiddenAreas"
        :key="area.name"
        class="template-card hidden-area-card"
      >
        <div class="hidden-area-name">{{ area.name }}</div>
        <div v-if="area.description" class="hidden-area-description">{{ area.description }}</div>
        <div v-if="area.entryMethod" class="hidden-area-entry">
          <strong>進入方式：</strong>{{ area.entryMethod }}
        </div>
      </div>
    </div>

    <!-- Quest List -->
    <div v-if="frontmatter.quests?.length" class="template-section">
      <h2>相關任務</h2>
      <ul class="area-quests">
        <li v-for="quest in frontmatter.quests" :key="quest.name">
          <span class="quest-type">{{ quest.type }}：</span>
          <a v-if="quest.link" :href="withBase(quest.link)">{{ quest.name }}</a>
          <span v-else>{{ quest.name }}</span>
        </li>
      </ul>
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
.area-template {
  max-width: 100%;
}

.area-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.area-header h1 {
  margin: 0;
  line-height: 1.2;
}

.level-range {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 4px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 14px;
  font-weight: 700;
}

.area-description {
  font-size: 15px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.area-overview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

@media (max-width: 768px) {
  .area-overview-grid {
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
  font-size: 15px;
  color: var(--vp-c-text-1);
}

.area-chests {
  padding-left: 20px;
  line-height: 2;
}

.hidden-area-card {
  margin-bottom: 8px;
}

.hidden-area-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.hidden-area-description {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}

.hidden-area-entry {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.area-quests {
  padding-left: 20px;
  line-height: 2;
}

.quest-type {
  font-weight: 700;
  color: var(--vp-c-text-2);
}
</style>
