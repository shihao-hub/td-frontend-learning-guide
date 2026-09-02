// 10 自定义 Hook：把"状态 + 操作它的一组逻辑"打包复用（use 开头是约定，React 靠它检查规则）
// creativault 里 useStream / useTable 等都是这么来的

import { useCallback, useEffect, useState } from 'react'

// 自定义 Hook 1：防抖值
function useDebounced<T>(value: T, ms = 500): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), ms)
    return () => clearTimeout(id) // 每次变化先取消上个定时器 = 防抖本质
  }, [value, ms])
  return debounced
}

// 自定义 Hook 2：本地存储持久化的 state（Zustand persist 的原理雏形）
function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : initial
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue] as const // as const：让解构类型分别是 T 和 setter
}

export default function Demo10() {
  const [keyword, setKeyword] = useState('')
  const debounced = useDebounced(keyword)
  const [theme, setTheme] = useLocalStorage('demo-theme', 'light')

  // 真实场景：debounced 稳定后才发请求（SWR 章节 https://swr.vercel.app 会更优雅）
  useEffect(() => {
    console.log('[useDebounced] 稳定值变化，可以发请求了:', debounced)
  }, [debounced])

  const toggle = useCallback(() => setTheme((t) => (t === 'light' ? 'dark' : 'light')), [setTheme])

  return (
    <section id="d10" className="card">
      <h2>10 自定义 Hook</h2>
      <div className="row">
        <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="连续输入，500ms 后才生效（看 Console）" />
        <span className="muted">即时值：{keyword}｜防抖值：{debounced}</span>
      </div>
      <div className="row" style={{ marginTop: 12 }}>
        <button onClick={toggle}>主题：{theme}（刷新页面仍在——localStorage 持久化）</button>
      </div>
      {/* TODO(练习)1: 写 useToggle(initial)，返回 [on, toggle]，替换上面的 theme 逻辑测试 */}
    </section>
  )
}
