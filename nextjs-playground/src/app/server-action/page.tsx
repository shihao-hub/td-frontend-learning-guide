'use client'

// Server Action 页面（客户端组件）：useActionState 管理提交状态（React 19 API）
// 传统做法是 useEffect 提交 + setState 管理 loading；useActionState 把这一切打包

import { useActionState } from 'react'
import { addTodo, getTodos, toggleTodo, type TodoState } from './actions'

const initial: TodoState = { items: [], lastMessage: null }

export default function ServerActionPage() {
  const [state, formAction, pending] = useActionState(addTodo, initial) // formAction = 给 <form action=...>
  const [, toggleAction, togglePending] = useActionState(toggleTodo, initial)

  // 初始数据：挂载时调一次 server action（真实项目常用 RSC 直接渲染初始列表，这里演示客户端调法）
  void getTodos

  return (
    <div>
      <section className="card">
        <h2>新增待办（Server Action）</h2>
        <form action={formAction} className="row">
          <input name="text" placeholder="待办内容" disabled={pending} />
          <button className="primary" type="submit" disabled={pending}>
            {pending ? '提交中…' : '添加'}
          </button>
        </form>
        {state.lastMessage && <p style={{ margin: '8px 0 0' }}>{state.lastMessage}</p>}
        <p className="muted">
          pending 状态由 useActionState 自动管理；提交后表单自动清空（uncontrolled form 的福利）；
          Network 里看不到 fetch——它走的是 RSC 的 RPC 通道
        </p>
      </section>

      <section className="card">
        <h2>列表（每行一个 form）</h2>
        {state.items.length === 0 ? (
          <p className="muted">先添加一条试试（列表存在服务端内存里）</p>
        ) : (
          <ul>
            {state.items.map((t) => (
              <li key={t.id} className="row" style={{ justifyContent: 'space-between', padding: '2px 0' }}>
                <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>
                  {t.done ? '☑' : '☐'} {t.text}
                </span>
                {/* 多参数场景：hidden input 携带 id，Server Action 从 FormData 取 */}
                <form action={toggleAction}>
                  <input type="hidden" name="id" value={t.id} />
                  <button type="submit" disabled={togglePending}>
                    切换
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>
      {/* TODO(练习)1: actions.ts 加 removeTodo(id)，页面每行加删除按钮 */}
      {/* TODO(练习)2: 刷新页面列表变空——想想为什么？把初始列表改成 RSC 页面直出（提示：page 改 async，getTodos 传给本组件当 initial） */}
    </div>
  )
}
