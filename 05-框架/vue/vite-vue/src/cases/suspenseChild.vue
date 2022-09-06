<template>
  <div>异步加载的内容: {{ content }}</div>
</template>

<script setup lang="ts">
const { content }: { content: string } = await fetch(`https://api.uomg.com/api/rand.qinghua?format=json`).then(r => r.json())
</script>
