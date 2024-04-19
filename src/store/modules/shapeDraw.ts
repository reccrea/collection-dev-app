import { defineStore } from 'pinia'
import { type ShapeDrawState } from '../interface'
import { ShapeStyle, ShapeBorderType, ShapeFillType } from '@/utils/paintBoard/constant/shape'

export const useShapeDrawStore = defineStore({
  id: 'shapeDraw',
  state: (): ShapeDrawState => ({
    // 形状
    shapeStyle: ShapeStyle.Rectangle,
    // 边框类型
    borderType: ShapeBorderType.Solid,
    // 边框颜色
    borderColor: '#000000',
    // 边框宽度
    borderWidth: 3,
    // 填充颜色
    fillColor: '#FFFFFF',
    // 填充样式
    fillType: ShapeFillType.Transparent
  }),
  getters: {},
  actions: {},
  persist: false
})
