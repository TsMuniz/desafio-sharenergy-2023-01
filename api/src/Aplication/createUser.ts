import { User } from '../Domain/Entities/User'
import { IUserRepository } from '../Domain/Repository/userRepository'

export class CreateUser {
  constructor (readonly userRepository: IUserRepository) {
  }

  async execute (input: User): Promise<void> {
    const { name, email, password } = input
    const user = new User({ name, email, password })
    await this.userRepository.create(user)
  }
}
