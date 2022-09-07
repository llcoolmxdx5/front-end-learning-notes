<template>
  <div id="teleport"></div>
  <Teleport to="#teleport">
    <div>A</div>
  </Teleport>
  <Teleport to="#teleport">
    <div>B</div>
  </Teleport>
  <ElCard header="Teleport" class="box-card">
    <div>&lt;Teleport> 是一个内置组件，它可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去。</div>
    <div>&lt;Teleport> 接收一个 to prop 来指定传送的目标。to 的值可以是一个 CSS 选择器字符串，也可以是一个 DOM 元素对象。</div>
    <div>disabled Props: 当值为 `true` 时，内容将保留在其原始位置,而不是移动到目标容器中。可以动态更改。</div>
    <div>一个可重用的模态框组件可能同时存在多个实例。对于此类场景，多个 &lt;Teleport> 组件可以将其内容挂载在同一个目标元素上，而顺序就是简单的顺次追加，后挂载的将排在目标元素下更后面的位置上。</div>
  </ElCard>
</template>

<script setup lang="ts">

</script>
