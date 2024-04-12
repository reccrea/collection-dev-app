import { paintBoard } from '@/utils/paintBoard'
import { fabric } from 'fabric'

import { renderDrawCursor } from './cursor'

// 画笔
export const renderPencilBrush = () => {
  const canvas = paintBoard.canvas
  if (!canvas) return

  const pencilBrush = new fabric.PencilBrush(canvas)

  canvas.isDrawingMode = true

  canvas.freeDrawingBrush = pencilBrush

  // 修改笔触颜色
  canvas.freeDrawingBrush.color = 'red'

  // 修改笔触粗细
  canvas.freeDrawingBrush.width = 10

  renderDrawCursor()
}
