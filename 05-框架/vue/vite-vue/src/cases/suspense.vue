<template>
  <div>vue3.2 还是个实验性功能</div>
  <Suspense>
    <template #default>
      <div>
        <SuspenseChild></SuspenseChild>
        <AsyncContent></AsyncContent>
      </div>
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
  <ElCard class="box-card" header="异步依赖">
    &lt;Suspense> 可以等待的异步依赖有两种：
    <div>1. 带有异步 setup() 钩子的组件。这也包含了使用 &lt;script setup> 时有顶层 await 表达式的组件。</div>
    <div>2. 异步组件。</div>
  </ElCard>
  <ElCard class="box-card" header="异步组件">
    <div>异步组件默认就是“suspensible”的。这意味着如果组件关系链上有一个 &lt;Suspense>，那么这个异步组件就会被当作这个 &lt;Suspense> 的一个异步依赖。在这种情况下，加载状态是由
      &lt;Suspense> 控制，而该组件自己的加载、报错、延时和超时等选项都将被忽略。</div>
    <div>异步组件也可以通过在选项中指定 suspensible: false 表明不用 Suspense 控制，并让组件始终自己控制其加载状态。</div>
    <div>const AsyncContent = defineAsyncComponent({ loader: () => import('./Layout/content.vue'), delay: 5000 })</div>
    <div>或</div>
    <div>const AsyncContent = defineAsyncComponent(() => import('./Layout/content.vue'))</div>
  </ElCard>
  <ElCard class="box-card" header="加载中状态">
    <div>&lt;Suspense> 组件有两个插槽：#default 和 #fallback。两个插槽都只允许一个直接子节点。在可能的时候都将显示默认槽中的节点。否则将显示后备槽中的节点。</div>
    <div>在初始渲染时，&lt;Suspense> 将在内存中渲染其默认的插槽内容。如果在这个过程中遇到任何异步依赖，则会进入挂起状态。在挂起状态期间，展示的是后备内容。当所有遇到的异步依赖都完成后，&lt;Suspense>
      会进入完成状态，并将展示出默认插槽的内容。</div>
    <div>如果在初次渲染时没有遇到异步依赖，&lt;Suspense> 会直接进入完成状态。</div>
    <div>进入完成状态后，只有当默认插槽的根节点被替换时，&lt;Suspense> 才会回到挂起状态。组件树中新的更深层次的异步依赖不会造成 &lt;Suspense> 回退到挂起状态。</div>
    <div>发生回退时，后备内容不会立即展示出来。相反，&lt;Suspense> 在等待新内容和异步依赖完成时，会展示之前 #default 插槽的内容。这个行为可以通过一个 timeout prop
      进行配置：在等待渲染新内容耗时超过 timeout 之后，&lt;Suspense> 将会切换为展示后备内容。若 timeout 值为 0 将导致在替换默认内容时立即显示后备内容。</div>
  </ElCard>

</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import SuspenseChild from './suspenseChild.vue'

const AsyncContent = defineAsyncComponent({
  loader: () => import('./Layout/content.vue'),
  delay: 5000,
  suspensible: false
})
</script>
