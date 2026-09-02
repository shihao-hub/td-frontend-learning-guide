// i18n 页（Server Component 也能用 useTranslations——next-intl 在服务端解析文案）

import { useTranslations } from 'next-intl'

export default function I18nPage() {
  const t = useTranslations('i18nDemo')
  return (
    <div>
      <section className="card">
        <h2>{t('title')}</h2>
        <p>{t('desc')}</p>
        <p className="badge">{t('current')}</p>
        <p className="muted">{t('hint')}</p>
        <hr />
        <p>
          {/* ICU 消息语法：复数规则随语言变化（中文无复数变化，英文 =0 no apples / 1 one apple / n apples） */}
          {t('items', { count: 0 })} · {t('items', { count: 3 })}
        </p>
        <p className="muted">右上角切换语言后，英文版复数会体现差异（messages/en.json 的 plural 规则）</p>
      </section>
      {/* TODO(练习)1: 在 messages/*.json 加 welcome 键（带 name 参数），页面用 t('welcome', {name: 'shawn'}) 展示 */}
    </div>
  )
}
