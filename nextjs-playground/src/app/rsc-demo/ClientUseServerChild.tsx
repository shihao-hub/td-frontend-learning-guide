'use client'

// 服务端函数作为 props 传进客户端组件（Server Reference 模式）
// 对比：直接传普通 async 函数会报错——'use server' 让 React 把它注册为可远程调用的引用

import { useState } from 'react'
import getServerTime from './getServerTime'

export default function ClientUseServerChild() {
  const [time, setTime] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onClick = async () => {
    setLoading(true)
    try {
      setTime(await getServerTime()) // 看似本地调用，实际 RPC 回 Node 执行
    } finally {
      setLoading(false)
    }
  }

  return (
    <p className="row">
      <span className="badge client">Client</span>
      <span className="muted">服务端时间：{time ?? '（未获取）'}</span>
      <button onClick={onClick} disabled={loading}>
        {loading ? '调用中…' : '调用服务端函数'}
      </button>
    </p>
  )
}
