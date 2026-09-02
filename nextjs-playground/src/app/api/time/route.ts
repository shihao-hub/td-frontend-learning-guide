// 动态 Route Handler：验证每次请求都重新执行（默认就是动态的，因为用了请求相关信息）
// 想缓存成静态的可以 export const dynamic = 'force-static'

import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    now: new Date().toISOString(),
    hint: '每次刷新都不同 → 证明 route handler 在服务端按请求执行',
  })
}
