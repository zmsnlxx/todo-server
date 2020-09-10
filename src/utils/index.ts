import { Request, Response } from 'express-serve-static-core'
import _ from 'lodash'
import { TodoItem } from '../types'
import db from '../db'

export function globalSend<T> (res: Response, status: number, data: T) { res.send({ status, data }) }

export function getCookie (req: Request) {
  return DecodeCookie(req.signedCookies.todo_token)
}

export function getCurrentUser (req: Request) {
  const cookie = DecodeCookie(req.signedCookies.todo_token) // 获取加密cookie
  return db.User.findOne({ name: cookie })
}

export function CodeCookie (str: string) {
  let strRtn = ''
  for (let i = str.length - 1; i >= 0; i--) {
    strRtn += str.charCodeAt(i)
    if (i) strRtn += 'a' //用a作分隔符
  }
  return strRtn
}

export function DecodeCookie (str: string) {
  let strRtn: string = ''
  let strArr: string[] = str.split('a')
  for (let i = _.size(strArr) - 1; i >= 0; i--) {
    strRtn += String.fromCharCode(eval(strArr[i]))
  }
  return strRtn
}

// 随机id
export function setRandomId () {
  return Date.now() + '' + Math.floor(Math.random() * 10000)
}

// 默认清单列表
// export const todo: TodoItem[] = [
//   {
//     title: '旅游清单',
//     id: setRandomId(),
//     list: [
//       { title: '我是个栗子，你可以点击我进行编辑或者删除哦', id: setRandomId(), isCarryOut: false, endTime: undefined, grade: '0', content: '' },
//       { title: '我还是个栗子，和上面一样', id: setRandomId(), isCarryOut: false, endTime: undefined, grade: '0', content: '' },
//       { title: '我也是个栗子，你猜我是不是和上面一样', id: setRandomId(), isCarryOut: false, endTime: undefined, grade: '0', content: '' },
//     ],
//   },
//   { title: '工作清单', list: [], id: setRandomId() },
//   { title: '日常清单', list: [], id: setRandomId() },
//   { title: '读书清单', list: [], id: setRandomId() },
//   { title: '人生必做100件事', list: [], id: setRandomId() },
// ]

export const todo: TodoItem = {
  [setRandomId()]: {
    title: '旅游清单', list: [
      { title: '我是个栗子，你可以点击我进行编辑或者删除哦', id: setRandomId(), isCarryOut: false, endTime: undefined, grade: '0', content: '' },
      { title: '我还是个栗子，和上面一样', id: setRandomId(), isCarryOut: false, endTime: undefined, grade: '0', content: '' },
      { title: '我也是个栗子，你猜我是不是和上面一样', id: setRandomId(), isCarryOut: false, endTime: undefined, grade: '0', content: '' },
    ],
  },
  [setRandomId()]: { title: '工作清单', list: [] },
  [setRandomId()]: { title: '日常清单', list: [] },
  [setRandomId()]: { title: '读书清单', list: [] },
  [setRandomId()]: { title: '人生必做100件事', list: [] },
}
