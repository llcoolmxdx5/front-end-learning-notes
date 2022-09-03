<template>
  <div ref="el">
    lifeCycle
    {{ count }}
  </div>
  <ErrorChild v-if="!errorMsg"></ErrorChild>
  {{ errorMsg }}
  <ElCard class="box-card" header="lifeCycle">
    <ul>
      <li v-for="item in lifeCycle">{{ item }}</li>
    </ul>
  </ElCard>
  <ElCard class="box-card" header="mount">
    <ul>
      <li v-for="item in mount">{{ item }}</li>
    </ul>
  </ElCard>
  <ElCard class="box-card" header="update">
    <ul>
      <li v-for="item in update">{{ item }}</li>
    </ul>
  </ElCard>
  <ElCard class="box-card" header="unmount">
    <ul>
      <li v-for="item in unmount">{{ item }}</li>
    </ul>
  </ElCard>
</template>

<script setup lang="ts">
// 使用 Vue3 组合式 API 是没有 beforeCreate 和 created 这两个生命周期的
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onErrorCaptured,
} from 'vue'
import ErrorChild from './ErrorChild.vue'

const el = ref<HTMLDivElement>()

const mount = [
  'root onBeforeMount',
  'mid onBeforeMount',
  'child onBeforeMount',
  'child onMounted',
  'mid onMounted',
  'root onMounted'
]

const update = [
  'root onBeforeUpdate',
  'mid onBeforeUpdate',
  'child onBeforeUpdate',
  'child onUpdated',
  'mid onUpdated',
  'root onUpdated'
]

const unmount = [
  'root onBeforeUnmount',
  'mid onBeforeUnmount',
  'child onBeforeUnmount',
  'child onUnmounted',
  'mid onUnmounted',
  'root onUnmounted'
]

const count = ref(0)
const errorMsg = ref('')

setTimeout(() => {
  count.value++
}, 500)

const lifeCycle = [
  'onBeforeMount',
  'onMounted',
  'onBeforeUpdate',
  'onUpdated',
  'onBeforeUnmount',
  'onUnmounted',
  'onActivated',
  'onDeactivated',
  'onErrorCaptured'
]

onBeforeMount(() => {
  // 注册一个钩子，在组件被挂载之前被调用。
})

onMounted(() => {
  // 注册一个回调函数，在组件挂载完成后执行。
  // 在这里请求 api
  console.log(el.value, 'el.value'); // // <div>
  console.log('onMounted');
})

onBeforeUpdate(() => {
  // 注册一个钩子，在组件即将因为响应式状态变更而更新其 DOM 树之前调用。
  // 这个钩子可以用来在 Vue 更新 DOM 之前访问 DOM 状态。在这个钩子中更改状态也是安全的。
  console.log('onBeforeUpdate');
})

onUpdated(() => {
  // 注册一个回调函数，在组件因为响应式状态变更而更新其 DOM 树之后调用
  // 父组件的更新钩子将在其子组件的更新钩子之后调用

  // 这个钩子会在组件的任意 DOM 更新后被调用，这些更新可能是由不同的状态变更导致的。
  // 如果你需要在某个特定的状态更改后访问更新后的 DOM，请使用 nextTick() 作为替代。

  // 不要在 updated 钩子中更改组件的状态，这可能会导致无限的更新循环！
  console.log('onUpdated');
})

onBeforeUnmount(() => {
  // 注册一个钩子，在组件实例被卸载之前调用。
  // 当这个钩子被调用时，组件实例依然还保有全部的功能。
  console.log('onBeforeUnmount');
})

onUnmounted(() => {
  // 注册一个回调函数，在组件实例被卸载之后调用。
  // 可以在这个钩子中手动清理一些副作用，例如计时器、DOM 事件监听器或者与服务器的连接。
  console.log('onUnmounted');
})

onActivated(() => {
  // 注册一个回调函数，若组件实例是 <KeepAlive> 缓存树的一部分，当组件被插入到 DOM 中时调用。
  console.log('onActivated');
})

onDeactivated(() => {
  // 注册一个回调函数，若组件实例是 <KeepAlive> 缓存树的一部分，当组件从 DOM 中被移除时调用。
  console.log('onDeactivated');
})

onErrorCaptured((err, instance, info) => {
  // 注册一个钩子，在捕获了后代组件传递的错误时调用。
  // 这个钩子可以通过返回 false 来阻止错误继续向上传递。
  // 这个钩子带有三个实参：错误对象、触发该错误的组件实例，以及一个说明错误来源类型的信息字符串
  console.log(instance?.$.type.__name, err.message, info /** setup function */);
  errorMsg.value = `${instance?.$.type.__name} ${err.message}`
  return false
})
</script>
