import path from 'path'

export const wrapperEnv = (envConf: Recordable): ViteEnv => {
  const ret: any = {}

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n')
    realName = realName === 'true' ? true : realName === 'false' ? false : realName
    if (envName === 'VITE_PORT') realName = Number(realName)
    if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName)
      } catch (error) {
        console.log('error', error)
      }
    }
    ret[envName] = realName
  }
  return ret
}

export const getRootPath = (...dir: string[]) => {
  return path.resolve(process.cwd(), ...dir)
}
