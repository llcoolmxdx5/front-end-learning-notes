<template>
  <button @click="changeMsg">change</button>
  {{ msg.count }}
  <input type="text" v-model="text">
  <ElCard class="box-card" header="shallowRef">
    <div>和 ref() 不同，浅层 ref 的内部值将会原样存储和暴露，并且不会被深层递归地转为响应式。</div>
    <div>只有对 .value 的访问是响应式的。</div>
  </ElCard>
  <ElCard class="box-card" header="triggerRef">
    强制触发依赖于一个浅层 ref 的副作用，这通常在对浅引用的内部值进行深度变更后使用
  </ElCard>
  <ElCard class="box-card" header="customRef">
    <div>customRef 是个工厂函数要求我们返回一个对象 并且实现 get 和 set</div>
    <div>customRef() 预期接收一个工厂函数作为参数，这个工厂函数接受 track 和 trigger 两个函数作为参数，并返回一个带有 get 和 set 方法的对象。</div>
    <div>一般来说，track() 应该在 get() 方法中调用，而 trigger() 应该在 set() 中调用。然而事实上，你对何时调用、是否应该调用他们有完全的控制权</div>
  </ElCard>
</template>

<script setup lang="ts">
import { ref, isRef, customRef, shallowRef, triggerRef } from 'vue'
import { useDebouncedRef } from './utils'

const text = useDebouncedRef('hello', 300)

// const msg = ref({ count: 0 })
const msg = shallowRef({ count: 0 })

// export declare function customRef<T>(factory: CustomRefFactory<T>): Ref<T>;
// export declare type CustomRefFactory<T> = (track: () => void, trigger: () => void) => {
//     get: () => T;
//     set: (value: T) => void;
// };

const changeMsg = () => {
  msg.value.count += 1
  console.log(isRef(msg));
  triggerRef(msg)
}

</script>
