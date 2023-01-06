import { IUser } from '../Domain/Entities/User'
import { MongoClient } from 'mongodb'
import { IUserRepository } from '../Domain/Repository/userRepository'

export class UserRepository implements IUserRepository {
  private readonly mongoClient: MongoClient
  dbName: string

  constructor (dbName: string, mongoClient: MongoClient) {
    this.mongoClient = mongoClient
    this.dbName = dbName
  }

  public async create (user: IUser): Promise<void> {
    const db = this.mongoClient.db(this.dbName)
    await db.collection('Users').insertOne(user)
    await db.collection('Users').createIndex({ name: 1 }, { unique: true })
  }

  public async readByName (input: string): Promise<IUser> {
    const db = this.mongoClient.db(this.dbName)
    const result = await db.collection('Users').findOne({ name: input }) as IUser
    const { _id, name, password } = result
    return { id: _id?.toHexString(), name, password }
  }
}
