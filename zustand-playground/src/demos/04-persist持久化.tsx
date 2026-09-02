// 04 persist 持久化：creativault 项目里主题/语言偏好等就这么存 localStorage
// 中间件模式：create(persist(fn, options))，options.name 是 localStorage 的 key

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsState {
  theme: 'light' | 'dark'
  lang: 'zh' | 'en'
  sidebarCollapsed: boolean
  setTheme: (t: SettingsState['theme']) => void
  toggleLang: () => void
  toggleSidebar: () => void
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      lang: 'zh',
      sidebarCollapsed: false,
      setTheme: (t) => set({ theme: t }),
      toggleLang: () => set((s) => ({ lang: s.lang === 'zh' ? 'en' : 'zh' })),
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
    }),
    {
      name: 'zp-settings', // localStorage key
      // partialize: 只持久化部分字段（actions 永远不需要存）
      partialize: (s) => ({ theme: s.theme, lang: s.lang, sidebarCollapsed: s.sidebarCollapsed }),
    },
  ),
)

export default function Demo04() {
  const { theme, lang, sidebarCollapsed, setTheme, toggleLang, toggleSidebar } = useSettings()
  const isDark = theme === 'dark'

  return (
    <section className="card" style={isDark ? { background: '#1e293b', color: '#e2e8f0' } : undefined}>
      <h2>04 persist 持久化</h2>
      <div className="row">
        <button className="primary" onClick={() => setTheme(isDark ? 'light' : 'dark')}>
          主题：{theme}
        </button>
        <button onClick={toggleLang}>语言：{lang === 'zh' ? '中文' : 'EN'}</button>
        <button onClick={toggleSidebar}>侧栏：{sidebarCollapsed ? '折叠' : '展开'}</button>
      </div>
      <p className="muted" style={isDark ? { color: '#94a3b8' } : undefined}>
        改完任意一项后<strong>刷新页面</strong>，状态还在（F12 → Application → Local Storage → zp-settings 可见 JSON）
      </p>
      {/* TODO(练习)1: 加 fontSize: 'sm'|'md'|'lg' 设置并持久化，页面根元素 style.fontSize 随之变化 */}
    </section>
  )
}
