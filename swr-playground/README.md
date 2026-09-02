# swr-playground

SWR 2 数据请求练习场（P1，对应 `../learning-guide/04-项目技术栈/` SWR 部分）。

内置 mock API（`src/lib/api.ts`）：600ms 假延迟 + 故障率注入，无需真实后端。

## 启动

```bash
pnpm install
pnpm dev     # http://localhost:5173
pnpm check
```

## 知识点清单

| Demo | 知识点 | 完成 |
|---|---|---|
| 01 | useSWR / key 共享缓存 / stale-while-revalidate | [ ] |
| 02 | isLoading / error / 自动重试 | [ ] |
| 03 | mutate 乐观更新三步曲 | [ ] |
| 04 | 条件请求（key=null）/ 依赖请求 / 数组 key | [ ] |
| 05 | refreshInterval 轮询 / SWRConfig 全局配置 | [ ] |
| 06 | 综合：列表+详情+操作（毕业题） | [ ] |

## 学习要点

- 心智模型：key = 缓存标识，fetcher = 怎么取；同 key 处处共享
- 乐观更新 = optimisticData + rollbackOnError + revalidate，creativault 交互体验的核心手法
- 对照 creativault：搜索 `useSWR(` 看真实页面的 key 设计（配合 `/api/*` BFF）
