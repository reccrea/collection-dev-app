import { CanvasClickEvent } from './clickEvent'

export class CanvasEvent {
  // 点击事件
  clickEvent: CanvasClickEvent

  constructor() {
    const clickEvent = new CanvasClickEvent()
    this.clickEvent = clickEvent
  }

  removeEvent() {}
}
