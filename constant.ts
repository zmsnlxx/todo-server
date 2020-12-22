const base = Number(process.env.BASE)

export const PORT = [8001, 8002, 8003][base]
export const DB_Name = ['todoDev', 'todoTest', 'todo'][base]
export const CORS_ORIGIN = ['http://localhost:8000', 'http://todotest.zmsnlxx.cn', 'http://todo.zmsnlxx.cn'][base]