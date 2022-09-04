<template>
  <div style="margin-left:10px;" class="tree">
    <div :key="index" v-for="(item, index) in data">
      <div @click='clickItem(item)'>{{ item.name }}</div>
      <AA v-if='item?.children?.length' :data="item.children"></AA>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AA'
}
</script>

<script setup lang="ts">
import { type TreeList } from './TreeList.vue'

type Props<T> = {
  data: T[];
};

defineProps<Props<TreeList>>();

const clickItem = (item: TreeList) => {
  console.log(item)
}

</script>
