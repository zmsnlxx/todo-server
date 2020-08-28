import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import http from 'http'
import user from './interface/user'

const app = express()

const PORT = 8001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false, }))
// cookie加密
app.use(cookieParser('NpLRTpy1vbBzEw2JcAxpf970kOk2RViDn5wKwrMv'))

const corsOptions = { origin: 'http://localhost:8080', optionsSuccessStatus: 200, credentials: true }
app.use(cors(corsOptions))
app.get('/', (req: any, res: any) => { res.send('hello') })
app.use(user)

http.createServer(app).listen(PORT, () => { console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`) });
