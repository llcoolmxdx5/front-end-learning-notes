<template>
  <TreeItem :data="data"></TreeItem>
  <ElCard header="递归组件" class="box-card">
    <div>一个单文件组件可以通过它的文件名被其自己所引用。例如：名为 FooBar.vue 的组件可以在其模板中用 &lt;FooBar/> 引用它自己。</div>
    <div>请注意这种方式相比于导入的组件优先级更低。如果有具名的导入和组件自身推导的名字冲突了，可以为导入的组件添加别名</div>
    <div>在 3.2.34 或以上的版本中，使用 &lt;script setup> 的单文件组件会自动根据文件名生成对应的 name 选项，即使是在配合 &lt;KeepAlive> 使用时也无需再手动声明。</div>
    <div>可使用 选项式API name 属性使你可以覆盖推导出的名称，或是在没有推导出名字时显式提供一个。</div>
  </ElCard>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import TreeItem from './TreeItem.vue'

export type TreeList = {
  name: string;
  icon?: string;
  children?: TreeList[];
};

const data = reactive<TreeList[]>([
  {
    name: "no.1",
    children: [
      {
        name: "no.1-1",
        children: [
          {
            name: "no.1-1-1",
          },
        ],
      },
    ],
  },
  {
    name: "no.2",
    children: [
      {
        name: "no.2-1",
      },
    ],
  },
  {
    name: "no.3",
  },
]);
</script>
