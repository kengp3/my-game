<template>
  <div class="choice-point">
    <div class="choice-point-header">
      <span class="choice-point-label">選擇點</span>
      <span v-if="title" class="choice-point-title">{{ title }}</span>
    </div>
    <div class="choice-options">
      <div
        v-for="(choice, index) in choices"
        :key="index"
        class="choice-option"
        :class="{ 'choice-recommended': choice.recommended }"
      >
        <div class="choice-option-header">
          <span class="choice-text">{{ choice.text }}</span>
          <span v-if="choice.recommended" class="recommended-badge">推薦</span>
        </div>
        <details class="choice-consequence">
          <summary>查看後果</summary>
          <p>{{ choice.consequence }}</p>
        </details>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  choices: Array<{
    text: string
    consequence: string
    recommended?: boolean
  }>
}>()
</script>

<style scoped>
.choice-point {
  border-left: 2px solid var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.choice-point-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.choice-point-label {
  font-size: 14px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.choice-point-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.choice-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.choice-option {
  padding: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.choice-recommended {
  background: var(--vp-c-brand-soft);
}

.choice-option-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.choice-text {
  font-weight: 700;
}

.recommended-badge {
  display: inline-block;
  padding: 2px 8px;
  background: var(--vp-c-brand-1);
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
}

.choice-consequence summary {
  cursor: pointer;
  color: var(--vp-c-brand-1);
  font-size: 14px;
}

.choice-consequence p {
  margin-top: 8px;
  color: var(--vp-c-text-2);
}
</style>
