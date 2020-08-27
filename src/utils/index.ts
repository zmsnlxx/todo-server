import { Response } from 'express-serve-static-core'

export function globalSend<T>(res: Response, status: number, data: T) { res.send({ status, data }) }
