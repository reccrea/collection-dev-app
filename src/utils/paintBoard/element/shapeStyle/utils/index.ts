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

// 计算平行四边形的路径
export const calculateParallelagonPath = (
  startX: number,
  startY: number,
  endX: number,
  endY: number
) => {
  const points = [
    {
      x: startX,
      y: startY
    },
    {
      x: endX,
      y: startY
    },
    {
      x: endX + 100,
      y: endY
    },
    {
      x: startX + 100,
      y: endY
    }
  ]

  return points
}

// 计算梯形的路径
export const calculateTrapezoidPath = (
  startX: number,
  startY: number,
  endX: number,
  endY: number
) => {
  const width = Math.abs(endX - startX)
  const height = Math.abs(endY + 10 - startY)

  // 顶部比底部窄多少
  const narrowerFactor = 0.5
  const topWidth = width * narrowerFactor
  const bottomWidth = width

  const leftX = startX < endX ? startX : endX
  const topY = startY < endY ? startY : endY

  const points = [
    {
      // Top left
      x: leftX + (bottomWidth - topWidth) / 2,
      y: topY
    },
    {
      // Top right
      x: leftX + (bottomWidth + topWidth) / 2,
      y: topY
    },
    {
      // Bottom right
      x: leftX + bottomWidth,
      y: topY + height
    },
    {
      // Bottom left
      x: leftX,
      y: topY + height
    }
  ]

  return points
}

// 计算菱形的路径
export const calculateDiamondPath = (
  startX: number,
  startY: number,
  endX: number,
  endY: number
) => {
  const centerX = (startX + endX) / 2
  const centerY = (startY + endY) / 2

  const width = Math.abs(endX - startX)
  const height = Math.abs(endY - startY)

  const points = [
    {
      // Top
      x: centerX,
      y: centerY - height / 2
    },
    {
      // Right
      x: centerX + width / 2,
      y: centerY
    },
    {
      // Bottom
      x: centerX,
      y: centerY + height / 2
    },
    {
      // Left
      x: centerX - width / 2,
      y: centerY
    }
  ]

  return points
}

// 计算五边形路径
export const calculatePentagonPath = (
  startX: number,
  startY: number,
  endX: number,
  endY: number
) => {
  const points: any[] = []
  const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2))

  for (let i = 0; i < 5; i++) {
    // 计算正五边形的顶点

    // 减去Math.PI/2以使第一个点在顶部
    const angle = (2 * Math.PI * i) / 5 - Math.PI / 2
    const x = startX + radius * Math.cos(angle)
    const y = startY + radius * Math.sin(angle)
    points.push({ x, y })
  }

  return points
}

// 计算五角星路径
export const calculateStarPath = (startX: number, startY: number, endX: number, endY: number) => {
  const points: any = []
  const outRadius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2))
  const angle = Math.PI / 5
  for (let i = 0; i < 2 * 5; i++) {
    const radius = i % 2 === 0 ? outRadius : outRadius / 2
    const x = startX + Math.cos(i * angle) * radius
    const y = startY + Math.sin(i * angle) * radius
    points.push({ x: x, y: y })
  }
  return points
}

export const calculateGapCirclePath = (
  startPointX: number,
  startPointY: number,
  endPointX: number,
  endPointY: number
) => {
  const radius = Math.sqrt(
    Math.pow(endPointX - startPointX, 2) + Math.pow(endPointY - startPointY, 2)
  )

  const startAngle = 0
  // 270度，即四分之三的圆
  const endAngle = Math.PI * 1.5

  const startX = startPointX + radius * Math.cos(startAngle)
  const startY = startPointY + radius * Math.sin(startAngle)
  const endX = startPointX + radius * Math.cos(endAngle)
  const endY = startPointY + radius * Math.sin(endAngle)

  // 更新路径数据，包括圆弧和两条连接到圆心的线
  const pathData = [
    'M',
    startPointX,
    startPointY,
    'L',
    startX,
    startY,
    'A',
    radius,
    radius,
    0,
    1,
    1,
    endX,
    endY,
    'L',
    startPointX,
    startPointY,
    'Z'
  ].join(' ')

  return pathData
}
