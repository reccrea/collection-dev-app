import { paintBoard } from '@/utils/paintBoard'
import fabric from 'fabric-with-erasing'

// 橡皮擦
export const renderEraserBrush = (width: number = 5, color: string = '#ffffff') => {
  const canvas = paintBoard.canvas
  if (!canvas) return

  const eraserBrush = new (fabric as any).EraserBrush(canvas)

  canvas.freeDrawingBrush = eraserBrush

  canvas.freeDrawingBrush.width = width

  canvas.freeDrawingBrush.color = color
}
