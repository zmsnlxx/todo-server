import { Document } from "mongoose"

interface UserDocument extends Document {
  name: string
  password: string
  img: string
  todo: TodoItem,
  birthday: string,
  gender: string,
  region: string,
  regionName: string
}

interface TodoItem {
  [id: string]: {
    title: string
    list: TodoListItem[]
  }
}

interface TodoListItem {
  title: string
  id: string
  isCarryOut: boolean //是否已完成
  endTime: number | undefined // 结束时间(时间戳)
  grade: string // 任务等级 0： 无优先级； 1：低优先级；2：中优先级；3：高优先级
  content: string // 任务内容
}
