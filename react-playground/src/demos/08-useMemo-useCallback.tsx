// 08 useMemo / useCallback：缓存"计算结果"和"函数引用"，避免子组件无谓重渲染
// 前提认知：React 默认父渲染 → 所有子组件跟着渲染；memo + 稳定 props 才能跳过
// 不要滥用：简单计算直接算，缓存本身也有成本

import { memo, useCallback, useMemo, useState } from 'react'

// 纯展示子组件：props 不变就跳过重渲染（配合父组件的 useCallback/useMemo 才生效）
const ExpensiveList = memo(function ExpensiveList({ items, onPick }: { items: number[]; onPick: (n: number) => void }) {
  console.log('[ExpensiveList] 渲染', items.length)
  return (
    <div className="row">
      {items.slice(0, 8).map((n) => (
        <button key={n} onClick={() => onPick(n)}>{n}</button>
      ))}
      <span className="muted">（Console 看是否跳过了渲染）</span>
    </div>
  )
})

export default function Demo08() {
  const [size, setSize] = useState(1000)
  const [unrelated, setUnrelated] = useState(0) // 无关状态：用于演示"没缓存时也会连累"
  const [picked, setPicked] = useState(0)

  // useMemo：size 不变就复用上次的大数组，不在每次渲染重建
  const items = useMemo(() => Array.from({ length: size }, (_, i) => i * i), [size])

  // useCallback：不缓存则每次渲染都是"新函数"，ExpensiveList 的 memo 判断失效
  const onPick = useCallback((n: number) => setPicked(n), [])

  return (
    <section id="d08" className="card">
      <h2>08 useMemo / useCallback</h2>
      <div className="row">
        <span>size={size}</span>
        <button onClick={() => setSize((s) => s * 2)}>放大</button>
        <button onClick={() => setUnrelated((u) => u + 1)}>改无关状态={unrelated}</button>
        <span className="badge">picked={picked}</span>
      </div>
      <p className="muted">点"改无关状态"：Console 里 ExpensiveList 不再打印 → memo+useCallback 生效；若去掉 useCallback 再试</p>
      <div style={{ marginTop: 8 }}>
        <ExpensiveList items={items} onPick={onPick} />
      </div>
      {/* TODO(练习)1: 把 useCallback 换成普通 (n) => setPicked(n)，再点"改无关状态"，观察 Console 差异并还原 */}
    </section>
  )
}
