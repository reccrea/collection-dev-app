import { fabric } from 'fabric'
import { paintBoard } from '@/utils/paintBoard'

// 虚线
export class DotLine {
  shapeInstance: fabric.Path | undefined
  startX = 0
  startY = 0

  constructor(point: fabric.Point | undefined) {
    if (!point) return
  }

  addPosition(point: fabric.Point | undefined) {
    if (!point || !this.shapeInstance) {
      return
    }
  }

  destroy() {
    if (this.shapeInstance) {
      paintBoard.canvas?.remove(this.shapeInstance)
    }
  }
}
