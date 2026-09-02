// 01 创建 store 与读取：Zustand 三步走 —— define state + actions in one create()
// 对比 react-playground/09 的状态提升：任何组件直接 useStore 订阅，无需父组件中转

import { create } from 'zustand'

// create 的双括号：create<T>()(...) 是 TS 的柯里化写法（让初始 state 能推断类型）
interface CounterState {
  count: number
  step: number
  inc: () => void
  setStep: (n: number) => void
}

export const useCounter = create<CounterState>()((set) => ({
  count: 0,
  step: 1,
  inc: () => set((s) => ({ count: s.count + s.step })), // set 支持"函数式"：拿旧 state 返回增量
  setStep: (n) => set({ step: n }), // set 支持部分更新：只写要变的字段（不用展开旧对象！）
}))

// 组件 A：只读 count —— 注意选择器写法 s => s.count，只订阅这一格
function CountView() {
  const count = useCounter((s) => s.count)
  console.log('[CountView] 渲染 count=', count)
  return <span className="badge">count = {count}</span>
}

// 组件 B：只写不读 —— 组件里可以完全不订阅状态（读 store.getState() 拿即时值）
function StepControl() {
  const setStep = useCounter((s) => s.setStep) // action 是稳定引用，永远不触发重渲染
  return (
    <span className="row">
      {[1, 5, 10].map((n) => (
        <button key={n} onClick={() => setStep(n)}>
          step={n}
        </button>
      ))}
    </span>
  )
}

export default function Demo01() {
  const inc = useCounter((s) => s.inc)
  return (
    <section className="card">
      <h2>01 创建 store 与读取</h2>
      <div className="row">
        <CountView />
        <button className="primary" onClick={inc}>+步长</button>
        <StepControl />
      </div>
      <p className="muted">点 step 按钮：CountView 不重渲染（Console 验证）——按字段订阅是 Zustand 性能核心</p>
      {/* TODO(练习)1: 加 dec: () => void 到 store，并加"−步长"按钮 */}
    </section>
  )
}
