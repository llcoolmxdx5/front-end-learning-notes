<template>
  <slot v-if="!errorMsg"></slot>
  {{ errorMsg }}
</template>

<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue'

const errorMsg = ref('')

onErrorCaptured((err, instance, info) => {
  // 注册一个钩子，在捕获了后代组件传递的错误时调用。
  // 这个钩子可以通过返回 false 来阻止错误继续向上传递。
  // 这个钩子带有三个实参：错误对象、触发该错误的组件实例，以及一个说明错误来源类型的信息字符串
  console.log(instance?.$.type.__name, err.message, info /** setup function */);
  errorMsg.value = `${instance?.$.type.__name} ${err.message}`
  return false
})
</script>


