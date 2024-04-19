// 计算直角三角形的路径
export const calculateRightTrianglelePath = (
  paths: any[],
  startX: number,
  startY: number,
  endX: number,
  endY: number
) => {
  // 起始点
  paths[0] = ['M', startX, startY]
  paths[1] = ['L', endX, endY]

  // 直角点 到 x轴方向
  paths[2] = ['M', startX, endY]
  paths[3] = ['L', endX, endY]

  // 直角点 到 y轴方向
  paths[4] = ['M', startX, endY]
  paths[5] = ['L', startX, startY]

  return paths
}
