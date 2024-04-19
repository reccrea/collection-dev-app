import { CanvasClickEvent } from '@/utils/paintBoard/event/clickEvent'
import { WindowEvent } from '@/utils/paintBoard/event/windowEvent'
import { ObjectEvent } from '@/utils/paintBoard/event/objectEvent'

export class CanvasEvent {
  clickEvent: CanvasClickEvent
  windowEvent: WindowEvent
  objectEvent: ObjectEvent

  constructor() {
    const clickEvent = new CanvasClickEvent()
    this.clickEvent = clickEvent

    const windowEvent = new WindowEvent()
    this.windowEvent = windowEvent

    const objectEvent = new ObjectEvent()
    this.objectEvent = objectEvent
  }

  removeEvent() {}
}
