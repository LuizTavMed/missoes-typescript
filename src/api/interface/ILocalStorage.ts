import type { StorageEngine, Multer } from 'multer'

interface LocalStorage {
  readonly config: StorageEngine
  readonly upload: Multer
}

export default LocalStorage
