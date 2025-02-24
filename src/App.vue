<script setup lang="ts">
import { Button } from '@/components/ui//button'
const name = 'Leopen'
const onButtonClick = () => {
  console.log('Button clicked!')
}
</script>
<template>
  <h1 class="text-red-500">💖 Hello World, {{ name }}!</h1>
  <p>Welcome to your Electron application.</p>
  <Button @click="onButtonClick">Test shadcn-vue</Button>
</template>
