import Demo01 from './demos/01-基础表单'
import Demo02 from './demos/02-Zod校验与错误显示'
import Demo03 from './demos/03-watch与联动'
import Demo04 from './demos/04-useFieldArray'
import Demo05 from './demos/05-服务端校验与提交状态'
import Demo06 from './demos/06-综合注册表单'

export default function App() {
  return (
    <div style={{ maxWidth: 880, margin: '0 auto', padding: 24 }}>
      <h1 style={{ fontSize: 24 }}>form-playground</h1>
      <p className="muted" style={{ marginTop: 4 }}>
        P1 · React Hook Form 7 + Zod 4（creativault 固定搭配）· 对应 <code>../learning-guide/04-项目技术栈/</code>
      </p>
      <Demo01 />
      <Demo02 />
      <Demo03 />
      <Demo04 />
      <Demo05 />
      <Demo06 />
    </div>
  )
}
