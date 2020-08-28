import { Request, Response } from 'express-serve-static-core'
import _ from 'lodash'

export function globalSend<T>(res: Response, status: number, data: T) { res.send({ status, data }) }

export function getCookie (req: Request) {
  return DecodeCookie(req.signedCookies.todo_token) // 获取加密cookie
}

export function CodeCookie(str: string) {
  let strRtn = "";
  for (let i = str.length - 1; i >= 0; i--) {
    strRtn += str.charCodeAt(i);
    if (i) strRtn += "a" //用a作分隔符
  }
  return strRtn
}

export function DecodeCookie(str: string) {
  let strRtn: string = '';
  let strArr: string[] = str.split('a');
  for (let i = _.size(strArr) - 1; i >= 0; i--) {
    strRtn += String.fromCharCode(eval(strArr[i]));
  }
  return strRtn;
}
