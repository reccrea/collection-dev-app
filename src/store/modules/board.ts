import { fabric } from 'fabric'
import { defineStore } from 'pinia'
import { type BoardState } from '../interface'
import { paintBoard } from '@/utils/paintBoard'
import { ActionMode } from '@/utils/paintBoard/constant/board'
import { DrawType } from '@/utils/paintBoard/constant/draw'
import { getColorFormat, hexToRgba, getAlphaFromRgba } from '@/utils/paintBoard/common/color'

export const useBoardStore = defineStore({
  id: 'border',
  state: (): BoardState => ({
    actionMode: ActionMode.DRAW,
    drawType: DrawType.FreeStyle,
    canvasWidth: 1,
    canvasHeight: 1,

    isObjectCaching: true,

    backgroundColor: 'rgba(255, 255, 255, 1)',
    backgroundOpacity: 1
  }),
  getters: {},
  actions: {
    // 变更操作模式
    updateActionMode(mode: string | undefined) {
      paintBoard.onActionMode(mode)
    },
    updateCacheState(cacheState: boolean) {
      fabric.Object.prototype.set({
        objectCaching: cacheState
      })
      paintBoard?.canvas?.renderAll()
    },
    initBackground() {
      const backgroundColor = paintBoard?.canvas?.backgroundColor
      if (backgroundColor && typeof backgroundColor === 'string') {
        const type = getColorFormat(backgroundColor)
        if (type === 'hex') {
          const color = hexToRgba(backgroundColor)
          const opacity = getAlphaFromRgba(color)

          this.backgroundColor = color
          this.backgroundOpacity = opacity
        } else if (type === 'rgba') {
          const opacity = getAlphaFromRgba(backgroundColor)

          this.backgroundColor = backgroundColor
          this.backgroundOpacity = opacity
        }
      } else if (paintBoard?.canvas) {
        paintBoard.canvas.backgroundColor = 'rgba(255, 255, 255, 1)'
        this.backgroundColor = 'rgba(255, 255, 255, 1)'
        this.backgroundOpacity = 1
      }
    }
  },
  persist: false
})
