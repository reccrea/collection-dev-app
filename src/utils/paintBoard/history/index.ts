import { paintBoard } from '@/utils/paintBoard'
import { cloneDeep, omit } from 'lodash'
import { getCanvasJSON, handleCanvasJSONLoaded } from '@/utils/paintBoard/common/loadCanvas'
import { diff, unpatch, patch, type Delta } from 'jsondiffpatch'
import { type IBoardData } from '@/store/interface'
import { useFileStore } from '@/store/modules/file'

const initState = {}

export class History {
  diffs: Array<Delta> = []
  canvasData: Partial<IBoardData> = {}
  index = 0

  constructor() {
    const canvas = paintBoard.canvas
    if (canvas) {
      const canvasJson = getCanvasJSON()
      this.canvasData = {
        ...omit(canvasJson, 'objects'),
        objects: cloneDeep(canvasJson?.objects ?? [])
      }
    }
  }

  saveState() {
    const canvas = paintBoard?.canvas
    if (canvas) {
      this.diffs = this.diffs.slice(0, this.index)
      const canvasJson = getCanvasJSON()
      const delta = diff(canvasJson, this.canvasData)
      this.diffs.push(delta)

      if (this.diffs.length > 50) {
        this.diffs.shift()
      } else {
        this.index++
      }
      this.canvasData = {
        ...omit(canvasJson, 'objects'),
        objects: cloneDeep(canvasJson?.objects ?? [])
      }
      useFileStore().updateBoardData(canvasJson)
    }
  }

  /** `撤销` */
  undo() {
    const canvas = paintBoard?.canvas
    if (canvas && this.index > 0) {
      const delta = this.diffs[this.index - 1]
      this.index--
      const canvasJson = patch(this.canvasData, delta) as IBoardData
      canvas.loadFromJSON(canvasJson, () => {
        handleCanvasJSONLoaded(canvas)

        canvas.requestRenderAll()
        useFileStore().updateBoardData(canvasJson)
        this.canvasData = {
          ...omit(canvasJson, 'objects'),
          objects: cloneDeep(canvasJson?.objects ?? [])
        }
        paintBoard.triggerHook()
      })
    }
  }

  /** `恢复` */
  redo() {
    const canvas = paintBoard?.canvas
    if (this.index < this.diffs.length && canvas) {
      const delta = this.diffs[this.index]
      this.index++
      const canvasJson = unpatch(this.canvasData, delta) as IBoardData
      canvas.loadFromJSON(canvasJson, () => {
        handleCanvasJSONLoaded(canvas)
        canvas.requestRenderAll()

        useFileStore().updateBoardData(canvasJson)
        this.canvasData = {
          ...omit(canvasJson, 'objects'),
          objects: cloneDeep(canvasJson?.objects ?? [])
        }
        paintBoard.triggerHook()
      })
    }
  }

  clean() {
    paintBoard?.canvas?.clear()
    this.index = 0
    this.diffs = []
    this.canvasData = {}
    useFileStore().updateBoardData(initState)
  }

  initHistory() {
    const canvas = paintBoard.canvas
    if (canvas) {
      const canvasJson = getCanvasJSON()
      this.canvasData = canvasJson
      this.index = 0
      this.diffs = []
    }
  }
}
