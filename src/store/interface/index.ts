/** `画板状态` */
export interface BoardState {
  /* 
    画板模式
    1. 绘画
    2. 橡皮擦
    3. 选择
  */
  actionMode: string
  /* 
    绘画类型
    1. 自由绘画
    2. 形状绘画
  */
  drawType: string
  // 画板宽度
  canvasWidth: number
  // 画板高度
  canvasHeight: number

  // 在存在大量绘制内容的情况下，启用缓存将提高绘制性能，而禁用缓存则会提升画布清晰度
  isObjectCaching: boolean

  backgroundColor: string
  backgroundOpacity: number
}

/** `自由绘画状态` */
export interface FreeDrawState {
  // 绘画风格
  drawStyle: string
  // 画笔宽度
  drawWidth: number
  // 画笔颜色
  drawColor: string
  drawColorArray: string[]

  // 橡皮擦宽度
  eraserWidth: number

  // 阴影宽度
  shadowWidth: number
  // 阴影颜色
  shadowColor: string
}

/** `形状绘画状态` */
export interface ShapeDrawState {
  // 形状
  shapeStyle: string
  // 边框类型
  borderType: string
  // 边框颜色
  borderColor: string
  // 边框宽度
  borderWidth: number
  // 填充颜色
  fillColor: string
  // 填充样式
  fillType: string
}

export interface IBoardData {
  version: string
  objects: fabric.Object[]
  background: string
}

interface IFile {
  id: string
  boardData: Partial<IBoardData>
}

export interface FileState {
  currentId: string
  files: IFile[]
}
