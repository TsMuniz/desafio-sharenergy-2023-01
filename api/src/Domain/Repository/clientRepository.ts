import { Client } from '../Entities/Client'

export interface IClientRepository {
  create: (Client: Client) => Promise<void>
  readByEmail: (email: string) => Promise<Client>
  getAll: () => Promise<Client[]>
  update: (id: string, body: unknown) => Promise<void>
  delete: (id: string) => Promise<void>
}