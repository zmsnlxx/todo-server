import { Document } from "mongoose"

interface UserDocument extends Document {
  name: string
  password: string
  img: string
  todo: TodoItem[],
  birthday: string,
  gender: string,
  region: string,
  regionName: string
}

interface TodoItem {
  label: string
  id: string
  list: TodoListItem[]
}

interface TodoListItem {
  label: string
  id: string
  isCarryOut: boolean //是否已完成
  endTime: string // 结束时间
  isMark: boolean // 是否是星标任务
}
