import { useBoardStore } from '@/store/modules/board'
import { paintBoard } from '@/utils/paintBoard'
import { ActionMode } from '@/utils/paintBoard/constant/board'
import { v4 as uuidv4 } from 'uuid'

export class ObjectEvent {
  constructor() {
    this.initObjectEvent()
  }

  initObjectEvent() {
    const canvas = paintBoard?.canvas

    canvas?.on('selection:created', () => {
      paintBoard.triggerHook()
    })

    canvas?.on('selection:updated', () => {
      paintBoard.triggerHook()
    })

    canvas?.on('selection:cleared', () => {
      paintBoard.triggerHook()
    })

    canvas?.on('path:created', (options) => {
      if ([ActionMode.DRAW, ActionMode.ERASE].includes(useBoardStore().actionMode)) {
        if (useBoardStore().actionMode === ActionMode.DRAW) {
          const id = uuidv4()
          ;(options as any).path.set({
            id,
            // 默认false
            // 当设置为true，对象的检测会以像素点为基础，而不是以边界的盒模型为基础
            perPixelTargetFind: false
          })
        }
        paintBoard.history?.saveState()
      }
    })

    canvas?.on('object:modified', (e) => {
      if (e.action && e.target) {
        paintBoard.history?.saveState()
      }
    })
  }
}
