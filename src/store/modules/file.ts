import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

import { type FileState, type IBoardData } from '../interface'

const initId = uuidv4()

export const useFileStore = defineStore({
  id: 'file',
  state: (): FileState => ({
    currentId: initId,
    files: [
      {
        id: initId,
        boardData: {}
      }
    ]
  }),
  getters: {},
  actions: {
    updateBoardData(data: Partial<IBoardData>) {
      const updateIndex = this.files?.findIndex((item) => item.id == this.currentId)
      if (updateIndex > -1) {
        this.files[updateIndex].boardData = data
      }
    }
  },
  persist: false
})
