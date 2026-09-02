// mock API：模拟后端接口（延迟、可注入故障），SWR 的 fetcher 直接调这些函数
// 真实项目里 fetcher 是 fetch('/api/xxx')——数据流完全一样（见 nextjs-playground 的 BFF 演示）

export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
}

// 内存"数据库"：mutate 演示会改它
let users: User[] = [
  { id: 1, name: 'shawn', email: 'shawn@example.com', role: 'admin' },
  { id: 2, name: 'alice', email: 'alice@example.com', role: 'editor' },
  { id: 3, name: 'bob', email: 'bob@example.com', role: 'viewer' },
  { id: 4, name: 'charlie', email: 'charlie@example.com', role: 'viewer' },
]

let failureRate = 0 // 0~1：模拟网络抖动
let requestCount = 0

export const stats = {
  get count() {
    return requestCount
  },
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function simulate<T>(data: T, ms = 600): Promise<T> {
  requestCount++
  await delay(ms)
  if (Math.random() < failureRate) throw new Error('网络错误（模拟抖动）')
  return structuredClone(data) // 返回副本，逼着上层用 SWR 的方式更新
}

// ---- API：list / detail / create / rename ----

export async function fetchUsers(): Promise<User[]> {
  return simulate(users)
}

export async function fetchUser(id: number): Promise<User> {
  const u = users.find((u) => u.id === id)
  if (!u) throw new Error(`用户 ${id} 不存在`)
  return simulate(u)
}

export async function renameUser(id: number, name: string): Promise<User> {
  const u = users.find((u) => u.id === id)
  if (!u) throw new Error(`用户 ${id} 不存在`)
  u.name = name
  return simulate(u, 400)
}

export async function addUser(name: string): Promise<User> {
  const u: User = { id: Date.now(), name, email: `${name}@example.com`, role: 'viewer' }
  users.push(u)
  return simulate(u, 400)
}

// ---- 故障注入控制（05 演示重试/错误界面用） ----

export function setFailureRate(rate: number) {
  failureRate = rate
}
