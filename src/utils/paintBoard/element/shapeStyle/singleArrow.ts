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
  pathPositionHandler,
  calculateArrowSlidePath
} from '@/utils/paintBoard/element/shapeStyle/utils/shapeArrow'

// 单箭头
export class SingleArrow {
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

    let pathStr = `M ${this.startX} ${this.startY}`
    pathStr += ` L ${this.startX} ${this.startY}`

    pathStr += ` M ${this.startX} ${this.startY}`
    pathStr += ` L ${this.startX - 5} ${this.startY + 5}`
    pathStr += ` M ${this.startX} ${this.startY}`
    pathStr += ` L ${this.startX + 5} ${this.startY + 5}`

    const line = new fabric.Path(pathStr, {
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
    setObjectAttr(line, SHAPESTYLE_ELEMENT_CUSTOM_TYPE.SHAPE_SINGLEARROW)

    this.shapeInstance = line
    paintBoard.canvas?.add(this.shapeInstance)
  }

  addPosition(point: fabric.Point | undefined) {
    if (!point || !this.shapeInstance) {
      return
    }

    let paths = this.shapeInstance.path
    const len = paths.length - 4
    const averageX = (point.x - this.startX) / (len - 1)
    const averageY = (point.y - this.startY) / (len - 1)
    for (let index = 1; index < len; index++) {
      paths[index][1] = Math.round(this.startX + averageX * index)
      paths[index][2] = Math.round(this.startY + averageY * index)
    }

    paths = calculateArrowSlidePath(paths, this.startX, this.startY, point.x, point.y)

    this.shapeInstance._setPath(paths)
    paintBoard.canvas?.requestRenderAll()
  }

  mouseUp() {
    if (!this.shapeInstance) {
      return
    }

    const paths = this.shapeInstance.path
    this.shapeInstance.controls = paths.slice(0, paths.length - 4).reduce(
      function (acc, point, index) {
        acc['p' + index] = new fabric.Control({
          positionHandler: pathPositionHandler,
          actionHandler: anchorWrapper(index > 0 ? index - 1 : paths.length - 5, actionHandler),
          actionName: 'pathEndPoint',
          pointIndex: index
        })
        return acc
      },
      {} as Record<string, fabric.Control>
    )

    this.shapeInstance.setCoords()
  }

  destroy() {
    if (this.shapeInstance) {
      paintBoard.canvas?.remove(this.shapeInstance)
    }
  }
}
