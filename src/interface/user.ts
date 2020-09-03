// 用户相关接口
import { Request, Response } from 'express-serve-static-core'
import db from '../db'
import _ from 'lodash'
import { CodeCookie, getCookie, globalSend, todo } from '../utils'
import express from 'express'

const router = express.Router()

// 登录接口
router.post('/v1/auth/login', (req: Request, res: Response) => {
  const user = db.User.findOne({ name: req.body.name })
  user.then(data => {
    if (data) {
      if (data.password === req.body.password) {
        // 设置cookie有效期，单位是秒
        res.cookie('todo_token', CodeCookie(data.name), { maxAge: 1000 * 60 * 60 * 24, signed: true })
        globalSend(res, 200, '登录成功')
      } else {
        globalSend(res, 500, '密码错误！')
      }
    } else {
      globalSend(res, 500, '账号未注册,请先注册！')
    }
  })
})

//注册接口
router.post('/v1/auth/register', (req: Request, res: Response) => {
  const currentUser = db.User.findOne({ name: req.body.name })
  currentUser.then(data => {
    if (data) {
      globalSend(res, 500, '账号已存在！')
    } else {
      const newUser = new db.User({ name: req.body.name, password: req.body.password, img: '', birthday: '', gender: '', region: '', regionName: '', todo })
      newUser.save(err => { globalSend(res, err ? 500 : 200, `账号注册${err ? '失败' : '成功'}`) })
    }
  })
})

// 获取用户信息
router.get('/v1/auth/getUserInfo', async (req: Request, res: Response) => {
  const User = db.User.findOne({ name: getCookie(req) })
  User.then(data => { globalSend(res, data ? 200 : 500, data ? _.pick(data, ['name', 'img', 'birthday', 'gender', 'region', 'regionName']) : '获取用户信息失败')})
})

// 获取用户清单列表数据
router.get('/v1/auth/getUserCheckList', async (req: Request, res: Response) => {
  const User = db.User.findOne({ name: getCookie(req) })
  User.then(data => { globalSend(res, data ? 200 : 500, data ? _.get(data, 'todo') : '获取清单列表失败')})
})

// 更改用户信息
router.post('/v1/auth/updateUserInfo', async (req: Request, res: Response) => {
  const keys = Object.keys(req.body)
  if (keys.includes('password')) {
    db.User.findOne({ name: getCookie(req) }).then(data => {
      if (data?.password !== req.body.password) {
        globalSend(res, 500, '原密码输入错误！')
      } else {
        db.User.updateOne({ name: getCookie(req) }, { $set: { password: req.body.newValue } }, err => { globalSend(res, err ? 500 : 200, `密码修改${err ? '失败' : '成功'}`) })
      }
    })
  } else {
    db.User.updateOne({ name: getCookie(req) }, { $set: req.body }, err => {globalSend(res, err ? 500 : 200, `编辑${err ? '失败' : '成功'}`)})
  }
})

export default router
