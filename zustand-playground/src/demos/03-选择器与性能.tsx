// 03 选择器与性能：Zustand v5 的关键规则
// 1) 返回新对象/数组的选择器必须包 useShallow（v5 起默认严格相等，不包会死循环警告）
// 2) 订阅越细，重渲染越少

import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

interface CartItem {
  id: number
  name: string
  price: number
  qty: number
}

interface CartState {
  items: CartItem[]
  unrelatedTick: number // 无关字段：演示"别的组件更新它，我们不受牵连"
  add: (item: Omit<CartItem, 'qty'>) => void
  changeQty: (id: number, delta: number) => void
  tick: () => void
}

export const useCart = create<CartState>()((set) => ({
  items: [
    { id: 1, name: '机械键盘', price: 399, qty: 1 },
    { id: 2, name: '显示器', price: 1899, qty: 1 },
  ],
  unrelatedTick: 0,
  add: (item) => set((s) => ({ items: [...s.items, { ...item, qty: 1 }], unrelatedTick: s.unrelatedTick })),
  changeQty: (id, delta) =>
    set((s) => ({
      items: s.items.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)),
    })),
  tick: () => set((s) => ({ unrelatedTick: s.unrelatedTick + 1 })),
}))

function ItemList() {
  // ✅ useShallow：浅比较返回的数组内容，items 没变就不渲染
  const items = useCart(useShallow((s) => s.items))
  const changeQty = useCart((s) => s.changeQty)
  console.log('[ItemList] 渲染')
  return (
    <ul>
      {items.map((i) => (
        <li key={i.id} className="row" style={{ justifyContent: 'space-between' }}>
          <span>{i.name} ¥{i.price}</span>
          <span className="row">
            <button onClick={() => changeQty(i.id, -1)}>−</button>
            <span>x{i.qty}</span>
            <button onClick={() => changeQty(i.id, 1)}>+</button>
          </span>
        </li>
      ))}
    </ul>
  )
}

function Total() {
  // 派生数据也可直接在选择器里算（返回原始值不需要 shallow）
  const total = useCart((s) => s.items.reduce((sum, i) => sum + i.price * i.qty, 0))
  console.log('[Total] 渲染')
  return <span className="badge">总价 ¥{total}</span>
}

export default function Demo03() {
  const tick = useCart((s) => s.tick)
  const t = useCart((s) => s.unrelatedTick)
  return (
    <section className="card">
      <h2>03 选择器与性能（useShallow）</h2>
      <ItemList />
      <div className="row" style={{ marginTop: 8 }}>
        <Total />
        <button onClick={tick}>改无关字段 tick={t}</button>
        <span className="muted">点它：ItemList/Total 不重渲染（Console 验证）</span>
      </div>
      {/* TODO(练习)1: 把 useShallow 去掉再点"改无关字段"，观察 Console 的额外渲染与控制台警告，再装回来 */}
    </section>
  )
}
