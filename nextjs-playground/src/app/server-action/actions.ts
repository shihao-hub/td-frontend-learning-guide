'use server'

// Server Actions（P2）：写操作的标准方式，不需要手写 API 路由
// 表单直接 action={serverAction}，或 useActionState 拿状态与结果

export interface TodoState {
  items: { id: number; text: string; done: boolean }[]
  lastMessage: string | null
}

// 模块级"数据库"（重启 dev 重置）
let todos: { id: number; text: string; done: boolean }[] = [
  { id: 1, text: '理解 Server Action', done: false },
  { id: 2, text: '用 useActionState 改造', done: false },
]
let nextId = 3

export async function getTodos(): Promise<TodoState> {
  await new Promise((r) => setTimeout(r, 300)) // 模拟查询延迟
  return { items: todos, lastMessage: null }
}

export async function addTodo(_prev: TodoState, formData: FormData): Promise<TodoState> {
  const text = String(formData.get('text') ?? '').trim()
  if (!text) return { items: todos, lastMessage: '❌ 内容不能为空' }
  await new Promise((r) => setTimeout(r, 600)) // 模拟写入延迟
  todos = [...todos, { id: nextId++, text, done: false }]
  return { items: todos, lastMessage: `✓ 已添加「${text}」` } // 返回值成为 useActionState 的新 state
}

export async function toggleTodo(_prev: TodoState, formData: FormData): Promise<TodoState> {
  const id = Number(formData.get('id'))
  todos = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
  return { items: todos, lastMessage: null }
}
