<template>
  {{ msg }}
  {{ obj }}
  {{ stateShallowReadonly.nested.bar }}
</template>

<script setup lang="ts">
import { reactive, ref, readonly, shallowReadonly, isReadonly, watchEffect, shallowReactive, isReactive } from 'vue'
const msg = reactive<number[]>([])
const obj = reactive({
  name: 'aaa'
})
obj.name = 'bbb'
setTimeout(() => {
  const arr = [1, 2, 3, 4]
  msg.push(...arr)
  // msg = arr
}, 1000)

const books = reactive([ref('Vue 3 Guide')])
// 这里需要 .value
console.log(books[0].value, 'books[0].value')
const map = reactive(new Map([['count', ref(0)]]))
// 这里需要 .value
console.log(map.get('count')!.value, "map.get('count')!.value")

const original = reactive({ count: 0 })
const copy = readonly(original)

watchEffect(() => {
  // 用来做响应性追踪
  console.log(copy.count, 'copy.count')
})
// 更改源属性会触发其依赖的侦听器
original.count++
// 更改该只读副本将会失败，并会得到一个警告
// copy.count++ // warning!

const stateShallowReadonly = shallowReadonly({
  foo: 1,
  nested: {
    bar: 2
  }
})
watchEffect(() => {
  console.log(stateShallowReadonly.nested.bar, 'stateShallowReadonly.nested.bar')
})
// 更改状态自身的属性会失败
// stateShallowReadonly.foo++
// ...但可以更改下层嵌套对象
console.log(isReadonly(stateShallowReadonly.nested), 'isReadonly(stateShallowReadonly.nested)') // false
// 这是可以通过的
stateShallowReadonly.nested.bar++

const state = shallowReactive({
  foo: 1,
  nested: {
    bar: 2
  }
})
// 更改状态自身的属性是响应式的
state.foo++
// ...但下层嵌套对象不会被转为响应式
console.log(isReactive(state.nested), 'isReactive(state.nested)'); // false
// 不是响应式的
state.nested.bar++
</script>

<!--
  reactive 返回一个对象的响应式代理
  响应式转换是“深层”的：它会影响到所有嵌套的属性。一个响应式对象也将深层地解包任何 ref 属性，同时保持响应性。
  值得注意的是，当访问到某个响应式数组或 Map 这样的原生集合类型中的 ref 元素时，不会执行 ref 的解包。
 -->

<!--
  readonly 接受一个对象 (不论是响应式还是普通的) 或是一个 ref，返回一个原值的只读代理。
  只读代理是深层的：对任何嵌套属性的访问都将是只读的。它的 ref 解包行为与 reactive() 相同，但解包得到的值是只读的
 -->

<!--
  shallowReadonly readonly() 的浅层作用形式
  和 readonly() 不同，这里没有深层级的转换：只有根层级的属性变为了只读。
  属性的值都会被原样存储和暴露，这也意味着值为 ref 的属性不会被自动解包了。
 -->

<!--
  shallowReactive reactive() 的浅层作用形式。
  一个浅层响应式对象里只有根级别的属性是响应式的。属性的值会被原样存储和暴露，这也意味着值为 ref 的属性不会被自动解包了
 -->
