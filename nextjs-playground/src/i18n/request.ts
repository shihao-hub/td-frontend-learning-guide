// next-intl 无路由模式：locale 存 cookie，服务端按请求读取（切换语言 = 写 cookie + refresh）
import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

export default getRequestConfig(async () => {
  const locale = (await cookies()).get('locale')?.value === 'en' ? 'en' : 'zh'
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
