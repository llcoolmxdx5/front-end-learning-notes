<template>
  <div class="a" :class="$style.red">
    <p class="b">b</p>
    <p class="c">c</p>
  </div>
  <ElCard class="box-card">深度选择器 影响到子组件，可以使用 :deep() 这个伪类</ElCard>
  <ElCard class="box-card">
    默认情况下，作用域样式不会影响到 &lt;slot/> 渲染出来的内容，因为它们被认为是父组件所持有并传递进来的
    使用 :slotted 伪类以明确地将插槽内容作为选择器的目标
  </ElCard>
  <ElCard class="box-card">如果想让其中一个样式规则应用到全局, 可以使用 :global 伪类来实现</ElCard>
</template>

<script setup lang="ts">
import { CSSProperties, useCssModule } from 'vue'

console.log(useCssModule());
// 具名情况下, 返回 <style module="classes"> 的 class
// useCssModule('classes')

const theme: CSSProperties = {
  color: 'green'
}

</script>

<style scoped lang="less">
// 深度选择器 影响到子组件，可以使用 :deep() 这个伪类
// .a[data-v-f3f3eg9] .b { /* ... */ }
.a :deep(.b) {
  background-color: red;
  width: 100px;
  height: 100px;
  color: aqua;
}

.c {
  width: 50px;
  height: 50px;
  background-color: v-bind('theme.color');
}

// 默认情况下，作用域样式不会影响到 <slot/> 渲染出来的内容，因为它们被认为是父组件所持有并传递进来的。
// 使用 :slotted 伪类以明确地将插槽内容作为选择器的目标
:slotted(div) {
  color: red;
}

// 如果想让其中一个样式规则应用到全局, 可以使用 :global 伪类来实现
:global(.red) {
  color: red;
}
</style>

<style module>
.red {
  color: red;
}
</style>
