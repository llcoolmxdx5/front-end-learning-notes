<template>
  <div class="con">
    <router-link to="/case/base">base</router-link>
    <router-link to="/case/ref">ref</router-link>
    <router-link to="/case/reactive">reactive</router-link>
    <router-link to="/case/to">to</router-link>
    <router-link to="/case/computed">computed</router-link>
  </div>
  <router-view></router-view>
</template>

<style scoped>
.con a {
  margin-right: 8px;
}
</style>
