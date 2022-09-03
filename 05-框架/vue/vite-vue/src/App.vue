<template>
  <ElConfigProvider :size="elConfig.size" :z-index="elConfig.zIndex">
    <ErrorBoundary>
      <RouterView></RouterView>
    </ErrorBoundary>
  </ElConfigProvider>
</template>

<script setup lang="ts">
const elConfig = {
  zIndex: 3000,
  size: 'small' as const,
}
</script>
