// RSC 边界演示（本项目最重要的一页）
// 规则速记：
//  1) 默认全是 Server Component：跑在 Node，能 async/await 直接查数据，产物是 HTML+RSC payload
//  2) 需要 useState/useEffect/浏览器 API → 加 'use client'，该文件及它 import 的都进浏览器
//  3) 跨边界只能传「可序列化」数据：props 传字符串/数字/对象 OK；传函数/类实例 ❌

import { Suspense } from 'react'
import ServerChild from './ServerChild'
import ClientCounter from './ClientCounter'
import ClientUseServerChild from './ClientUseServerChild'

// 服务端"查库"：模拟 200ms 延迟的 async 函数（RSC 直接 await，不需要 useEffect）
async function getStats() {
  await new Promise((r) => setTimeout(r, 200))
  return { users: 128, orders: 1024, generatedAt: new Date().toISOString() }
}

export default async function RscDemoPage() {
  const stats = await getStats() // ← 这行在服务端执行，浏览器永远看不到这段代码

  return (
    <div>
      <section className="card">
        <h2>① 服务端渲染的数据</h2>
        <span className="badge server">Server</span>
        <p>
          用户 {stats.users} · 订单 {stats.orders} · 生成于 {stats.generatedAt}
        </p>
        <p className="muted">数据获取没有 loading 闪烁——HTML 一次成型。慢的部分可以配合 Suspense 分块流式（见 /data-fetch）</p>
        <ServerChild />
      </section>

      <section className="card">
        <h2>② 边界对面：客户端组件</h2>
        <ClientCounter label="来自服务端的 props：" />
        <p className="muted">
          ClientCounter 文件头有 'use client'，useState 在浏览器跑；
          但它的 props（label 字符串）来自本服务端组件——这就是"过边界"
        </p>
      </section>

      <section className="card">
        <h2>③ 逆向：客户端组件里调用服务端函数</h2>
        <Suspense fallback={<p className="muted">加载服务端内容…</p>}>
          <ClientUseServerChild />
        </Suspense>
        <p className="muted">
          传给客户端的不是函数本体，而是「服务端引用」——React 序列化成 id，点击时通过 RPC 回服务端执行。
          这就是 Server Action（/server-action）与 creativault 写操作的基础机制
        </p>
      </section>

      {/* TODO(练习)1: 给 stats 增加一个 products 字段并展示 */}
      {/* TODO(练习)2: 试着把 stats 整个传给 ClientCounter（改其 props 类型），再试着传一个函数过去看报错——体会"可序列化"限制 */}
    </div>
  )
}
