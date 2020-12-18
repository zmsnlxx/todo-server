import mongoose from 'mongoose'
import { UserDocument } from '../types'
const dbName = process.env.NODE_ENV === 'production' ? 'todo' : 'todoTest'

mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`, (err: any) => { console.log(`数据库连接${err ? '失败' : '成功'}`) });

// 用户信息表
const User = new mongoose.Schema({
  name: String,
  password: String,
  img: String,
  todo: Object,
  birthday: String,
  gender: String,
  region: String,
  regionName: String,
});

const db = {
  User: mongoose.model<UserDocument>("User", User)
};
export default db
