import { fabric } from 'fabric'
import { useBoardStore } from '@/store/modules/board'
import { paintBoard } from '@/utils/paintBoard'
import { DrawStyle, DrawType } from '@/utils/paintBoard/constant/draw'
import { useShapeDrawStore } from '@/store/modules/shapeDraw'
import { ShapeStyle } from '@/utils/paintBoard/constant/shape'
import { useFreeDrawStore } from '@/store/modules/freeDraw'
import { Rainbow } from '@/utils/paintBoard/element/freeStyle/rainbow'

import { ActionMode } from '@/utils/paintBoard/constant/board'

import { Circle } from '@/utils/paintBoard/element/shapeStyle/circle'
import { Diamond } from '@/utils/paintBoard/element/shapeStyle/diamond'
import { DotLine } from '@/utils/paintBoard/element/shapeStyle/dotLine'
import { DoubleArrow } from '@/utils/paintBoard/element/shapeStyle/doubleArrow'
import { GapCircle } from '@/utils/paintBoard/element/shapeStyle/gapCircle'
import { Line } from '@/utils/paintBoard/element/shapeStyle/line'
import { Parallelagon } from '@/utils/paintBoard/element/shapeStyle/parallelagon'
import { Pentagon } from '@/utils/paintBoard/element/shapeStyle/pentagon'
import { Star } from '@/utils/paintBoard/element/shapeStyle/star'
import { Rectangle } from '@/utils/paintBoard/element/shapeStyle/rectangle'
import { RightTriangle } from '@/utils/paintBoard/element/shapeStyle/rightTriangle'
import { RoundRect } from '@/utils/paintBoard/element/shapeStyle/roundRect'
import { SingleArrow } from '@/utils/paintBoard/element/shapeStyle/singleArrow'
import { Trapezoid } from '@/utils/paintBoard/element/shapeStyle/trapezoid'
import { Triangle } from '@/utils/paintBoard/element/shapeStyle/triangle'

export class CanvasClickEvent {
  isMouseDown = false
  isSpaceKeyDown = false
  mouseDownTime = 0
  startPoint: fabric.Point | undefined
  currentElement: Rectangle | Circle | Line | SingleArrow | Rainbow | null = null

  constructor() {
    this.initClickEvent()
  }

  initClickEvent() {
    const canvas = paintBoard.canvas

    canvas?.on('mouse:down', (e) => {
      console.log('mouse:down evt', e)

      this.isMouseDown = true
      if (this.isSpaceKeyDown) {
        return
      }
      this.startPoint = e.absolutePointer

      let currentElement = null

      if (useBoardStore().actionMode === ActionMode.DRAW) {
        if (useBoardStore().drawType === DrawType.ShapeStyle) {
          // 形状绘画
          switch (useShapeDrawStore().shapeStyle) {
            // 圆形
            case ShapeStyle.Circle:
              currentElement = new Circle(e.absolutePointer)
              break

            // 菱形
            case ShapeStyle.Diamond:
              currentElement = new Diamond(e.absolutePointer)
              break

            // 虚线
            case ShapeStyle.DotLine:
              currentElement = new DotLine(e.absolutePointer)
              break

            // 双箭头
            case ShapeStyle.DoubleArrow:
              currentElement = new DoubleArrow(e.absolutePointer)
              break

            // 缺口圆
            case ShapeStyle.GapCircle:
              currentElement = new GapCircle(e.absolutePointer)
              break

            // 直线
            case ShapeStyle.Line:
              currentElement = new Line(e.absolutePointer)
              break

            // 平行四边形
            case ShapeStyle.Parallelagon:
              currentElement = new Parallelagon(e.absolutePointer)
              break

            // 五边形
            case ShapeStyle.Pentagon:
              currentElement = new Pentagon(e.absolutePointer)
              break

            // 五角星
            case ShapeStyle.Star:
              currentElement = new Star(e.absolutePointer)
              break

            // 矩形
            case ShapeStyle.Rectangle:
              currentElement = new Rectangle(e.absolutePointer)
              break

            // 直角三角形
            case ShapeStyle.RightTriangle:
              currentElement = new RightTriangle(e.absolutePointer)
              break

            // 圆角矩形
            case ShapeStyle.RoundRect:
              currentElement = new RoundRect(e.absolutePointer)
              break

            // 单箭头
            case ShapeStyle.SingleArrow:
              currentElement = new SingleArrow(e.absolutePointer)
              break

            // 梯形
            case ShapeStyle.Trapezoid:
              currentElement = new Trapezoid(e.absolutePointer)
              break

            // 三角形
            case ShapeStyle.Triangle:
              currentElement = new Triangle(e.absolutePointer)
              break

            default:
              break
          }
        } else if (useBoardStore().drawType === DrawType.FreeStyle) {
          // 自由绘画
          switch (useFreeDrawStore().drawStyle) {
            // 基础绘画——画笔
            case DrawStyle.Basic:
              this.mouseDownTime = new Date().getTime()
              break
            // 彩虹
            case DrawStyle.Rainbow:
              currentElement = new Rainbow()
              break
          }
        }
      }

      this.currentElement = currentElement
    })

    canvas?.on('mouse:move', (e) => {
      if (this.isMouseDown) {
        if (this.isSpaceKeyDown) {
          canvas.relativePan(new fabric.Point(e.e.movementX, e.e.movementY))
          return
        }
        if (useBoardStore().actionMode === ActionMode.DRAW && this.currentElement) {
          this.currentElement.addPosition(e.absolutePointer)
        }
      }
    })

    canvas?.on('mouse:up', (e) => {
      console.log('mouse:up evt', e)

      this.isMouseDown = false

      if (this.currentElement) {
        let isDestroy = false
        if (this.startPoint && e.absolutePointer) {
          const { x: startX, y: startY } = this.startPoint
          const { x: endX, y: endY } = e.absolutePointer
          if (startX === endX && startY === endY) {
            this.currentElement.destroy()
            isDestroy = true
          }
        }
        if (!isDestroy) {
          // 这里的直线和单箭头 单独处理
          if (this.currentElement instanceof Line || this.currentElement instanceof SingleArrow) {
            this.currentElement?.mouseUp()
          }
          paintBoard.history?.saveState()
        }
        this.currentElement = null
      }
    })

    canvas?.on('mouse:dblclick', (e) => {
      console.log('mouse:dblclick evt', e)

      return
    })
  }

  setSpaceKeyDownState(isSpaceKeyDown: boolean) {
    this.isSpaceKeyDown = isSpaceKeyDown
  }
}
