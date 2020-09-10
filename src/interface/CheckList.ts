// 用户相关接口
import { Request, Response } from 'express-serve-static-core'
import _ from 'lodash'
import { getCookie, getCurrentUser, globalSend, setRandomId } from '../utils'
import express from 'express'
import db from '../db'

const router = express.Router()

// 获取用户清单列表数据
router.get('/v1/list/getUserCheckList', async (req: Request, res: Response) => {
  getCurrentUser(req).then(data => { globalSend(res, data ? 200 : 501, data ? _.get(data, 'todo') : '获取用户信息失败')})
})

// 获取清单任务详情
router.get('/v1/list/getListTask', async (req: Request, res: Response) => {
  const User = getCurrentUser(req)
  User.then(data => {
    if (data) {
      const currentTodo = _.get(data.todo, req.query.parentId as string)
      const currentList = currentTodo ? currentTodo.list.find(item => item.id === req.query.id) : null
      globalSend(
        res,
        currentTodo && currentList ? 200 : 500,
        currentTodo && currentList ? currentList : '获取清单数据失败')
    } else {
      globalSend(res, 501, '获取用户信息失败')
    }
  })
})

// 编辑清单任务
router.post('/v1/list/updateListTask', async (req: Request, res: Response) => {
  if (req.body.id) {
    try {
      db.User.updateOne(
        { name: getCookie(req), [`todo.${req.body.parentId}.list.id`]: req.body.id },
        { $set: { [`todo.${req.body.parentId}.list.$`]: req.body } },
      ).then(() => {
        globalSend(res, 200, '编辑成功')
      })
    } catch (e) {
      globalSend(res, 500, '编辑失败')
    }
  } else {
    try {
      db.User.updateOne(
        { name: getCookie(req) },
        { $push: { [`todo.${req.body.parentId}.list`]: { ..._.pick(req.body, ['endTime', 'isCarryOut', 'grade', 'title', 'content']), id: setRandomId() } } },
      ).then(() => {
        globalSend(res, 200, '添加成功')
      })
    } catch (e) {
      globalSend(res, 500, '添加失败')
    }
  }
})

// 删除清单任务
router.post('/v1/list/deleteListTask', async (req: Request, res: Response) => {
  try {
    db.User.updateOne(
      { name: getCookie(req) },
      { $pull: { [`todo.${req.body.parentId}.list.id`]: req.body.id } },
    ).then(() => {
      globalSend(res, 200, '删除成功')
    })
  } catch (e) {
    globalSend(res, 500, '删除失败')
  }
})

export default router
