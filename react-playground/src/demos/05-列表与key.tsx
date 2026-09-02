// 05 列表与 key：key 是 React 复用 DOM 的依据，必须稳定唯一（❌ 用数组下标在会增删的列表里）

import { useState } from 'react'

interface Item {
  id: number // ✅ 稳定 id 做 key
  text: string
  done: boolean
}

let nextId = 4

export default function Demo05() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, text: '学 JSX', done: true },
    { id: 2, text: '学 useState', done: true },
    { id: 3, text: '学列表渲染', done: false },
  ])
  const [draft, setDraft] = useState('')

  const toggle = (id: number) =>
    setItems(items.map((it) => (it.id === id ? { ...it, done: !it.done } : it))) // map 出新数组

  const remove = (id: number) => setItems(items.filter((it) => it.id !== id)) // filter 出新数组

  return (
    <section id="d05" className="card">
      <h2>05 列表与 key</h2>
      <div className="row">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && draft.trim()) {
              setItems([...items, { id: nextId++, text: draft, done: false }])
              setDraft('')
            }
          }}
          placeholder="回车添加（观察 input 不丢焦点——key 稳定的功劳）"
        />
      </div>
      <ul style={{ marginTop: 8 }}>
        {items.map((it) => (
          <li key={it.id} className="row" style={{ justifyContent: 'space-between', padding: '4px 0' }}>
            <label style={{ textDecoration: it.done ? 'line-through' : 'none', cursor: 'pointer' }}>
              <input type="checkbox" checked={it.done} onChange={() => toggle(it.id)} /> {it.text}
            </label>
            <button onClick={() => remove(it.id)}>删</button>
          </li>
        ))}
      </ul>
      <p className="muted">已完成 {items.filter((i) => i.done).length}/{items.length}（filter 计数 + map 渲染，两兄弟天天用）</p>
      {/* TODO(练习)1: 把 key={it.id} 换成 key={index}，然后添加/删除条目，观察输入框状态串位现象，再换回来 */}
    </section>
  )
}
