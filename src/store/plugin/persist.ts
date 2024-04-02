import type { Pinia } from 'pinia'
import { createPersistedState, type Serializer } from 'pinia-plugin-persistedstate'
import type { PersistedStateFactoryOptions } from 'pinia-plugin-persistedstate'
import { type Encryption, EncryptionFactory } from '@/utils/cipher'
import { cacheCipher, SHOULD_ENABLE_STORAGE_ENCRYPTION } from '@/settings/encryptionSetting'

export const PERSIST_KEY_PREFIX = 'RUSN__STORE'

const persistEncryption: Encryption = EncryptionFactory.createAesEncryption({
  key: cacheCipher.key,
  iv: cacheCipher.iv
})

/** `自定义序列化器，用于序列化和反序列化存储数据` */
const customSerializer = (shouldEnableEncryption: boolean): Serializer => {
  if (shouldEnableEncryption) {
    return {
      deserialize: (value) => {
        const decrypted = persistEncryption.decrypt(value)
        return JSON.parse(decrypted)
      },
      serialize: (value) => {
        const serialized = JSON.stringify(value)
        return persistEncryption.encrypt(serialized)
      }
    }
  } else {
    return {
      deserialize: (value) => {
        return JSON.parse(value)
      },
      serialize: (value) => {
        return JSON.stringify(value)
      }
    }
  }
}

/** `创建持久化状态选项` */
const createPersistedStateOptions = (keyPrefix: string): PersistedStateFactoryOptions => {
  return {
    storage: localStorage,
    key: (id) => `${keyPrefix}__${id.toUpperCase()}`,
    serializer: customSerializer(SHOULD_ENABLE_STORAGE_ENCRYPTION)
  }
}

/** `注册 Pinia 持久化插件` */
export const setUpPiniaPersistPlugin = (pinia: Pinia) => {
  pinia.use(createPersistedState(createPersistedStateOptions(PERSIST_KEY_PREFIX)))
}
