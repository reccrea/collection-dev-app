declare interface ViteEnv {
  VITE_USER_NODE_ENV: 'development' | 'production' | 'test'
  VITE_PORT: number
  VITE_OPEN: boolean
  VITE_REPORT: boolean
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'gzip,brotli' | 'none'
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
  VITE_DROP_CONSOLE: boolean
  VITE_PUBLIC_PATH: string
  VITE_DROP_SOURCEMAP: boolean
  VITE_CDN: boolean
}

declare type Recordable<T = any> = Record<string, T>

declare module 'vite-plugin-eslint' {
  const content: any
  export = content
}

declare module 'fabric-with-erasing'

import { Object as FabricObject, IAllFilters } from 'fabric/fabric-impl'

declare module 'fabric/fabric-impl' {
  export interface Object {
    id: string
    _customType: string
    __corner: number
    toObject_original: FabricObject.toObject
  }

  export interface Canvas {
    upperCanvasEl?: HTMLCanvasElement
    contextTop: CanvasRenderingContext2D
    _onMouseDownInDrawingMode: any
    _onMouseMoveInDrawingMode: any
    _onMouseUpInDrawingMode: any
    _currentTransform: any
  }

  export interface IAllFilters {
    BlackWhite: {
      new (options?: any): IBaseFilter
    }
    Vintage: {
      new (options?: any): IBaseFilter
    }
    Brownie: {
      new (options?: any): IBaseFilter
    }
    Kodachrome: {
      new (options?: any): IBaseFilter
    }
    Polaroid: {
      new (options?: any): IBaseFilter
    }
    Technicolor: {
      new (options?: any): IBaseFilter
    }
  }

  export interface IText {
    _textBeforeEdit: string
  }

  export interface Path {
    lineCoords: any
    path: {
      0: string
      1: number
      2: number
    }[]
    _setPath: (
      path:
        | string
        | {
            0: string
            1: number
            2: number
          }[],
      options?: IPathOptions
    ) => void
  }

  export interface Polyline {
    _setPositionDimensions: (options: IObjectOptions) => void
  }

  export interface Control {
    pointIndex: number
  }
}
