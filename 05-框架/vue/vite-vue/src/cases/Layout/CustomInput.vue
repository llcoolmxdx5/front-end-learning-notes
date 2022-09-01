<template>
  <input :value="searchText" @input="onInput">
</template>

<script setup lang="ts">
import { useAttrs } from 'vue'
// 默认是 modelValue
const props = defineProps<{
  searchText: string;
  // modelModifiers: { lazy: () => ({}) }
  searchTextModifiers?: { capitalize: () => ({}) }
}>()

const emit = defineEmits<{
  (e: 'update:searchText', value: string): void
}>()

const onInput = (e: Event) => {
  let value = (e.target as HTMLInputElement)?.value
  const { capitalize } = props.searchTextModifiers ?? {}
  if (capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit('update:searchText', value)
}

const attrs = useAttrs()

console.log(attrs.class, 'attrs.class'); // 'a'
// 所有 没有被 props 和 emit 声明的属性 会在这里, 且会直接注入到根节点, 如果是多根节点会抛错
// attrs 是非响应式的
</script>

<script lang="ts">
// 使用普通的 <script> 来声明选项
export default {
  // 不想要组件根节点自动地继承 attribute
  inheritAttrs: false,
}
</script>
