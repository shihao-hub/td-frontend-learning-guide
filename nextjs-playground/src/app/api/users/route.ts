// Route Handler（P2）：app/api/users/route.ts = GET/POST /api/users
// 这就是 BFF 的雏形：浏览器只跟同源 /api/* 说话，真正的后端/密钥/凭据留在服务端

import { NextRequest, NextResponse } from 'next/server'

interface User {
  id: number
  name: string
  email: string
}

// 内存库（演示用；重启 dev server 重置）
let users: User[] = [
  { id: 1, name: 'shawn', email: 'shawn@example.com' },
  { id: 2, name: 'alice', email: 'alice@example.com' },
  { id: 3, name: 'bob', email: 'bob@example.com' },
]
let nextId = 4

export async function GET() {
  // 模拟后端延迟
  await new Promise((r) => setTimeout(r, 500))
  return NextResponse.json({ data: users })
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { name?: string }
  if (!body.name?.trim()) {
    return NextResponse.json({ error: 'name 必填' }, { status: 400 })
  }
  const user: User = { id: nextId++, name: body.name, email: `${body.name}@bff.example` }
  users = [...users, user]
  return NextResponse.json({ data: user }, { status: 201 })
}
