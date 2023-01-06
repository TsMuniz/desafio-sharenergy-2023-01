import { IClient } from '../Domain/Entities/Client'
import { MongoClient } from 'mongodb'
import { IClientRepository } from '../Domain/Repository/clientRepository'
import CustomError from '../helpers/customError'

export class ClienteRepository implements IClientRepository {
  private readonly mongoClient: any
  dbName: string

  constructor (dbName: string, mongoClient: MongoClient) {
    this.mongoClient = mongoClient
    this.dbName = dbName
  }

  public async create (client: IClient): Promise<void> {
    const db = this.mongoClient.db(this.dbName)
    await db.collection('Clients').createIndex({ cpf: 1, phoneNumber: 1, email: 1 }, { unique: true })
    try {
      const result = await db.collection('Clients').insertOne(client)
      return result
    } catch ({ code, message }) {
      if (code === 11000) throw new CustomError('Cliente já cadastrado!', 409)
      throw new CustomError('Erro inesperado!', 500)
    }
  }

  public async readByEmail (email: string): Promise<IClient> {
    const db = this.mongoClient.db(this.dbName)
    const result = await db.collection('Clients').findOne({ email })
    return result
  }

  public async getAll (): Promise<IClient[]> {
    const db = this.mongoClient.db(this.dbName)
    const result: IClient[] = []
    await db.collection('Clients').find().forEach((doc: IClient) => {
      const { _id, name, phoneNumber, cpf, address, email } = doc
      result.push({ id: _id?.toHexString(), name, phoneNumber, cpf, address, email })
    })
    return result
  }

  public async update (id: string, body: any): Promise<void> {
    const db = this.mongoClient.db(this.dbName)
    await db.collection('Clients').updateOne({ _id: id }, { $set: body })
  }

  public async delete (id: string): Promise<void> {
    const db = this.mongoClient.db(this.dbName)
    await db.collection('Clients').deleteOne({ _id: id })
  }
}
