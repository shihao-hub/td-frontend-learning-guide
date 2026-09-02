'use client'

// BFF 页面：客户端组件用 SWR 调同源 /api/users —— creativault 页面的标准形态
// 注意：请求路径是相对的 /api/*（同源），没有跨域、没有暴露后端地址

import useSWR from 'swr'
import { useState } from 'react'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function ApiDemoPage() {
  const { data, error, isLoading, mutate } = useSWR<{ data: { id: number; name: string; email: string }[] }>(
    '/api/users',
    fetcher,
  )
  const [name, setName] = useState('')
  const [serverTime, setServerTime] = useState('')

  const callTime = async () => {
    const r = await fetch('/api/time')
    const j = (await r.json()) as { now: string }
    setServerTime(j.now)
  }

  const addUser = async () => {
    if (!name.trim()) return
    setName('')
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    mutate() // 让 SWR 重新拉列表（swr-playground/03 的知识在这用上了）
  }

  return (
    <div>
      <section className="card">
        <h2>① SWR + /api/users（Route Handler）</h2>
        {isLoading ? (
          <p className="muted">加载中…</p>
        ) : error ? (
          <p style={{ color: '#dc2626' }}>出错了：{String(error)}</p>
        ) : (
          <ul>
            {data?.data.map((u) => (
              <li key={u.id}>
                {u.name} <span className="muted">{u.email}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="row" style={{ marginTop: 8 }}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="新用户名" />
          <button className="primary" onClick={addUser}>
            POST /api/users
          </button>
        </div>
        <p className="muted">Network 面板看请求：同源 /api/*，参数与响应都在 BFF 层收口</p>
      </section>

      <section className="card">
        <h2>② 动态接口 /api/time</h2>
        <div className="row">
          <button onClick={callTime}>GET /api/time</button>
          {serverTime && <span className="badge">{serverTime}</span>}
        </div>
      </section>
      {/* TODO(练习)1: 加删除功能：route.ts 增加 DELETE 方法（body 传 id），页面加删除按钮 + mutate */}
    </div>
  )
}
