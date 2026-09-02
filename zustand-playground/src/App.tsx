import Demo01 from './demos/01-创建store与读取'
import Demo02 from './demos/02-actions与不可变更新'
import Demo03 from './demos/03-选择器与性能'
import Demo04 from './demos/04-persist持久化'
import Demo05 from './demos/05-跨组件通信与store组合'

export default function App() {
  return (
    <div style={{ maxWidth: 880, margin: '0 auto', padding: 24 }}>
      <h1 style={{ fontSize: 24 }}>zustand-playground</h1>
      <p className="muted" style={{ marginTop: 4 }}>
        P1 · 对应 <code>../learning-guide/04-项目技术栈/</code> Zustand 部分 · 版本 5.x（注意 v5 选择器规则变化）
      </p>
      <Demo01 />
      <Demo02 />
      <Demo03 />
      <Demo04 />
      <Demo05 />
    </div>
  )
}
