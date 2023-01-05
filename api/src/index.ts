import 'express-async-errors'
import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { loginRouter } from './routers/loginRouter'
import errorHandler from './helpers/errorHandler'

const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(cors())

app.use('/login', loginRouter)

app.use(errorHandler)

app.listen(port, () => console.log('online on port' + port))
