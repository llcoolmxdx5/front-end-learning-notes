<template>
  <VFocus v-color="{ background: 'red' }"></VFocus>
  <div v-example:foo.bar="baz"></div>
  <ElCard class="box-card" header="DirectiveHook">
    <div>(el, binding, vnode, prevVNode) => void</div>
    <div>el: T 指令绑定到的元素。这可以用于直接操作 DOM</div>
    <div>binding: DirectiveBinding&lt;V></div>
    <div>vnode: VNode&lt;any, T>&lt;/any></div>
    <div>prevVNode: Prev 之前的渲染中代表指令所绑定元素的 VNode。仅在 beforeUpdate 和 updated 钩子中可用</div>
  </ElCard>
  <ElCard class="box-card" header="ObjectDirective">
    <div>在绑定元素的 attribute 前或事件监听器应用前调用</div>
    <div>created(el, binding, vnode, prevVnode) {}</div>
    <hr />
    <div>在元素被插入到 DOM 前调用</div>
    <div>beforeMount(el, binding, vnode, prevVnode) { }</div>
    <hr />
    <div>在绑定元素的父组件及他自己的所有子节点都挂载完成后调用</div>
    <div>mounted(el, binding, vnode, prevVnode) { }</div>
    <hr />
    <div>绑定元素的父组件更新前调用</div>
    <div>beforeUpdate(el, binding, vnode, prevVnode) { }</div>
    <hr />
    <div>在绑定元素的父组件及他自己的所有子节点都更新后调用</div>
    <div>updated(el, binding, vnode, prevVnode) { }</div>
    <hr />
    <div>绑定元素的父组件卸载前调用</div>
    <div>beforeUnmount(el, binding, vnode, prevVnode) { }</div>
    <hr />
    <div>绑定元素的父组件卸载后调用</div>
    <div>unmounted(el, binding, vnode, prevVnode) { }</div>
  </ElCard>
  <ElCard class="box-card" header="DirectiveBinding">
    <div>value: V 传递给指令的值。例如在 v-my-directive="1 + 1" 中，值是 2</div>
    <div>oldValue: V | null 之前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否更改，它都可用</div>
    <div>arg?: string 传递给指令的参数 (如果有的话)。例如在 v-my-directive:foo 中，参数是 "foo"</div>
    <div>
      modifiers: Record&lt;string, boolean>
      一个包含修饰符的对象 (如果有的话)。例如在 v-my-directive.foo.bar 中，修饰符对象是 { foo: true, bar: true }
    </div>
    <div>instance: ComponentPublicInstance | null 使用该指令的组件实例</div>
    <div>dir: ObjectDirective&lt;any, V> 指令的定义对象</div>
  </ElCard>
  <ElCard class="box-card" header="other">
    <div>在setup内定义局部指令 必须以 vNameOfDirective 的形式来命名本地自定义指令，以使得它们可以直接在模板中使用</div>
    <div>当在组件上使用自定义指令时，它会始终应用于组件的根节点，和透传 attributes 类似</div>
    <div>如果你的指令需要多个值，你可以向它传递一个 JavaScript 对象字面量。别忘了，指令也可以接收任何合法的 JavaScript 表达式</div>
    <div>
      app.directive()
      如果同时传递一个名字和一个指令定义，则注册一个全局指令；
      如果只传递一个名字，则会返回用该名字注册的指令 (如果存在的话)
    </div>
    <div>简化形式: app.directive('color', (el, binding) => {
      // 这会在 `mounted` 和 `updated` 时都调用
      el.style.color = binding.value
      })
    </div>
    <div>
      type Dir = { background: string };
      const vColor: FunctionDirective = (el, binding: DirectiveBinding&lt;Dir>) => {
      el.style.background = binding.value.background
      };
    </div>
  </ElCard>
</template>

<script setup lang="ts">
import { type VNode, type ComponentPublicInstance, ref, type FunctionDirective, type CSSProperties } from 'vue'
import VFocus from './vFocus.vue'

const baz = ref(1)

setTimeout(() => {
  baz.value = 2
}, 5000)

type DirectiveModifiers = Record<string, boolean>

type DirectiveBinding<V = any> = {
  // 传递给指令的值。例如在 v-my-directive="1 + 1" 中，值是 2
  value: V
  // 之前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否更改，它都可用
  oldValue: V | null
  // 传递给指令的参数 (如果有的话)。例如在 v-my-directive:foo 中，参数是 "foo"
  arg?: string
  // 一个包含修饰符的对象 (如果有的话)。例如在 v-my-directive.foo.bar 中，修饰符对象是 { foo: true, bar: true }
  modifiers: DirectiveModifiers
  // 使用该指令的组件实例
  instance: ComponentPublicInstance | null
  // 指令的定义对象
  dir: ObjectDirective<any, V>
}

type DirectiveHook<T = any, Prev = VNode<any, T> | null, V = any> = (
  // 指令绑定到的元素。这可以用于直接操作 DOM
  el: T,
  binding: DirectiveBinding<V>,
  // 代表绑定元素的底层 VNode
  vnode: VNode<any, T>,
  // 之前的渲染中代表指令所绑定元素的 VNode。仅在 beforeUpdate 和 updated 钩子中可用
  prevVNode: Prev
) => void

interface ObjectDirective<T = any, V = any> {
  created?: DirectiveHook<T, null, V>
  beforeMount?: DirectiveHook<T, null, V>
  mounted?: DirectiveHook<T, null, V>
  beforeUpdate?: DirectiveHook<T, VNode<any, T>, V>
  updated?: DirectiveHook<T, VNode<any, T>, V>
  beforeUnmount?: DirectiveHook<T, null, V>
  unmounted?: DirectiveHook<T, null, V>
}

const vExample: ObjectDirective<HTMLDivElement> = {
  // 在绑定元素的 attribute 前或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    console.log('created', binding, vnode, prevVnode);
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {
    console.log('beforeMount', binding);
  },
  // 在绑定元素的父组件及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {
    console.log('mounted', binding);
  },
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {
    console.log('beforeUpdate', binding, vnode, prevVnode);
  },
  // 在绑定元素的父组件及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {
    console.log('updated', binding);
  },
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {
    console.log('beforeUnmount', binding);
  },
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {
    console.log('unmounted', binding);
  }
}

type Dir = { background: CSSProperties['backgroundColor'] };
const vColor: FunctionDirective = (el, binding: DirectiveBinding<Dir>) => {
  el.style.background = binding.value.background
};

</script>
