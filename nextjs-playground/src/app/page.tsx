import Link from 'next/link'
import { useTranslations } from 'next-intl'

// 首页（Server Component，本目录没有 'use client' 就是服务端组件）
const topics = [
  ['/rsc-demo', 'RSC vs 客户端组件边界', 'P0 钥匙：谁在服务端跑、谁在浏览器跑、props 怎么过边界'],
  ['/data-fetch', '数据获取与 loading.tsx', 'async 服务端组件 + Suspense 流式渲染'],
  ['/api-demo', '调用 /api/*（BFF 形态）', 'Route Handler + SWR，creativault 页面的标准形态'],
  ['/server-action', 'Server Action', 'useActionState + "use server"，写操作不走 fetch'],
  ['/i18n', 'next-intl 国际化', 't() / cookie 切语言 / ICU 复数'],
  ['/sse', 'SSE 流', 'ReadableStream 手写事件流，Agent 输出的原理'],
] as const

export default function HomePage() {
  const t = useTranslations('home')
  return (
    <div>
      <h1 style={{ fontSize: 24, marginBottom: 4 }}>{t('title')}</h1>
      <p className="muted" style={{ marginTop: 0 }}>{t('subtitle')}</p>
      <section className="card">
        <span className="badge server">Server Component</span>{' '}
        <span className="muted">{t('serverRenderedAt', { time: new Date().toLocaleTimeString() })}</span>
      </section>
      <section className="card">
        <h2>主题地图</h2>
        {topics.map(([href, title, desc]) => (
          <p key={href} style={{ margin: '8px 0' }}>
            <Link href={href} style={{ color: '#0369a1', fontWeight: 600 }}>
              {title}
            </Link>
            <span className="muted"> — {desc}</span>
          </p>
        ))}
      </section>
      {/* TODO(练习)1: 右键"查看网页源代码"，找到上面时间字符串——RSC 的直接证据（客户端组件的源码里看不到这种内容） */}
    </div>
  )
}
