import { User } from '../Entities/User'

export interface IUserRepository {
  create: (user: User) => Promise<void>
  readByEmail: (id: string) => Promise<User>
}
