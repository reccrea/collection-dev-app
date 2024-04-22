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
import { calculateTrapezoidPath } from '@/utils/paintBoard/element/shapeStyle/utils'

// 梯形
export class Trapezoid {
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

    const points = calculateTrapezoidPath(
      this.startX,
      this.startY,
      this.startX + 10,
      this.startY + 10
    )

    const shape = new fabric.Polygon(points, {
      stroke: useShapeDrawStore().borderColor,
      strokeWidth,
      strokeDashArray: getShapeBorderType(strokeWidth),
      // 笔刷的线条结尾风格
      strokeLineCap: 'round',
      fill: getShapeFillStyle(),
      objectCaching: false,
      // 默认false
      // 当设置为true，对象的检测会以像素点为基础，而不是以边界的盒模型为基础
      perPixelTargetFind: false
    })

    this.shapeInstance = shape
    paintBoard.canvas?.add(this.shapeInstance)

    setObjectAttr(shape, SHAPESTYLE_ELEMENT_CUSTOM_TYPE.SHAPE_TRAPEZOID)
  }

  addPosition(point: fabric.Point | undefined) {
    if (!point || !this.shapeInstance) {
      return
    }

    const { x: moveToX, y: moveToY } = new fabric.Point(point.x, point.y)

    const newPoints = calculateTrapezoidPath(this.startX, this.startY, moveToX, moveToY)

    // @ts-expect-error
    this.shapeInstance.points = newPoints

    this.shapeInstance.setCoords()
    paintBoard.canvas?.requestRenderAll()
  }

  destroy() {
    if (this.shapeInstance) {
      paintBoard.canvas?.remove(this.shapeInstance)
    }
  }
}
