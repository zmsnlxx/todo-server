import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import http from 'http'
import user from './interface/User'
import checkList from './interface/CheckList'

const app = express()

const PORT = process.env.NODE_ENV === 'production' ? 8001 : 8002

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false, }))
// cookie加密
app.use(cookieParser('NpLRTpy1vbBzEw2JcAxpf970kOk2RViDn5wKwrMv'))

const corsOptions = { origin: '*', optionsSuccessStatus: 200, credentials: true }
app.use(cors(corsOptions))
app.get('/', (req: any, res: any) => { res.send('hello') })
app.use(user)
app.use(checkList)

console.log(process.env.NODE_ENV);

http.createServer(app).listen(PORT, () => { console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`) });
