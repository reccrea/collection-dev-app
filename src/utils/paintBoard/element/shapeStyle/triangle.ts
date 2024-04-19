import { fabric } from 'fabric'
import { paintBoard } from '@/utils/paintBoard'
import { useShapeDrawStore } from '@/store/modules/shapeDraw'
import {
  getShapeBorderWidth,
  getShapeFillStyle,
  getShapeBorderType,
  setObjectAttr
} from '@/utils/paintBoard/common/draw'
import { SHAPESTYLE_ELEMENT_CUSTOM_TYPE } from '@/utils/paintBoard/constant/element'

// 三角形
export class Triangle {
  shapeInstance: fabric.Triangle | undefined
  startX = 0
  startY = 0

  constructor(point: fabric.Point | undefined) {
    if (!point) {
      return
    }

    const strokeWidth = getShapeBorderWidth()
    const shape = new fabric.Triangle({
      left: point.x,
      top: point.y,
      width: 0,
      height: 0,
      stroke: useShapeDrawStore().borderColor,
      strokeWidth,
      fill: getShapeFillStyle(),
      strokeUniform: true,
      strokeLineCap: 'round',
      strokeDashArray: getShapeBorderType(strokeWidth),
      // 默认false
      // 当设置为true，对象的检测会以像素点为基础，而不是以边界的盒模型为基础
      perPixelTargetFind: false
    })

    paintBoard.canvas?.add(shape)
    this.shapeInstance = shape
    this.startX = point.x
    this.startY = point.y
    setObjectAttr(shape, SHAPESTYLE_ELEMENT_CUSTOM_TYPE.SHAPE_TRIANGLE)
  }

  addPosition(point: fabric.Point | undefined) {
    if (!point || !this.shapeInstance) {
      return
    }
    const { x: moveToX, y: moveToY } = new fabric.Point(point.x, point.y)
    const width = Math.abs(moveToX - this.startX)
    const height = Math.abs(moveToY - this.startY)
    const left = moveToX > this.startX ? this.startX : this.startX - width
    const top = moveToY > this.startY ? this.startY : this.startY - height

    this.shapeInstance.set({
      width,
      height,
      left,
      top
    })

    this.shapeInstance.setCoords()
    paintBoard.canvas?.requestRenderAll()
  }

  destroy() {
    if (this.shapeInstance) {
      paintBoard.canvas?.remove(this.shapeInstance)
    }
  }
}
