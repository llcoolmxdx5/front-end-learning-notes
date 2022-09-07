<template>
  <KeepAlive>
    <Content v-if="selected === 'content'"></Content>
    <Menu :data="[1]" v-else-if="selected === 'menu'"></Menu>
  </KeepAlive>
  <!-- <KeepAlive>
    <component :is="comp[selected]"></component>
  </KeepAlive> -->
  <button @click="onSwitch()">switch</button>
  <ElCard header="KeepAlive" class="box-card">
    <div>可以用 &lt;KeepAlive> 内置组件将这些动态组件包装起来</div>
    <div>或是子组件 v-if v-else-if v-else</div>
    <div>interface KeepAliveProps { include?: MatchPattern; exclude?: MatchPattern; max?: number | string }</div>
    <div>include 和 exclude prop 的值都可以是一个以英文逗号分隔的字符串、一个正则表达式，或是包含这两种类型的一个数组</div>
    <div>传入 max prop 来限制可被缓存的最大组件实例数。&lt;KeepAlive> 的行为在指定了 max 后类似一个 LRU
      缓存：如果缓存的实例数量即将超过指定的那个最大数量，则最久没有被访问的缓存实例将被销毁，以便为新的实例腾出空间。</div>
  </ElCard>
  <ElCard header="缓存实例的生命周期" class="box-card">
    <div>当一个组件实例从 DOM 上移除但因为被 &lt;KeepAlive> 缓存而仍作为组件树的一部分时，它将变为不活跃状态而不是被卸载。
      当一个组件实例作为缓存树的一部分插入到 DOM 中时，它将重新被激活。</div>
    <div>一个持续存在的组件可以通过 onActivated() 和 onDeactivated() 注册相应的两个状态的生命周期钩子</div>
    <div>onActivated 调用时机为首次挂载 以及每次从缓存中被重新插入时</div>
    <div>onDeactivated 在从 DOM 上移除、进入缓存以及组件卸载时调用</div>
    <div>onActivated 在组件挂载时也会调用，并且 onDeactivated 在组件卸载时也会调用。
      这两个钩子不仅适用于 &lt;KeepAlive> 缓存的根组件，也适用于缓存树中的后代组件。</div>
  </ElCard>
</template>

<script setup lang="ts">
import { reactive, ref, shallowRef } from 'vue'
import Content from './Layout/content.vue'
import Menu from './Layout/menu.vue'

const comp = reactive({
  content: shallowRef(Content),
  menu: shallowRef(Menu)
})

const selected = ref<'content' | 'menu'>('content')

const onSwitch = () => {
  if (selected.value === 'content') {
    selected.value = 'menu'
  } else {
    selected.value = 'content'
  }
}
</script>
