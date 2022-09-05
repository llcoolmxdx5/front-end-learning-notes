<template>
  <SlotChild>
    <template #[header]>
      <div>header</div>
    </template>
    <template #default>
      <div>default</div>
    </template>
    <template #data="{ data, a }">
      <div>
        {{ data + a }}
      </div>
    </template>
  </SlotChild>
  <ElCard header="匿名插槽" class="box-card">
    <div>&lt;template v-slot>&lt;div>2132&lt;/div>&lt;/template></div>
    或
    <div>&lt;template>&lt;div>2132&lt;/div>&lt;/template></div>
    或
    <div>&lt;template #default>&lt;div>2132&lt;/div>&lt;/template></div>
  </ElCard>
  <ElCard header="具名插槽" class="box-card">
    <div>&lt;template v-slot:header>&lt;div>2132&lt;/div>&lt;/template></div>
    或
    <div>&lt;template #header>&lt;div>2132&lt;/div>&lt;/template></div>
  </ElCard>
  <ElCard header="作用域插槽" class="box-card">
    <div>父组件</div>
    <div>&lt;template #data="{ data, a }">&lt;div>{\{ data + a }}&lt;/div></div>
    <div>子组件</div>
    <div>&lt;div v-for="item in 5">&lt;slot name="data" :data="item" :a="2">&lt;/slot>&lt;/div></div>
  </ElCard>
  <ElCard header="useSlots" class="box-card">
    <div>在 &lt;script setup> 使用 slots,可以在模板中直接通过 $slots 来访问它. </div>
    <div>也可以 使用 `useSlots` suseSlots 是真实的运行时函数，它的返回与 setupContext.slots 等价。同样也能在普通的组合式 API 中使用。</div>
  </ElCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SlotChild from './SlotChild.vue'
const header = ref('header' as const)
</script>
