import { v4 as uuidv4 } from 'uuid'

import type IUuidGenerator from '../api/interface/IUuidGenerator'

class UuidGenerator implements IUuidGenerator {
  generate (): string {
    return uuidv4()
  }
}

export default UuidGenerator
