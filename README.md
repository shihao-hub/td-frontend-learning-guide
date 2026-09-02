# frontend-learning-guide

后端开发者（Python/FastAPI）转向前端全栈（TypeScript / React / Next.js）的学习仓库，平铺 monorepo 管理。

## 目录

| 目录 | 优先级 | 内容 | 启动 |
|---|---|---|---|
| `learning-guide/` | — | 学习文档（01-06 阶段）+ 随文练习（`code-practice/`） | — |
| `ts-playground/` | P0 | TypeScript：类型/泛型/异步/工具类型（8 个可运行脚本） | `pnpm tsx src/01-*.ts` |
| `react-playground/` | P0 | React 19：Hooks/组件/组合（10 个 demo） | `pnpm dev` |
| `nextjs-playground/` | P0+P2 | Next.js 16：RSC 边界/数据获取/Route Handler/Server Action/next-intl/SSE | `pnpm dev` → :3000 |
| `tailwind-playground/` | P0 | Tailwind 4：布局/变体/响应式（单页全览） | `pnpm dev` |
| `zustand-playground/` | P1 | Zustand 5：store/选择器/useShallow/persist（5 个 demo） | `pnpm dev` |
| `form-playground/` | P1 | RHF 7 + Zod 4：表单全流程（6 个 demo） | `pnpm dev` |
| `swr-playground/` | P1 | SWR 2：缓存/mutate 乐观更新/轮询（6 个 demo + mock API） | `pnpm dev` |
| `drizzle-playground/` | P3 | Drizzle ORM + SQLite：schema/查询/事务/关联 | `pnpm start` |

每个项目自带 README（知识点清单 + 练习打卡表）。后续练习项目继续在本目录下平铺新建，不建 `apps/` 分组。结构约定见 [AGENTS.md](./AGENTS.md)。

## 从哪里开始

1. `learning-guide/README.md` —— 学习路线图 + P0-P3 优先级映射
2. `learning-guide/学习进度追踪.md` —— 周计划与打卡
3. 目标参照项目：creativault 前端（pnpm workspace + Turborepo + Next.js 16 App Router）
