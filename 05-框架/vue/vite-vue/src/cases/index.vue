<template>
  <div class="con">
    <router-link :to="'/case/' + item.path" v-for="item in links">{{ item.name }}</router-link>
  </div>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue'
import { routes } from '../router'
const arr = reactive(routes)
const links = computed(() => {
  return arr.find(x => x.path === '/case')?.children
})
</script>

<style scoped>
.con a {
  margin-right: 8px;
}
</style>
