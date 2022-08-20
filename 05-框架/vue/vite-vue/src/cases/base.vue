<template>
  <div @click.once="handlerClick" class="ab" :class="cls">
    aaa
    {{ message.split('') }}
  </div>
  <div v-if="flag">if</div>
  <input type="text" v-model="inputVal">
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputVal = ref('')

const message = '我是case'

const flag = true

const cls = 'a'

const handlerClick = (e: MouseEvent) => {
  console.log(e.detail);
  inputVal.value = 'acv'
}

</script>

<style scoped lang="less">
.a {
  text-align: center;
}
</style>
