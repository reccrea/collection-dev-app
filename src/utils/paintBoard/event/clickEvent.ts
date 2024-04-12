import { paintBoard } from '@/utils/paintBoard'

export class CanvasClickEvent {
  constructor() {
    this.initClickEvent()
  }

  initClickEvent() {
    const canvas = paintBoard.canvas

    canvas?.on('mouse:down', (evt) => {
      console.log('mouse:down evt', evt)
    })

    canvas?.on('mouse:move', (evt) => {
      // console.log('mouse:move evt', evt)
    })

    canvas?.on('mouse:up', (evt) => {
      console.log('mouse:up evt', evt)
    })

    canvas?.on('mouse:dblclick', (evt) => {
      console.log('mouse:dblclick evt', evt)
    })
  }
}
