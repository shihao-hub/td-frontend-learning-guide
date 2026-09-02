# nextjs-playground

Next.js 16 App Router 练习场（**P0 核心 + P2 主题**，对应 `../learning-guide/03-NextJS实战/`）。

版本对齐 creativault：Next 16.2.6 / React 19.2.4 / next-intl 4 / SWR 2。

## 启动

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm check
```

## 主题地图（= 顶部导航）

| 路由 | 主题 | 优先级 | 完成 |
|---|---|---|---|
| `/` | 学习地图 + RSC 证据（查看源代码） | P0 | [ ] |
| `/rsc-demo` | **RSC vs 'use client' 边界（全项目最重要一页）** | P0 | [ ] |
| `/data-fetch` | async RSC / Suspense 流式 / loading.tsx 约定 | P0 | [ ] |
| `/api-demo` | Route Handler + SWR 同源调用（BFF 形态） | P2 | [ ] |
| `/server-action` | 'use server' / useActionState / FormData | P2 | [ ] |
| `/i18n` | next-intl：t() / cookie 切语言 / ICU 复数 | P1 | [ ] |
| `/sse` | ReadableStream SSE 流（Agent 输出原理） | P2 | [ ] |

## 学习要点

- 边界三规则：默认服务端；要交互加 'use client'；props 过边界必须可序列化
- Server Action 是 RPC 不是 fetch——Network 里看不到请求
- 文件约定：page/layout/loading/error 各司其职，`app/` 目录即路由
- next-intl 采用「无 i18n 路由」模式（locale 存 cookie），creativault 用的带路由模式，差异看官方文档 Static vs Dynamic rendering 一节

## 对照 creativault

学完每节，去 `C:\WorkingProjects\creativault*\frontend\apps\web\src` 找真实例子：
`'use client'` 搜索看边界划分、`actions/` 看 Server Action、`api/` 看 Route Handler。
