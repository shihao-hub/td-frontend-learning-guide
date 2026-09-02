import Demo01 from './demos/01-JSX与组件'
import Demo02 from './demos/02-Props与children'
import Demo03 from './demos/03-useState与不可变更新'
import Demo04 from './demos/04-useEffect与清理'
import Demo05 from './demos/05-列表与key'
import Demo06 from './demos/06-事件处理与受控输入'
import Demo07 from './demos/07-条件渲染'
import Demo08 from './demos/08-useMemo-useCallback'
import Demo09 from './demos/09-状态提升与组件组合'
import Demo10 from './demos/10-自定义Hook'

const nav = [
  ['d01', '01 JSX'],
  ['d02', '02 Props'],
  ['d03', '03 useState'],
  ['d04', '04 useEffect'],
  ['d05', '05 列表key'],
  ['d06', '06 事件'],
  ['d07', '07 条件'],
  ['d08', '08 memo'],
  ['d09', '09 提升'],
  ['d10', '10 Hook'],
]

export default function App() {
  return (
    <div style={{ maxWidth: 880, margin: '0 auto', padding: 24 }}>
      <h1 style={{ fontSize: 24 }}>react-playground</h1>
      <p className="muted" style={{ marginTop: 4 }}>
        P0 · 对照 <code>../learning-guide/02-React核心/</code> 与 React 官方文档 · 每节有 <code>TODO(练习)</code>
      </p>
      <nav className="row" style={{ marginBottom: 16 }}>
        {nav.map(([id, label]) => (
          <a key={id} href={`#${id}`} className="badge" style={{ textDecoration: 'none' }}>
            {label}
          </a>
        ))}
      </nav>
      <Demo01 />
      <Demo02 />
      <Demo03 />
      <Demo04 />
      <Demo05 />
      <Demo06 />
      <Demo07 />
      <Demo08 />
      <Demo09 />
      <Demo10 />
    </div>
  )
}
