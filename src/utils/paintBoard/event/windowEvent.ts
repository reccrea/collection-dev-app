// import { fabric } from 'fabric'
import { paintBoard } from '@/utils/paintBoard'
import { KeyCode } from '@/utils/paintBoard/constant/event'

export class WindowEvent {
  constructor() {
    this.initWindowEvent()
  }

  initWindowEvent() {
    window.addEventListener('keydown', this.keydownFn)
    window.addEventListener('keyup', this.keyupFn)
    window.addEventListener('paste', this.pasteFn)
    window.addEventListener('resize', this.resizeFn)
    window.addEventListener('orientationchange', this.resizeFn)
  }

  removeWindowEvent() {
    window.removeEventListener('keydown', this.keydownFn)
    window.removeEventListener('keyup', this.keyupFn)
    window.removeEventListener('paste', this.pasteFn)
    window.removeEventListener('resize', this.resizeFn)
    window.removeEventListener('orientationchange', this.resizeFn)
  }

  keydownFn(e: KeyboardEvent) {
    // const canvas = paintBoard?.canvas
    switch (e.code) {
      // 空格键
      case KeyCode.SPACE:
        paintBoard?.evnt?.clickEvent.setSpaceKeyDownState(true)
        /* if (canvas) {
          canvas.defaultCursor = 'pointer'
          canvas.isDrawingMode = false
          canvas.selection = false
          fabric.Object.prototype.set({
            selectable: false,
            hoverCursor: 'pointer'
          })
        } */
        break
      // 删除键
      case KeyCode.BACKSPACE:
        paintBoard.deleteObject()
        break
      default:
        break
    }
  }

  keyupFn(e: KeyboardEvent) {
    if (e.code === KeyCode.SPACE) {
      paintBoard.evnt?.clickEvent.setSpaceKeyDownState(false)
    }
  }

  pasteFn(e: ClipboardEvent) {
    if (e.clipboardData && e.clipboardData.items) {
      return
    }
  }

  resizeFn() {}
}
