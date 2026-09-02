// 数据获取：async RSC + Suspense 流式渲染 + loading.tsx 文件约定

import { Suspense } from 'react'
import SlowPanel from './SlowPanel'
import FastPanel from './FastPanel'

export default function DataFetchPage() {
  return (
    <div>
      <section className="card">
        <h2>FastPanel（无 Suspense 包裹）</h2>
        <FastPanel />
        <p className="muted">整页没有 loading.tsx 命中时：页面会等最慢的异步部分全部就绪才一次性返回</p>
      </section>

      <section className="card">
        <h2>SlowPanel（Suspense 分块流式）</h2>
        <Suspense fallback={<p className="muted">⏳ SlowPanel 加载中（2 秒）…</p>}>
          <SlowPanel />
        </Suspense>
        <p className="muted">
          Suspense 让快的先到、慢的后到：浏览器先收到外壳 HTML，慢数据就绪后流式补上——这就是「流式渲染」
        </p>
      </section>
      {/* TODO(练习)1: 给 SlowPanel 再包一层不同延迟的 Suspense，观察多骨架屏交错出现的顺序 */}
    </div>
  )
}
