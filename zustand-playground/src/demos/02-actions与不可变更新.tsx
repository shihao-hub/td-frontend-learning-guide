// 02 actions 与不可变更新：数组/对象字段照样要"换新"，但 set 帮你浅合并第一层

import { create } from 'zustand'

interface Todo {
  id: number
  text: string
  done: boolean
}

interface TodoState {
  todos: Todo[]
  add: (text: string) => void
  toggle: (id: number) => void
  remove: (id: number) => void
  clearDone: () => void
}

let nextId = 4

export const useTodos = create<TodoState>()((set) => ({
  todos: [
    { id: 1, text: '学 Zustand 基础', done: true },
    { id: 2, text: '理解不可变更新', done: false },
    { id: 3, text: '写第一个 store', done: false },
  ],
  add: (text) => set((s) => ({ todos: [...s.todos, { id: nextId++, text, done: false }] })),
  toggle: (id) =>
    set((s) => ({ todos: s.todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) })),
  remove: (id) => set((s) => ({ todos: s.todos.filter((t) => t.id !== id) })),
  clearDone: () => set((s) => ({ todos: s.todos.filter((t) => !t.done) })),
}))

export default function Demo02() {
  const todos = useTodos((s) => s.todos)
  const { add, toggle, remove, clearDone } = useTodos() // 演示整取 actions 的写法（整取会订阅全部字段，谨慎）
  const done = todos.filter((t) => t.done).length

  return (
    <section className="card">
      <h2>02 actions 与不可变更新</h2>
      <button className="primary" onClick={() => add(`新待办 ${nextId}`)}>添加</button>{' '}
      <button onClick={clearDone}>清除已完成</button>
      <ul style={{ marginTop: 8 }}>
        {todos.map((t) => (
          <li key={t.id} className="row" style={{ justifyContent: 'space-between', padding: '2px 0' }}>
            <label style={{ textDecoration: t.done ? 'line-through' : 'none', cursor: 'pointer' }}>
              <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} /> {t.text}
            </label>
            <button onClick={() => remove(t.id)}>删</button>
          </li>
        ))}
      </ul>
      <p className="muted">{done}/{todos.length} 完成 · map/filter/[...s.todos] 三板斧与 React 基础完全一致</p>
      {/* TODO(练习)1: 加 edit(id, text) action，双击条目改名（提示：map 时命中 id 换 { ...t, text }） */}
    </section>
  )
}
