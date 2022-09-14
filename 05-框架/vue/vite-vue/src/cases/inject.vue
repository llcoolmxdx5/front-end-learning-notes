<template>
  <div>
    <button @click="updateLocation">{{ location }}</button>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { locationKey } from './provide'

const { location, updateLocation } = inject(locationKey)!
</script>
