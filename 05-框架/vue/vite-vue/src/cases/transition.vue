<template>
  <button @click="show = !show">Toggle</button>
  <Transition @before-enter="onBeforeEnter" @enter="onEnter" @after-enter="onAfterEnter"
    @enter-cancelled="onEnterCancelled" @before-leave="onBeforeLeave" @leave="onLeave" @after-leave="onAfterLeave"
    @leave-cancelled="onLeaveCancelled">
    <p v-if="show">hello</p>
  </Transition>
  <ElCard header="概述" class="box-card">
    <div>Vue 提供了两个内置组件，可以帮助你制作基于状态变化的过渡和动画</div>
    <div>&lt;Transition> 会在一个元素或组件进入和离开 DOM 时应用动画。</div>
    <div>&lt;TransitionGroup> 会在一个 v-for 列表中的元素或组件被插入，移动，或移除时应用动画。</div>
  </ElCard>
  <ElCard header="Transition" class="box-card">
    <div>&lt;Transition> 是一个内置组件，这意味着它在任意别的组件中都可以被使用，无需注册。
      它可以将进入和离开动画应用到通过默认插槽传递给它的元素或组件上。进入或离开可以由以下的条件之一触发：</div>
    <div>由 v-if 所触发的切换</div>
    <div>由 v-show 所触发的切换</div>
    <div>由特殊元素 &lt;component> 切换的动态组件</div>
  </ElCard>
  <ElCard header="基于 CSS 的过渡效果" class="box-card">
    <div>一共有 6 个应用于进入与离开过渡效果的 CSS class。</div>
    <ol>
      <li>v-enter-from：进入动画的起始状态。在元素插入之前添加，在元素插入完成后的下一帧移除。</li>
      <li>v-enter-active：进入动画的生效状态。应用于整个进入动画阶段。在元素被插入之前添加，在过渡或动画完成之后移除。
        这个 class 可以被用来定义进入动画的持续时间、延迟与速度曲线类型。</li>
      <li>v-enter-to：进入动画的结束状态。
        在元素插入完成后的下一帧被添加 (也就是 v-enter-from 被移除的同时)，在过渡或动画完成之后移除。</li>
      <li>v-leave-from：离开动画的起始状态。在离开过渡效果被触发时立即添加，在一帧后被移除。</li>
      <li>v-leave-active：离开动画的生效状态。应用于整个离开动画阶段。在离开过渡效果被触发时立即添加，在过渡或动画完成之后移除。
        这个 class 可以被用来定义离开动画的持续时间、延迟与速度曲线类型。</li>
      <li>v-leave-to：离开动画的结束状态。
        在一个离开动画被触发后的下一帧被添加 (也就是 v-leave-from 被移除的同时)，在过渡或动画完成之后移除</li>
    </ol>
  </ElCard>
  <ElCard header="TransitionProps" class="box-card">
    <div v-for="item in propsArr">
      <div>{{ item }}</div>
    </div>
  </ElCard>
  <ElCard header="TransitionGroup" class="box-card">
    <div>为列表中的多个元素或组件提供过渡效果</div>
    <div>&lt;TransitionGroup> 拥有与 &lt;Transition> 除了 mode 以外所有的 props，并增加了两个额外的 props</div>
    <div>tag?: string 如果未定义，则渲染为片段 (fragment)</div>
    <div>moveClass?: string 用于自定义过渡期间被应用的 CSS class。在模板中使用 kebab-case，例如 move-class="xxx"</div>
    <div>&lt;TransitionGroup> 抛出与 &lt;Transition> 相同的事件</div>
  </ElCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const propsArr = [
  'interface TransitionProps {',
  '/**',
  '* 用于自动生成过渡 CSS class 名。',
  '* 例如 `name: "fade"` 将自动扩展为 `.fade-enter`、',
  '* `.fade-enter-active` 等。',
  '*/',
  'name?: string',
  '/**',
  '* 是否应用 CSS 过渡 class。',
  '* 默认：true',
  '*/',
  'css?: boolean',
  '/**',
  '* 指定要等待的过渡事件类型',
  '* 来确定过渡结束的时间。',
  '* 默认情况下会自动检测',
  '* 持续时间较长的类型。',
  '*/',
  'type?: "transition" | "animation"',
  '/**',
  '* 显式指定过渡的持续时间。',
  '* 默认情况下是等待过渡效果的根元素的第一个 `transitionend`',
  '* 或`animationend`事件。',
  '*/',
  'duration?: number | { enter: number; leave: number }',
  '/**',
  '* 控制离开/进入过渡的时序。',
  '* 默认情况下是同时的。',
  '*/',
  'mode?: "in-out" | "out-in" | "default"',
  '/**',
  '* 是否对初始渲染使用过渡。',
  '* 默认：false',
  '*/',
  'appear?: boolean',
  '',
  '/**',
  '* 用于自定义过渡 class 的 prop。',
  '* 在模板中使用短横线命名，例如：enter-from-class="xxx"',
  '*/',
  'enterFromClass?: string',
  'enterActiveClass?: string',
  'enterToClass?: string',
  'appearFromClass?: string',
  'appearActiveClass?: string',
  'appearToClass?: string',
  'leaveFromClass?: string',
  'leaveActiveClass?: string',
  'leaveToClass?: string',
  '}',
]

type Func = () => {}

const show = ref(true)

function onBeforeEnter(el: HTMLParagraphElement) {
  // 在元素被插入到 DOM 之前被调用
  // 用这个来设置元素的 "enter-from" 状态
  console.log('onBeforeEnter');
}

function onEnter(el: HTMLParagraphElement, done: Func) {
  // 在元素被插入到 DOM 之后的下一帧被调用
  // 用这个来开始进入动画
  console.log('onEnter');

  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  done()
}

// 当进入过渡完成时调用。
function onAfterEnter(el: HTMLParagraphElement) {
  console.log('onAfterEnter');
}
function onEnterCancelled(el: HTMLParagraphElement) {
  console.log('onEnterCancelled');
}

// 在 leave 钩子之前调用
// 大多数时候，你应该只会用到 leave 钩子
function onBeforeLeave(el: HTMLParagraphElement) {
  console.log('onBeforeLeave');
}

function onLeave(el: HTMLParagraphElement, done: Func) {
  // 在离开过渡开始时调用
  // 用这个来开始离开动画
  console.log('onLeave');
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  done()
}

function onAfterLeave(el: HTMLParagraphElement) {
  // 在离开过渡完成、
  // 且元素已从 DOM 中移除时调用
  console.log('onAfterLeave');
}

function onLeaveCancelled(el: HTMLParagraphElement) {
  // 仅在 v-show 过渡中可用
  console.log('onLeaveCancelled');
}

</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
