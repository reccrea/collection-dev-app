<template>
  <canvas
    ref="canvasRef"
    width="800"
    height="800"
    id="sketchPad"
    style="border: 1px solid #ccc"
  ></canvas>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { paintBoard } from '@/utils/paintBoard'

const canvasRef = ref<HTMLCanvasElement>()

onMounted(async () => {
  // 初始化画板
  await paintBoard.initCanvas(canvasRef.value as HTMLCanvasElement)
})
</script>

<style lang="less" scoped></style>
