import { fabric } from 'fabric'

import { CanvasEvent } from './event'

import { renderPencilBrush } from './draw/pencil'
import { renderEraserBrush } from './draw/eraser'

class PaintBoard {
  canvas: fabric.Canvas | null = null
  evnt: CanvasEvent | null = null

  constructor() {}

  // 初始化画板
  initCanvas(canvasEl: HTMLCanvasElement) {
    return new Promise<boolean>((resolve) => {
      // defaultCursor：默认光标，即（默认值：default）
      // hoverCursor：鼠标移动到对象上的样式（默认值：move）
      // moveCursor：对象拖动时的鼠标样式（默认值：move）
      // freeDrawingCursor：自由绘制时的鼠标样式（默认值：crosshair）
      // rotationCursor：旋转时的鼠标样式（默认值：crosshair）

      this.canvas = new fabric.Canvas(canvasEl, {
        // 画布背景色
        backgroundColor: 'transparent',

        // 画布鼠标框选时的背景色
        selectionColor: 'rgba(101, 204, 138, 0.3)',

        // 画布是否可选中。默认true；false 不可选中
        // selection: true,
        // 画布鼠标框选时的边框颜色
        // selectionBorderColor: '#1d2786',
        // 画布鼠标框选时的边框厚度
        // selectionLineWidth: 6,
        // 画布鼠标框选时边框虚线规则
        // selectionDashArray: [30, 4, 10],
        // 只选择完全包含在拖动选择矩形中的形状
        // selectionFullyContained: true,

        // 元素对象被选中时保持在当前z轴，不会跳到最顶层，默认是false
        preserveObjectStacking: true,
        // 画布按devicePixelRatio缩放，以便在视网膜屏幕上更好地呈现，默认是true
        enableRetinaScaling: true
      })

      // 画的图形被框选，选中后，图形框选的框样式
      fabric.Object.prototype.set({
        borderColor: '#65CC8A',
        cornerColor: '#65CC8A',
        cornerStyle: 'circle',
        borderDashArray: [3, 3],
        transparentCorners: false
      })

      fabric.Line.prototype.strokeLineJoin = 'round'
      fabric.Line.prototype.strokeLineCap = 'round'

      // 初始化事件，比说点击或者缩放事件
      this.evnt = new CanvasEvent()

      // 处理画板操作模式
      this.handleModel()

      resolve(true)
    })
  }

  // 清除画板
  removeCanvas() {
    if (this.canvas) {
      this?.canvas?.dispose()
      this.evnt?.removeEvent()
      this.canvas = null
    }
  }

  /* 
    操作模式

    绘画 DRAW
    橡皮擦 ERASE
    选择 SELECT
  */
  handleModel(actionModel = 'SELECT') {
    if (!this.canvas) return

    let isDrawingMode = false
    let selection = false

    const objectSet: Partial<fabric.IObjectOptions> = {
      selectable: false,
      hoverCursor: 'default'
    }

    switch (actionModel) {
      // 绘画
      case 'DRAW':
        isDrawingMode = true
        selection = false

        this.handleDrawStyle()

        // 从 canvas 中移除该对象，并且清空选中对象的引用。如果没有选中对象，则不会有任何操作
        this.canvas.discardActiveObject()

        break

      // 橡皮擦
      case 'ERASE':
        isDrawingMode = true
        selection = false

        renderEraserBrush()

        this.canvas.discardActiveObject()

        break

      // 选择
      case 'SELECT':
        isDrawingMode = false
        selection = true

        objectSet.selectable = true
        objectSet.hoverCursor = undefined

        break

      default:
        break
    }

    this.canvas.isDrawingMode = isDrawingMode
    this.canvas.selection = selection

    fabric.Object.prototype.set(objectSet)

    // 异步的，在下一次浏览器的重绘周期中重新渲染画布
    this.canvas.requestRenderAll()
  }

  handleDrawStyle() {
    if (!this.canvas) return
    renderPencilBrush()
  }
}

export const paintBoard = new PaintBoard()
