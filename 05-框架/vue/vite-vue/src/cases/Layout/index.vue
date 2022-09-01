<template>
  <div class="layout">
    <Menu ref="menus" :data="menu" @on-click="getList" />
    <div class="right">
      <Header></Header>
      <Content></Content>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRaw, ref } from 'vue'
import Menu, { type MenuExpose } from './menu.vue'
import Header from './header.vue'
import Content from './content.vue'

const menus = ref<MenuExpose>()

const menu = reactive([4, 5, 6])

const getList = (list: number[]) => {
  console.log(toRaw(list), 'list 父组件接受子组件');

  // 当父组件通过模板引用的方式获取到当前组件的实例 ref 会和在普通实例中一样被自动解包
  console.log(menus.value?.searchText, 'menus.value?.searchText');
}

</script>

<style lang="less" scoped>
.layout {
  display: flex;
  margin-top: 8px;

  .right {
    display: flex;
    flex-direction: column;
  }
}
</style>

