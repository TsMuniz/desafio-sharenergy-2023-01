import { IClient } from '../Domain/Entities/Client'
import { MongoClient } from 'mongodb'
import { IClientRepository } from '../Domain/Repository/clientRepository'

export class ClienteRepository implements IClientRepository {
  private readonly mongoClient: any
  dbName: string

  constructor (dbName: string, mongoClient: MongoClient) {
    this.mongoClient = mongoClient
    this.dbName = dbName
  }

  public async create (client: IClient): Promise<void> {
    const db = this.mongoClient.db(this.dbName)
    const result = await db.collection('clients').insertOne(client)
    return result
  }

  public async readByEmail (email: string): Promise<IClient> {
    const db = this.mongoClient.db(this.dbName)
    const result = await db.collection('clients').findOne({ email })
    return result
  }

  public async getAll (): Promise<IClient[]> {
    const db = this.mongoClient.db(this.dbName)
    const result: IClient[] = []
    await db.collection('Clients').find().forEach((doc: IClient) => {
      const { _id, name, phoneNumber, cpf, address, email } = doc
      result.push({ id: _id?.toHexString(), name, phoneNumber, cpf, address, email })
    }) as IClient
    return result
  }

  public async update (id: string, body: any): Promise<void> {
    const db = this.mongoClient.db(this.dbName)
    await db.collection('clients').updateOne({ _id: id }, { $set: body })
  }

  public async delete (id: string): Promise<void> {
    const db = this.mongoClient.db(this.dbName)
    await db.collection('clients').deleteOne({ _id: id })
  }
}
