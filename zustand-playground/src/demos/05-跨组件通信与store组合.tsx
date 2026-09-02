// 05 跨组件通信与 store 组合：多个 store 各管一摊 + 组件外读写（这是它胜过 Context 的地方）

import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import { useTodos } from './02-actions与不可变更新'
import { useCart } from './03-选择器与性能'

// 小 store 2：通知中心，和 todos/cart 互不干扰，按领域拆分（creativault 的实践）
interface UiState {
  toasts: { id: number; text: string }[]
  push: (text: string) => void
  dismiss: (id: number) => void
}

export const useUi = create<UiState>()((set) => ({
  toasts: [],
  push: (text) => set((s) => ({ toasts: [...s.toasts, { id: Date.now(), text }] })),
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))

// 组件外使用：event handler / 工具函数里直接 getState() / setState()——Context 做不到
window.addEventListener('keydown', (e) => {
  if (e.key === 'F2') useUi.getState().push(`快捷键触发通知 ${new Date().toLocaleTimeString()}`)
})

function Toasts() {
  const toasts = useUi(useShallow((s) => s.toasts))
  const dismiss = useUi((s) => s.dismiss)
  if (toasts.length === 0) return <p className="muted">无通知（按 F2 或点按钮触发）</p>
  return (
    <ul>
      {toasts.map((t) => (
        <li key={t.id} className="row" style={{ justifyContent: 'space-between' }}>
          <span>🔔 {t.text}</span>
          <button onClick={() => dismiss(t.id)}>×</button>
        </li>
      ))}
    </ul>
  )
}

export default function Demo05() {
  const todoCount = useTodos((s) => s.todos.length)
  const cartTotal = useCart((s) => s.items.reduce((sum, i) => sum + i.qty, 0))
  const push = useUi((s) => s.push)

  return (
    <section className="card">
      <h2>05 跨组件通信与 store 组合</h2>
      <p className="muted">
        本节同时读三个 store：待办 {todoCount} 条 / 购物车 {cartTotal} 件 —— 各自独立，互不影响
      </p>
      <Toasts />
      <div className="row">
        <button className="primary" onClick={() => push(`汇总：${todoCount} 待办 + ${cartTotal} 商品`)}>发通知</button>
      </div>
      {/* TODO(练习)1: 把 02 的"添加待办"和通知中心联动：新增 todo 的同时 push 一条通知（提示：在组件里同时调两个 store 的 action） */}
    </section>
  )
}
