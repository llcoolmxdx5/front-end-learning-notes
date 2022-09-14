<script setup lang="ts">
// 在模板中启用 v-focus
const vFocus = {
  mounted: (el: HTMLInputElement) => el.focus()
}
</script>

<!-- <script lang="ts">
export default {
  setup() {
    /*...*/
  },
  directives: {
    // 在模板中启用 v-focus
    focus: {
      mounted: (el: HTMLInputElement) => el.focus()
    }
  }
}
</script> -->

<template>
  <input v-focus />
</template>
