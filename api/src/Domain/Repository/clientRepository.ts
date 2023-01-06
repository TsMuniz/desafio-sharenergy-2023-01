import { Client } from '../Entities/Client'

export interface IDeleteResponse {
  acknowledged: boolean
  deletedCount: number
}
export interface IUpdateResponse {
  acknowledged: boolean
  modifiedCount: number
  upsertedId: Object | null
  upsertedCount: number
  matchedCount: number
}

export interface IClientRepository {
  create: (Client: Client) => Promise<void>
  readById: (id: string) => Promise<Client>
  getAll: () => Promise<Client[]>
  update: (id: string, body: unknown) => Promise<IUpdateResponse>
  delete: (id: string) => Promise<IDeleteResponse>
}
