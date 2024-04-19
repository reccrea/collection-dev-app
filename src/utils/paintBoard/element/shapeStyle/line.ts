import { fabric } from 'fabric'
import { paintBoard } from '@/utils/paintBoard'
import {
  getShapeBorderWidth,
  getShapeBorderType,
  setObjectAttr
} from '@/utils/paintBoard/common/draw'
import { useShapeDrawStore } from '@/store/modules/shapeDraw'
import { SHAPESTYLE_ELEMENT_CUSTOM_TYPE } from '@/utils/paintBoard/constant/element'
import {
  actionHandler,
  anchorWrapper,
  polygonPositionHandler
} from '@/utils/paintBoard/element/shapeStyle/utils/shapeLine'

// 直线
export class Line {
  shapeInstance: fabric.Polyline | undefined
  startX = 0
  startY = 0

  constructor(point: fabric.Point | undefined) {
    if (!point) {
      return
    }

    this.startX = point.x
    this.startY = point.y

    const strokeWidth = getShapeBorderWidth()

    const points = []
    for (let i = 0; i < 2; i++) {
      points.push({
        x: this.startX,
        y: this.startY
      })
    }

    const line = new fabric.Polyline(points, {
      stroke: useShapeDrawStore().borderColor,
      strokeWidth,
      originX: 'center',
      originY: 'center',
      strokeDashArray: getShapeBorderType(strokeWidth + 5),
      strokeLineCap: 'round',
      fill: 'transparent',
      objectCaching: false,
      // 默认false
      // 当设置为true，对象的检测会以像素点为基础，而不是以边界的盒模型为基础
      perPixelTargetFind: false
    })

    paintBoard.canvas?.add(line)
    this.shapeInstance = line

    setObjectAttr(line, SHAPESTYLE_ELEMENT_CUSTOM_TYPE.SHAPE_LINE)
  }

  addPosition(point: fabric.Point | undefined) {
    if (!point || !this.shapeInstance) {
      return
    }

    const points = this.shapeInstance.points as fabric.Point[]
    const len = points.length
    const averageX = (point.x - this.startX) / (len - 1)
    const averageY = (point.y - this.startY) / (len - 1)
    for (let index = 1; index < len; index++) {
      points[index] = {
        x: Math.round(this.startX + averageX * index),
        y: Math.round(this.startY + averageY * index)
      } as fabric.Point
    }

    this.shapeInstance.set({
      points
    })

    this.shapeInstance.setCoords()
    paintBoard.canvas?.requestRenderAll()
  }

  mouseUp() {
    if (!this.shapeInstance) {
      return
    }

    const points = this.shapeInstance.points as fabric.Point[]
    const lastControl = points.length - 1
    this.shapeInstance.controls = points.reduce(
      function (acc, point, index) {
        acc['p' + index] = new fabric.Control({
          positionHandler: polygonPositionHandler,
          actionHandler: anchorWrapper(index > 0 ? index - 1 : lastControl, actionHandler),
          actionName: 'polylineEndPoint',
          pointIndex: index
        })
        return acc
      },
      {} as Record<string, fabric.Control>
    )

    this.shapeInstance._setPositionDimensions({})
    this.shapeInstance.setCoords()
  }

  destroy() {
    if (this.shapeInstance) {
      paintBoard.canvas?.remove(this.shapeInstance)
    }
  }
}
