<template>
  <component :is="comp[selected]"></component>
  <button @click="switchC">switch</button>
  <ElCard class="box-card" header="动态组件">
    <div>&lt;component :is="comp[selected]">&lt;/component></div>
    <div>
      如果你把组件实例放到Reactive Vue会给你一个警告。reactive 会进行proxy 代理 而我们组件代理之后毫无用处。为了节省性能开销 推荐我们使用shallowRef 或者 markRaw 跳过proxy 代理
    </div>
    <div>被传给 :is 的值可以是以下几种 1.被注册的组件名 2.导入的组件对象</div>
    <div>当使用 &lt;component :is="..."> 来在多个组件间作切换时，被切换掉的组件会被卸载。我们可以通过 &lt;KeepAlive> 组件强制被切换掉的组件仍然保持“存活”的状态。</div>
    <div>当 is 是字符串，它既可以是 HTML 标签名也可以是组件的注册名。</div>
  </ElCard>
</template>

<script setup lang="ts">
import { reactive, markRaw, shallowRef, ref } from 'vue'
import Content from './Layout/content.vue'
import Header from './Layout/header.vue'

const comp = reactive({
  content: shallowRef(Content),
  header: markRaw(Header)
})

const selected = ref<keyof typeof comp>('content')

const switchC = () => {
  if (selected.value === 'content') {
    selected.value = 'header'
  } else {
    selected.value = 'content'
  }
}
</script>
