import { paintBoard } from '@/utils/paintBoard'
import { fabric } from 'fabric'
import { type IBoardData } from '@/store/interface'
import {
  actionHandler,
  anchorWrapper,
  polygonPositionHandler
} from '@/utils/paintBoard/element/shapeStyle/utils/shapeLine'
import { SHAPESTYLE_ELEMENT_CUSTOM_TYPE } from '@/utils/paintBoard/constant/element'

import {
  actionHandler as arrowActionHandler,
  anchorWrapper as arrowAnchorWrapper,
  pathPositionHandler
} from '@/utils/paintBoard/element/shapeStyle/utils/shapeArrow'

export const getCanvasJSON = (): Partial<IBoardData> => {
  const canvas = paintBoard?.canvas
  if (canvas) {
    return canvas.toDatalessJSON(['id', '_customType', 'perPixelTargetFind', 'objectCaching']) ?? {}
  }
  return {}
}

export const handleCanvasJSONLoaded = (canvas: fabric.Canvas) => {
  canvas.getObjects().forEach((obj) => {
    if (obj._customType === SHAPESTYLE_ELEMENT_CUSTOM_TYPE.SHAPE_LINE) {
      const points = (obj as fabric.Polyline).points as fabric.Point[]
      const lastControl = points.length - 1
      obj.controls = points.reduce(
        function (acc, point, index) {
          acc['p' + index] = new fabric.Control({
            positionHandler: polygonPositionHandler,
            actionHandler: anchorWrapper(index > 0 ? index - 1 : lastControl, actionHandler),
            actionName: 'polylineEndPoint',
            pointIndex: index
          })
          return acc
        },
        {} as Record<string, fabric.Control>
      )
    }

    if (obj._customType === SHAPESTYLE_ELEMENT_CUSTOM_TYPE.SHAPE_SINGLEARROW) {
      const paths = (obj as fabric.Path).path
      obj.controls = paths.slice(0, paths.length - 4).reduce(
        function (acc, point, index) {
          acc['p' + index] = new fabric.Control({
            positionHandler: pathPositionHandler,
            actionHandler: arrowAnchorWrapper(
              index > 0 ? index - 1 : paths.length - 5,
              arrowActionHandler
            ),
            actionName: 'pathEndPoint',
            pointIndex: index
          })
          return acc
        },
        {} as Record<string, fabric.Control>
      )
    }
  })
}
