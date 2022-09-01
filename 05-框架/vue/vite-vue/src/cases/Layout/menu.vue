<template>
  <div class="menu">
    菜单区域 {{ title }}
    <button @click="clickTap">派发给父组件</button>
    <button @click="$emit('on-click', $props.data)">派发给父组件1</button>
    <CustomInputVue v-model:searchText.capitalize="searchText" class="a"></CustomInputVue>
    <div v-for="item in data">{{ item }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import CustomInputVue from './CustomInput.vue'

export type MenuExpose = {
  searchText: Ref<string>
}

const searchText = ref('')
// 使用 <script setup> 的组件是默认关闭的——即通过模板引用或者 $parent 链获取到的组件的公开实例，
// 不会暴露任何在 <script setup> 中声明的绑定。
// 可以通过 defineExpose 编译器宏来显式指定在 <script setup> 组件中要暴露出去的属性：
// 类似 react useImperativeHandle
defineExpose<MenuExpose>({
  searchText
})

type MenuProps = {
  title?: string
  data: number[]
}

const props = withDefaults(defineProps<MenuProps>(), {
  title: '我是menu'
})

// const emit = defineEmits(['on-click'])
const emit = defineEmits<{
  (e: 'on-click', list: number[]): void
}>()

const clickTap = () => {
  emit('on-click', props.data)
}
</script>

<style scoped lang="less">
.menu {
  width: 200px;
  max-width: 200px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
}
</style>
