<template>
  <div class="con">
    <router-link to="/case/base">base</router-link>
    <router-link to="/case/ref">ref</router-link>
  </div>
  <router-view></router-view>
</template>

<style scoped>
.con a {
  margin-right: 8px;
}
</style>
