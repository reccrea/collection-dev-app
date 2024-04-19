import { useFreeDrawStore } from '@/store/modules/freeDraw'
import { useShapeDrawStore } from '@/store/modules/shapeDraw'
import { paintBoard } from '@/utils/paintBoard'
import { v4 as uuidv4 } from 'uuid'
import { ShapeBorderType, ShapeFillType } from '@/utils/paintBoard/constant/shape'

// 获取画板宽度
export const getDrawWidth = (width?: number) => {
  return (width ?? useFreeDrawStore().drawWidth) / (paintBoard.canvas?.getZoom() ?? 1)
}

// 获取橡皮擦宽度
export const getEraserWidth = (width?: number) => {
  return (width ?? useFreeDrawStore().eraserWidth) / (paintBoard.canvas?.getZoom() ?? 1)
}

// 获取阴影宽度
export const getShadowWidth = (width?: number) => {
  return (width ?? useFreeDrawStore().shadowWidth) / (paintBoard.canvas?.getZoom() ?? 1)
}

export const setObjectAttr = (obj: fabric.Object, type: string) => {
  const id = uuidv4()
  obj.set({
    id,
    _customType: type
  } as any)
}

// 获取形状的宽度
export const getShapeBorderWidth = () => {
  const borderWidth = useShapeDrawStore().borderWidth
  return borderWidth
}

// 获取形状的边框类型
export const getShapeBorderType = (base = 5) => {
  const borderType = useShapeDrawStore().borderType
  const value = Math.round(base)

  switch (borderType) {
    case ShapeBorderType.Dashed:
      return [value * 3, value * 2]
    case ShapeBorderType.Dotted:
      return [value, value * 3]
    default:
      return undefined
  }
}

// 获取形状的填充
export const getShapeFillStyle = () => {
  switch (useShapeDrawStore().fillType) {
    case ShapeFillType.Transparent:
      return 'transparent'
    case ShapeFillType.Full:
      return useShapeDrawStore().fillColor
    default:
      return undefined
  }
}
