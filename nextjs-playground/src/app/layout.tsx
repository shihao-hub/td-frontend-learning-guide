import type { Metadata } from 'next'
import Link from 'next/link'
import { getLocale } from 'next-intl/server'
import { NextIntlClientProvider, useTranslations } from 'next-intl'
import LocaleSwitch from '@/app/components/LocaleSwitch'
import './globals.css'

// 根布局（Server Component）：页面外壳 + 导航
// Nav 文案也走 next-intl——证明 i18n 不只给页面用，组件树任何位置都行
function Nav() {
  const t = useTranslations('nav')
  const links = [
    ['/', t('home')],
    ['/rsc-demo', t('rsc')],
    ['/data-fetch', t('data')],
    ['/api-demo', t('api')],
    ['/server-action', t('action')],
    ['/i18n', t('i18n')],
    ['/sse', t('sse')],
  ] as const
  return (
    <nav className="nav">
      {links.map(([href, label]) => (
        <Link key={href} href={href}>
          {label}
        </Link>
      ))}
      <span className="spacer" />
      <LocaleSwitch />
    </nav>
  )
}

export const metadata: Metadata = { title: 'nextjs-playground' }

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  return (
    <html lang={locale}>
      <body>
        {/* v4 的 NextIntlClientProvider 自动继承 i18n/request.ts 的 messages/locale，不用手动传 */}
        <NextIntlClientProvider>
          <Nav />
          <main className="main">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
