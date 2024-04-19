import { useFreeDrawStore } from '@/store/modules/freeDraw'
import { setObjectAttr } from '@/utils/paintBoard/common/draw'
import { paintBoard } from '@/utils/paintBoard'
import { fabric } from 'fabric'
import { FREESTYLE_ELEMENT_CUSTOM_TYPE } from '@/utils/paintBoard/constant/element'

let colorDeg = 0

export class Rainbow {
  points: fabric.Point[] = []
  group: fabric.Group

  constructor() {
    const group = new fabric.Group([], {
      perPixelTargetFind: false
    })
    paintBoard.canvas?.add(group)
    this.group = group

    setObjectAttr(group, FREESTYLE_ELEMENT_CUSTOM_TYPE.RAINBOW)
  }

  addPosition(point: fabric.Point | undefined) {
    if (!point) {
      return
    }

    const newPoint = new fabric.Point(point.x, point.y)
    this.points.push(newPoint)
    if (this.points.length < 2) {
      return
    }

    this.group.addWithUpdate(drawRainbow(this.points))
    paintBoard.canvas?.requestRenderAll()
  }

  destroy() {
    paintBoard.canvas?.remove(this.group)
  }
}

const drawRainbow = (points: fabric.Point[]) => {
  const strokeWidth = Math.ceil(useFreeDrawStore().drawWidth / (paintBoard.canvas?.getZoom() ?? 1))
  colorDeg = colorDeg < 360 ? colorDeg + 1 : 0

  const curX = points[points.length - 1].x
  const curY = points[points.length - 1].y
  const lastX = points[points.length - 2].x
  const lastY = points[points.length - 2].y

  const line = new fabric.Line([lastX, lastY, curX, curY], {
    stroke: `hsl(${colorDeg}, 90%, 50%)`,
    strokeWidth: strokeWidth,
    originX: 'center',
    originY: 'center'
  })

  return line
}
