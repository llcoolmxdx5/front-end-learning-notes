<template>
  {{ `${plusOne}, ${count}` }};
  {{ `${plusOne1}, ${count1}` }}
  <ElCard class="box-card" header="computed">
    <div>接受一个 getter 函数，返回一个只读的响应式 ref 对象。</div>
    <div>该 ref 通过 .value 暴露 getter 函数的返回值。</div>
    <div>它也可以接受一个带有 get 和 set 函数的对象来创建一个可写的 ref 对象。</div>
  </ElCard>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const count = ref(1)
const plusOne = computed(() => count.value + 1)
console.log(plusOne.value, 'plusOne.value') // 2
// plusOne.value++ // 错误

const count1 = ref(1)
const plusOne1 = computed({
  get: () => count1.value + 1,
  set: (val) => {
    count1.value = val - 1
  }
})
plusOne1.value = 1
console.log(count1.value, 'count1.value') // 0
</script>
