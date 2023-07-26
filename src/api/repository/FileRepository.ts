import type IFile from '../interface/IFile'
import type IFileManager from '../interface/IFileManager'
import type IFileRepository from '../interface/IFileRepository'
import type IUuidGenerator from '../interface/IUuidGenerator'
import type IOracledbDataSource from '../interface/IOracledbDataSource'

class FileRepository implements IFileRepository {
  constructor (readonly dataSource: IOracledbDataSource, readonly fileManager: IFileManager, readonly uuidGenerator: IUuidGenerator) {}

  async create (id: string, name: string, title: string, description: string, type: string, date: string, path: string): Promise<IFile> {
    const file = { id, type, date, path, name, title, description }
    await this.dataSource.insertFileRegistry(this.uuidGenerator.generate(), name, title, description, type, date, path)
    return file
  }

  async getAll (): Promise<IFile[]> {
    return await this.dataSource.getEveryFileRegistry()
  }

  async get (id: string): Promise<IFile | null> {
    const fileList = await this.dataSource.getFileBy('id', id)
    if (fileList == null) {
      return null
    }
    return fileList
  }

  async delete (id: string): Promise<IFile | null> {
    const file = await this.dataSource.getFileBy('id', id)
    if (file === undefined) {
      return null
    } else {
      await this.dataSource.deleteFileById(id)
      return file
    }
  }
}

export default FileRepository
