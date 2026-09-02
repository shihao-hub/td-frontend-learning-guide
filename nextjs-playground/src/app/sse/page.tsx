'use client'

// SSE 消费端：EventSource（浏览器原生 API，自动重连）
// AI 对话场景会把 EventSource 换成 fetch 流 + useStream，但"服务端逐段推、客户端逐段收"完全一致

import { useState } from 'react'

export default function SsePage() {
  const [output, setOutput] = useState('')
  const [status, setStatus] = useState<'idle' | 'streaming' | 'done'>('idle')

  const start = () => {
    setOutput('')
    setStatus('streaming')
    const es = new EventSource('/api/sse')

    es.onmessage = (e) => {
      const payload = JSON.parse(e.data) as { token?: string; done?: boolean }
      if (payload.done) {
        es.close()
        setStatus('done')
        return
      }
      setOutput((prev) => prev + (payload.token ?? ''))
    }

    es.onerror = () => {
      // 流正常结束也会触发 error（连接关闭），这里统一收尾
      es.close()
      setStatus('done')
    }
  }

  return (
    <div>
      <section className="card">
        <h2>SSE 流式输出（模拟 Agent 逐 token 回答）</h2>
        <div className="row">
          <button className="primary" onClick={start} disabled={status === 'streaming'}>
            {status === 'streaming' ? '接收中…' : '开始对话'}
          </button>
          <span className="badge">{status}</span>
        </div>
        <div
          style={{
            marginTop: 12,
            minHeight: 60,
            background: '#f8fafc',
            borderRadius: 8,
            padding: 12,
            fontFamily: 'monospace',
          }}
        >
          {output || '（点开始后，观察文字一段段出现——Network 面板 /sse 请求的 EventStream 标签可见每个事件）'}
          {status === 'streaming' && <span className="muted">▋</span>}
        </div>
      </section>
      {/* TODO(练习)1: 给 route.ts 的 TOKENS 换成一段自己的话，观察流式节奏 */}
      {/* TODO(练习)2: 思考：为什么 AI 对话不用 WebSocket？——单向推送足够 + HTTP 基建复用（网关/鉴权/重试） */}
    </div>
  )
}
