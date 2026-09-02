import { SWRConfig } from 'swr'
import Demo01 from './demos/01-基本请求与缓存'
import Demo02 from './demos/02-加载与错误状态'
import Demo03 from './demos/03-mutate乐观更新'
import Demo04 from './demos/04-条件与依赖请求'
import Demo05 from './demos/05-轮询与配置'
import Demo06 from './demos/06-综合列表详情'

export default function App() {
  return (
    // 全局配置：creativault 里的惯用做法（这里统一关掉 focus 重验证，避免各 demo 互相干扰观察）
    <SWRConfig value={{ revalidateOnFocus: false }}>
      <div style={{ maxWidth: 880, margin: '0 auto', padding: 24 }}>
        <h1 style={{ fontSize: 24 }}>swr-playground</h1>
        <p className="muted" style={{ marginTop: 4 }}>
          P1 · SWR 2 · 客户端数据请求（对应 <code>../learning-guide/04-项目技术栈/</code>）· mock API 带延迟与故障注入
        </p>
        <Demo01 />
        <Demo02 />
        <Demo03 />
        <Demo04 />
        <Demo05 />
        <Demo06 />
      </div>
    </SWRConfig>
  )
}
