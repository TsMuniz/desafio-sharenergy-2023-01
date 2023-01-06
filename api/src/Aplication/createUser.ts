import { User } from '../Domain/Entities/User'
import { IUserRepository } from '../Domain/Repository/userRepository'
import bcrypt from 'bcrypt'
import Joi from 'joi'
import CustomError from '../helpers/customError'

export class CreateUser {
  constructor (readonly userRepository: IUserRepository) {
  }

  private encryptPassword (password: string): string {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
  };

  private async validate (name: string, password: string): Promise<Object | Error> {
    const schema = Joi.object({
      name: Joi.string().required(),
      password: Joi.string().min(8).required()
    })
    const { error, value } = schema.validate({ name, password })
    if (error) throw new CustomError(error.message, 400)
    return value
  }

  async execute (input: User): Promise<void> {
    const { name, password } = input
    await this.validate(name, password)
    const encryptedPassword = this.encryptPassword(password)
    const user = new User({ name, password: encryptedPassword })
    await this.userRepository.create(user)
  }
}
