interface Options {
  timer?: number
}

class Updater {
  //存储第一次值也就是script 的hash 信息
  oldScript: string[]
  //获取新的值 也就是新的script 的hash信息
  newScript: string[]
  //小型发布订阅通知用户更新了
  dispatch: Record<string, Function[]>

  constructor(options: Options) {
    this.oldScript = []
    this.newScript = []
    this.dispatch = {}
    //初始化
    this.init()
    //轮询
    this.timing(options?.timer)
  }

  async init() {
    const html: string = await this.getHtml()
    this.oldScript = this.parserScript(html)
    console.log('oldScript', this.oldScript)
  }

  async getHtml() {
    //读取index html
    const html = await fetch('/').then((res) => res.text())
    return html
  }

  parserScript(html: string) {
    //script正则
    const reg = new RegExp(/<script(?:\s+[^>]*)?>(.*?)<\/script\s*>/gi)
    //匹配script标签
    return html.match(reg) as string[]
  }

  //发布订阅通知
  on(key: 'no-update' | 'update', fn: Function) {
    ;(this.dispatch[key] || (this.dispatch[key] = [])).push(fn)
    return this
  }

  compare(oldArr: string[], newArr: string[]) {
    const base = oldArr.length
    const arr = Array.from(new Set(oldArr.concat(newArr)))
    //如果新旧length 一样无更新
    if (arr.length === base) {
      this.dispatch['no-update'].forEach((fn) => {
        fn()
      })
    } else {
      //否则通知更新
      this.dispatch['update'].forEach((fn) => {
        fn()
      })
    }
  }

  timing(time = 10000) {
    //轮询
    setInterval(async () => {
      const newHtml = await this.getHtml()
      this.newScript = this.parserScript(newHtml)
      this.compare(this.oldScript, this.newScript)
    }, time)
  }
}

export const checkUpdate = () => {
  //实例化该类
  const updateInstance = new Updater({
    timer: 2000
  })
  //未更新通知
  updateInstance.on('no-update', () => {
    console.log('update no-----')
  })
  //更新通知
  updateInstance.on('update', () => {
    console.log('update yes-----')
  })
}
