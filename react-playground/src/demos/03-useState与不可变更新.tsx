// 03 useState 与不可变更新：React 的第一铁律
// ❌ 直接改状态（push/splice/obj.x=1）→ React 感知不到，界面不更新
// ✅ 生成新数组/新对象 setState（对比 Python：像操作 tuple 一样"换掉"而不是"修改"）

import { useState } from 'react'

export default function Demo03() {
  const [count, setCount] = useState(0) // [读, 写]，初始值 0
  const [todos, setTodos] = useState<string[]>(['学 React'])
  const [draft, setDraft] = useState('')
  const [user, setUser] = useState({ name: 'shawn', vip: false })

  return (
    <section id="d03" className="card">
      <h2>03 useState 与不可变更新</h2>

      <div className="row">
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={() => setCount((c) => c + 1)}>函数式更新 +1</button>
        <span>count = {count}</span>
      </div>
      <p className="muted">连点慢一拍问题：同一批多次更新要用函数式 setCount(c =&gt; c+1)</p>

      <div className="row" style={{ marginTop: 12 }}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="新待办"
        />
        <button
          className="primary"
          onClick={() => {
            // ✅ 展开生成新数组；❌ todos.push(draft) 不会触发更新
            setTodos([...todos, draft])
            setDraft('')
          }}
        >
          添加
        </button>
        <button onClick={() => setTodos(todos.slice(0, -1))}>删最后一个</button>
      </div>
      <ul>
        {todos.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>

      <div className="row">
        <button onClick={() => setUser({ ...user, vip: !user.vip })}>
          {/* ✅ 展开旧对象只覆盖 vip；❌ user.vip = !user.vip 无效 */}
          切换 VIP（{String(user.vip)}）
        </button>
        <span className="muted">{JSON.stringify(user)}</span>
      </div>

      {/* TODO(练习)1: 加"清空"按钮，一次把 todos 置空 */}
      {/* TODO(练习)2: 每个 todo 后加删除单条按钮（提示：filter 生成新数组） */}
    </section>
  )
}
