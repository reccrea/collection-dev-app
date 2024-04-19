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
import { calculateRightTrianglelePath } from '@/utils/paintBoard/element/shapeStyle/utils'

// 直角三角形
export class RightTriangle {
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

    // 起始点
    let pathStr = `M ${this.startX} ${this.startY}`

    // 从起始点开始，斜方向画线
    pathStr += ` L ${this.startX + 5} ${this.startY + 5}`

    // 找到直角点
    pathStr += ` M ${this.startX} ${this.startY + 5}`

    // 从直角点开始，x轴方向画线
    pathStr += ` L ${this.startX + 5} ${this.startY + 5}`

    pathStr += ` M ${this.startX} ${this.startY + 5}`

    // 从直角点开始，y轴方向画线
    pathStr += ` L ${this.startX} ${this.startY}`

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

    setObjectAttr(shape, SHAPESTYLE_ELEMENT_CUSTOM_TYPE.SHAPE_RIGHTTRIANGLE)
  }

  addPosition(point: fabric.Point | undefined) {
    if (!point || !this.shapeInstance) {
      return
    }

    const { x: moveToX, y: moveToY } = new fabric.Point(point.x, point.y)

    const paths = this.shapeInstance.path

    const newPaths = calculateRightTrianglelePath(paths, this.startX, this.startY, moveToX, moveToY)

    this.shapeInstance._setPath(newPaths)
    paintBoard.canvas?.requestRenderAll()
  }

  destroy() {
    if (this.shapeInstance) {
      paintBoard.canvas?.remove(this.shapeInstance)
    }
  }
}
