import { IUser } from '../Domain/Entities/User'
import { IUserRepository } from '../Domain/Repository/userRepository'
import 'dotenv/config'
import { sign } from 'jsonwebtoken'
import { Request, Response } from 'express'
import CustomError from '../helpers/customError'
import Joi from 'joi'
import bcrypt from 'bcrypt'

const secret: string = process.env.JWT_SECRET || 'fgdfgsdfghsh3132154654'

export class Login {
  constructor (readonly userRepository: IUserRepository) {
  }

  private async getUserByName (name: string): Promise<IUser> {
    const user = await this.userRepository.readByName(name)
    return user
  }

  private async createToken (user: IUser): Promise<string> {
    const { password, name } = user
    const payload = { data: { name, password } }
    const token = sign(payload, secret)
    return token
  }

  private async validate (name: string, password: string): Promise<Object | Error> {
    const schema = Joi.object({
      name: Joi.string().required(),
      password: Joi.string().min(8).required()
    })
    const { error, value } = schema.validate({ name, password })
    console.log(error)
    if (error) throw new CustomError(error.message, 400)
    return value
  }

  private decryptPassword (password: string, encryptedPassword: string): boolean {
    return bcrypt.compareSync(password, encryptedPassword)
  };

  private async checkNameAndPassword (name: string, password: string): Promise<string | Error> {
    const user = await this.getUserByName(name)
    const { name: username, password: encryptedPassword } = user
    if (
      username === name &&
      this.decryptPassword(password, encryptedPassword)
    ) {
      return await this.createToken(user)
    }
    throw new CustomError('Usuário não cadastrado.', 404)
  }

  public async execute (req: Request, res: Response): Promise<void> {
    const { name, password } = req.body
    await this.validate(name, password)
    const token = await this.checkNameAndPassword(name, password)
    res.status(200).json({ token })
  }
}
