// 07 条件渲染：四种姿势 && / 三元 / 提前 return / 存进变量
// 注意 && 陷阱：{count && <span>...</span>} 当 count=0 时会渲染出 "0"！

import { useState } from 'react'

interface Msg {
  id: number
  type: 'info' | 'error'
  text: string
}

export default function Demo07() {
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 1, type: 'info', text: '一切正常' }])
  const [loading, setLoading] = useState(false)

  // 提前 return：处理"异常/加载"分支，主渲染保持干净
  if (loading) {
    return (
      <section id="d07" className="card">
        <h2>07 条件渲染</h2>
        <p>加载中…（提前 return 分支）</p>
      </section>
    )
  }

  const hasError = msgs.some((m) => m.type === 'error')

  return (
    <section id="d07" className="card">
      <h2>07 条件渲染</h2>

      {/* 三元：二选一 */}
      {hasError ? <p style={{ color: '#dc2626' }}>⚠ 有错误消息</p> : <p style={{ color: '#059669' }}>✓ 无错误</p>}

      {/* && 存在才渲染；注意 falsy 值陷阱（count && ... 时 0 会被渲染） */}
      {msgs.length > 0 && <p className="muted">共 {msgs.length} 条（注意这里是 length &gt; 0 而不是 length &&）</p>}

      <ul>
        {msgs.map((m) => (
          <li key={m.id} style={{ color: m.type === 'error' ? '#dc2626' : undefined }}>
            {m.type === 'error' ? '❌' : 'ℹ️'} {m.text}
            <button style={{ marginLeft: 8 }} onClick={() => setMsgs(msgs.filter((x) => x.id !== m.id))}>×</button>
          </li>
        ))}
      </ul>

      <div className="row" style={{ marginTop: 8 }}>
        <button
          onClick={() => {
            setLoading(true)
            setTimeout(() => {
              setMsgs((prev) => [...prev, { id: Date.now(), type: 'info', text: `刷新于 ${new Date().toLocaleTimeString()}` }])
              setLoading(false)
            }, 800)
          }}
        >
          模拟刷新（看提前 return 分支）
        </button>
        <button onClick={() => setMsgs((prev) => [...prev, { id: Date.now(), type: 'error', text: '模拟错误' }])}>
          加一条错误
        </button>
      </div>

      {/* TODO(练习)1: 实现"全部已读"按钮：msgs 为空时禁用（disabled={!msgs.length}） */}
    </section>
  )
}
