import { defineStore } from 'pinia'
import { type FreeDrawState } from '../interface'
import { DrawStyle } from '@/utils/paintBoard/constant/draw'

export const useFreeDrawStore = defineStore({
  id: 'freeDraw',
  state: (): FreeDrawState => ({
    // 绘画风格
    drawStyle: DrawStyle.Basic,
    // 画笔宽度
    drawWidth: 2.5,
    // 画笔颜色
    drawColor: '#f26500',
    // 颜色组
    drawColorArray: ['#000000', '#f26500'],
    // 橡皮擦宽度
    eraserWidth: 10,
    // 阴影宽度
    shadowWidth: 0,
    // 阴影颜色
    shadowColor: '#000000'
  }),
  getters: {},
  actions: {},
  persist: false
})
