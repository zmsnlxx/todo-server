import { Document } from 'mongoose'
import mongoose from 'mongoose'
import { strict } from 'assert'
import { stringify } from 'querystring'

mongoose.connect("mongodb://127.0.0.1:27017/todoList", (err: any) => { console.log(`数据库连接${err ? '失败' : '成功'}`) });

// 用户信息表
const User = new mongoose.Schema({
  name: String,
  password: String,
  img: String,
  todo: Array,
  birthday: String,
  gender: String,
  region: String,
  regionName: String,
});

interface UserDocument extends Document {
  name: string
  password: string
  img: string
  todo: any[],
  birthday: string,
  gender: string,
  region: string,
  regionName: string
}

const db = {
  User: mongoose.model<UserDocument>("User", User)
};
export default db
