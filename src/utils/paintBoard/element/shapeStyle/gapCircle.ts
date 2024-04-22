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
import { calculateGapCirclePath } from '@/utils/paintBoard/element/shapeStyle/utils'

// 缺口圆
export class GapCircle {
  shapeInstance: fabric.Path | undefined
  startX = 0
  startY = 0

  constructor(point: fabric.Point | undefined) {
    if (!point) {
      return
    }

    this.startX = point.x
    this.startY = point.y

    const strokeWidth = getShapeBorderWidth()

    const pathStr = calculateGapCirclePath(
      this.startX,
      this.startY,
      this.startX + 10,
      this.startY + 10
    )

    const shape = new fabric.Path(pathStr, {
      stroke: useShapeDrawStore().borderColor,
      strokeWidth,
      originX: 'center',
      originY: 'center',
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

    setObjectAttr(shape, SHAPESTYLE_ELEMENT_CUSTOM_TYPE.SHAPE_GAPCIRCLE)
  }

  addPosition(point: fabric.Point | undefined) {
    if (!point || !this.shapeInstance) {
      return
    }
    const { x: moveToX, y: moveToY } = new fabric.Point(point.x, point.y)

    const paths = calculateGapCirclePath(this.startX, this.startY, moveToX, moveToY)

    this.shapeInstance._setPath(paths)
    paintBoard.canvas?.requestRenderAll()
  }

  destroy() {
    if (this.shapeInstance) {
      paintBoard.canvas?.remove(this.shapeInstance)
    }
  }
}
