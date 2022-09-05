<template>
  <div>
    <slot name="header"></slot>
    <slot></slot>
    <div v-for="item in 5">
      <slot name="data" :data="item" :a="2"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';
const slots = useSlots()
console.log(slots, 'slots');
</script>
