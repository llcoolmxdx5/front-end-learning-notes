<template>
  <div>
    <h1>Bank Account Balance</h1>
    <p>{{ $filters.format('accountBalance') }}</p>
  </div>
  <ElCard class="box-card">
    <div>由于Vue3 没有Prototype 属性 使用 app.config.globalProperties 代替 然后去定义变量和函数</div>
    <div>vue2: Vue.prototype.$http = () => {}</div>
    <div>vue3: app.config.globalProperties.$http = () => {}</div>
    <div>在Vue3 移除了过滤器 我们正好可以使用全局函数代替Filters</div>
    <div>app.config.globalProperties.$filters = { format(str) { return `$${str}` }</div>
    <div>this.$filters.format('xxx')</div>
    <hr>
    <div>import { getCurrentInstance } from 'vue';</div>
    <div>const { appContext } = getCurrentInstance()!</div>
    <div>console.log(appContext.config.globalProperties.$http());</div>
  </ElCard>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';

const { appContext } = getCurrentInstance()!

console.log(appContext.config.globalProperties.$http());
</script>
