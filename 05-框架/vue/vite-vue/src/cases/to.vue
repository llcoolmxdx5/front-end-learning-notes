<template>
  {{ state }}
  {{ foo, bar }} toRefs
  <ElCard class="box-card" header="toRef">
    <div>基于响应式对象上的一个属性，创建一个对应的 ref。这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值，反之亦然。</div>
    <div>toRef() 这个函数在你想把一个 prop 的 ref 传递给一个组合式函数时会很有用 toRef(props, 'foo')</div>
    <div>当 toRef 与组件 props 结合使用时，关于禁止对 props 做出更改的限制依然有效</div>
    <div>即使源属性当前不存在，toRef() 也会返回一个可用的 ref。这让它在处理可选 props 的时候格外实用，相比之下 toRefs 就不会为可选 props 创建对应的 refs</div>
  </ElCard>
  <ElCard class="box-card" header="toRefs">
    <div>将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。每个单独的 ref 都是使用 toRef() 创建的。</div>
    <div>当从组合式函数中返回响应式对象时，toRefs 相当有用。使用它，消费者组件可以解构/展开返回的对象而不会失去响应性</div>
    <div>toRefs 在调用时只会为源对象上可以枚举的属性创建 ref。如果要为可能还不存在的属性创建 ref，请改用 toRef。</div>
  </ElCard>
  <ElCard class="box-card" header="toRaw">
    <div>根据一个 Vue 创建的代理返回其原始对象。</div>
    <div>toRaw() 可以返回由 reactive()、readonly()、shallowReactive() 或者 shallowReadonly() 创建的代理对应的原始对象。</div>
    <div>这是一个可以用于临时读取而不引起代理访问/跟踪开销，或是写入而不触发更改的特殊方法。不建议保存对原始对象的持久引用，请谨慎使用。</div>
  </ElCard>
</template>

<script setup lang="ts">
import { reactive, toRef, toRefs, toRaw } from 'vue'
const state = reactive({
  foo: 1,
  bar: 2
})
const fooRef = toRef(state, 'foo')
// 更改该 ref 会更新源属性
fooRef.value++
console.log(state.foo, 'state.foo') // 2
// 更改源属性也会更新该 ref
state.foo++
console.log(fooRef.value, 'fooRef.value') // 3

function useFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2
  })
  // ...基于状态的操作逻辑
  // 在返回时都转为 ref
  return toRefs(state)
}
// 可以解构而不会失去响应性
const { foo, bar } = useFeatureX()

const ccc = {}
const reactiveCcc = reactive(ccc)
console.log(toRaw(reactiveCcc) === ccc) // true
</script>
