<template>
  {{ state }} {{ message }}
</template>

<script setup lang="ts">
import { ref, reactive, watch, watchEffect } from 'vue'
const state = reactive({ count: 0 })
const message = ref({
  nav: {
    bar: {
      name: ""
    }
  }
})

watch(message, (msg, prevMsg) => {
  console.log(msg.nav.bar.name, prevMsg?.nav.bar.name);
}, {
  immediate: true,
  deep: true
})
setTimeout(() => {
  message.value.nav.bar.name = '1111'
}, 500)

// watch(
//   () => state.count,
//   (count, prevCount) => {
//     console.log(count, prevCount);
//   }
// )
// setInterval(() => {
//   state.count++
// }, 1000)

const count = ref(0)

const stop = watchEffect((onCleanup) => console.log(count.value, 'count'), {
  // flush: 'pre', // 组件更新前执行 默认
  // flush: 'sync', // 强制效果始终同步触发
  flush: 'post', // 组件更新后执行
})
// -> 输出 0
count.value++
// -> 输出 1
// stop()
</script>

<!--
  watch 侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数。
  watch() 默认是懒侦听的，即仅在侦听源发生变化时才执行回调函数。
  第一个参数是侦听器的源。这个来源可以是以下几种：
    一个函数，返回一个值
    一个 ref
    一个响应式对象
    ...或是由以上类型的值组成的数组
  第二个参数是在发生变化时要调用的回调函数。
    这个回调函数接受三个参数：新值、旧值，以及一个用于注册副作用清理的回调函数。
    该回调函数会在副作用下一次重新执行前调用，可以用来清除无效的副作用
    当侦听多个来源时，回调函数接受两个数组，分别对应来源数组中的新值和旧值。
  第三个可选的参数是一个对象，支持以下这些选项：
    immediate：在侦听器创建时立即触发回调。第一次调用时旧值是 undefined。
    deep：如果源是对象，强制深度遍历，以便在深层级变更时触发回调。参考深层侦听器。
    flush：调整回调函数的刷新时机。参考回调的刷新时机及 watchEffect()。
    onTrack / onTrigger：调试侦听器的依赖。参考调试侦听器。
  与 watchEffect() 相比，watch() 使我们可以：
    懒执行副作用；
    更加明确是应该由哪个状态触发侦听器重新执行；
    可以访问所侦听状态的前一个值和当前值。
  使用reactive监听深层对象开启和不开启deep 效果一样
-->

<!--
  watchEffect 立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。
  第一个参数就是要运行的副作用函数。
    这个副作用函数的参数也是一个函数，用来注册清理回调。
    清理回调会在该副作用下一次执行前被调用，可以用来清理无效的副作用，例如等待中的异步请求
  第二个参数是一个可选的选项，可以用来调整副作用的刷新时机或调试副作用的依赖。
    默认情况下，观察程序将在组件渲染之前运行。设置 flush:'post' 会将观察者延迟到组件渲染之后。
    在极少数情况下，当反应性依赖关系发生变化时，可能需要立即触发观察者，例如使缓存无效。
    这可以通过使用 flush: 'sync' 来实现。但是，应谨慎使用此设置，因为如果同时更新多个属性，可能会导致性能和数据一致性问题。
  返回值是一个用来停止该副作用的函数。
 -->
