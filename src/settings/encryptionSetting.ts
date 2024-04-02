import { isProdMode } from '@/utils/env'

// aes encryption key
export const cacheCipher = {
  key: '_11111000001111@',
  iv: '@11111000001111_'
}

export const SHOULD_ENABLE_STORAGE_ENCRYPTION = isProdMode()
