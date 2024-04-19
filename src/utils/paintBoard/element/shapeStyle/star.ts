import { fabric } from 'fabric'
import { paintBoard } from '@/utils/paintBoard'
import {
  getShapeBorderWidth,
  getShapeBorderType,
  setObjectAttr
} from '@/utils/paintBoard/common/draw'
import { useShapeDrawStore } from '@/store/modules/shapeDraw'
import { SHAPESTYLE_ELEMENT_CUSTOM_TYPE } from '@/utils/paintBoard/constant/element'

// 五角星
export class Star {
  shapeInstance: fabric.Polygon | undefined
  startX = 0
  startY = 0

  constructor(point: fabric.Point | undefined) {
    if (!point) {
      return
    }

    this.startX = point.x
    this.startY = point.y

    const strokeWidth = getShapeBorderWidth()
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
