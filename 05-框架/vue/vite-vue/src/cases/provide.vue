<template>
  <Inject />
  <ElCard class="box-card">
    一个父组件相对于其所有的后代组件，会作为依赖提供者。任何后代的组件树，无论层级有多深，都可以注入由父组件提供给整条链路的依赖。
  </ElCard>
  <ElCard class="box-card" header="Provide">
    <div>要为组件后代提供数据，需要使用到 provide() 函数</div>
    <div>provide(/* 注入名 */ 'message', /* 值 */ 'hello!')</div>
    <div>如果不使用 &lt;script setup>，请确保 provide() 是在 setup() 同步调用的</div>
    <div>
      provide() 函数接收两个参数。
      第一个参数被称为注入名，可以是一个字符串或是一个 Symbol。后代组件会用注入名来查找期望注入的值。
      一个组件可以多次调用 provide()，使用不同的注入名，注入不同的依赖值。</div>
    <div>第二个参数是提供的值，值可以是任意类型，包括响应式的状态，比如一个 ref</div>
    <div>除了在一个组件中提供依赖，我们还可以在整个应用层面提供依赖. app.provide(/* 注入名 */ 'message', /* 值 */ 'hello!')</div>
  </ElCard>
  <ElCard class="box-card" header="Inject">
    <div>要注入上层组件提供的数据，需使用 inject() 函数</div>
    <div>const message = inject('message')</div>
    <div>如果提供的值是一个 ref，注入进来的会是该 ref 对象，而不会自动解包为其内部的值。
      这使得注入方组件能够通过 ref 对象保持了和供给方的响应性链接</div>
    <div>同样的，如果没有使用 &lt;script setup>，inject() 需要在 setup() 内同步调用</div>
    <div>默认情况下，inject 假设传入的注入名会被某个祖先链上的组件提供。如果该注入名的确没有任何组件提供，则会抛出一个运行时警告</div>
    <div>const value = inject('message', '这是默认值')</div>
    <div>const value = inject('key', () => new ExpensiveClass())</div>
  </ElCard>
  <ElCard class="box-card" header="为 provide / inject 标注类型">
    <div>import type { InjectionKey } from 'vue'</div>
    <div>const key = Symbol() as InjectionKey&lt;string></div>
  </ElCard>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import Inject from './inject.vue'
import { type Pole, locationKey } from './provide'

const location = ref<Pole>('North Pole')

function updateLocation() {
  if (location.value === 'North Pole') {
    location.value = 'South Pole'
  } else {
    location.value = 'North Pole'
  }
}

provide(locationKey, {
  location,
  updateLocation
})
</script>
