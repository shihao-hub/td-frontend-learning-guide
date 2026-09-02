'use client'

// 语言切换（客户端组件）：写 cookie → router.refresh() 让服务端重新渲染
// 为什么不用 setState 切语言？——RSC 的文案在服务端渲染，客户端状态影响不到它

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useTransition } from 'react'

export default function LocaleSwitch() {
  const t = useTranslations('localeSwitch')
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const switchTo = (locale: 'zh' | 'en') => {
    document.cookie = `locale=${locale}; path=/; max-age=31536000`
    startTransition(() => router.refresh()) // 只重新渲染 RSC 部分，不整页刷新
  }

  return (
    <span className="row">
      <button disabled={pending} onClick={() => switchTo('zh')}>
        {t('zh')}
      </button>
      <button disabled={pending} onClick={() => switchTo('en')}>
        {t('en')}
      </button>
    </span>
  )
}
