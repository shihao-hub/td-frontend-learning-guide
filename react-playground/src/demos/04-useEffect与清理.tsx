// 04 useEffect 与清理：处理"渲染之外的副作用"（定时器/订阅/请求日志）
// Python 类比：FastAPI lifespan 的启动/清理，但按"依赖变化"粒度触发
// 依赖数组口诀：[] 只跑一次（挂载）｜[a,b] a/b 变了跑｜ 不写 = 每次渲染都跑（几乎总 是错的）

import { useEffect, useState } from 'react'

function Clock() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    console.log('[Clock] effect: 建立定时器')
    const id = setInterval(() => setNow(new Date()), 1000)
    // 清理函数：卸载或下次 effect 前执行——不清理 = 定时器泄漏
    return () => {
      console.log('[Clock] cleanup: 清掉旧定时器')
      clearInterval(id)
    }
  }, []) // [] = 只在挂载时建一次

  return <span style={{ fontVariantNumeric: 'tabular-nums' }}>{now.toLocaleTimeString()}</span>
}

function SearchLog({ keyword }: { keyword: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('[SearchLog] keyword 变了 → 重新"请求"', keyword)
    setCount((c) => c + 1)
    // 真实项目：这里发 fetch，或做防抖。依赖必须是 [keyword]
  }, [keyword])

  return (
    <span className="muted">
      「{keyword || '空'}」触发 {count} 次（看 Console）
    </span>
  )
}

export default function Demo04() {
  const [show, setShow] = useState(true)
  const [keyword, setKeyword] = useState('')

  return (
    <section id="d04" className="card">
      <h2>04 useEffect 与清理</h2>
      <div className="row">
        {show && <Clock />}
        <button onClick={() => setShow(!show)}>{show ? '卸载时钟(看cleanup日志)' : '挂载时钟'}</button>
      </div>
      <div className="row" style={{ marginTop: 12 }}>
        <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="输入触发依赖变化" />
        <SearchLog keyword={keyword} />
      </div>
      {/* TODO(练习)1: 给 SearchLog 加 500ms 防抖（提示：setTimeout + cleanup clearTimeout） */}
    </section>
  )
}
