// 09 状态提升与组件组合：多个组件共享状态 → 提到最近公共父组件，经 props 下发
// 这是 Zustand（见 ../zustand-playground）出现之前的标准做法，读懂项目老代码必备

import { useState } from 'react'

// 场景：左侧输入筛选词，右侧列表根据它过滤——两个兄弟组件要"对话"，只能靠父组件中转

function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="筛选用户…" />
}

function UserList({ keyword }: { keyword: string }) {
  const users = [
    { id: 1, name: 'shawn' },
    { id: 2, name: 'alice' },
    { id: 3, name: 'bob' },
    { id: 4, name: 'charlie' },
  ]
  const filtered = users.filter((u) => u.name.includes(keyword))
  return (
    <ul>
      {filtered.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
      {filtered.length === 0 && <li className="muted">无匹配</li>}
    </ul>
  )
}

export default function Demo09() {
  // 状态住在父组件：这就是"提升"（lifting state up）
  const [keyword, setKeyword] = useState('')

  return (
    <section id="d09" className="card">
      <h2>09 状态提升与组合</h2>
      <div className="row">
        <SearchInput value={keyword} onChange={setKeyword} />
        <span className="muted">父组件持有 keyword，下发给两个子组件</span>
      </div>
      <UserList keyword={keyword} />
      <p className="muted">层次深了就是"props drilling 地狱"——creativault 用 Zustand 解决，见 10 与 zustand-playground</p>
      {/* TODO(练习)1: 加第三个兄弟组件 ResultCount，显示"匹配 n 人"，同样从父组件接 keyword */}
    </section>
  )
}
