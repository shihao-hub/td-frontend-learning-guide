'use client'

// 客户端组件：从这行往下进入浏览器世界（useState/事件/浏览器 API 都可用）

import { useState } from 'react'

interface Props {
  label: string // props 跨边界：必须是可序列化数据
}

export default function ClientCounter({ label }: Props) {
  const [count, setCount] = useState(0)
  return (
    <p className="row">
      <span className="badge client">Client</span>
      <span>
        {label} {count}
      </span>
      <button className="primary" onClick={() => setCount(count + 1)}>
        +1（点击发生在浏览器）
      </button>
    </p>
  )
}
