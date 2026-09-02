# react-playground

React 19 核心练习场（P0，对应 `../learning-guide/02-React核心/` 与 React 官方文档）。

与 `../learning-guide/code-practice/react/` 的两个官方教程项目互补：那边跟教程走，这边按知识点逐节拆解，每个 demo 独立可读。

## 启动

```bash
pnpm install
pnpm dev     # http://localhost:5173
pnpm check   # tsc --noEmit
```

## 知识点清单

| Demo | 知识点 | 完成 |
|---|---|---|
| 01 | JSX 与组件 | [ ] |
| 02 | Props 与 children | [ ] |
| 03 | useState 与不可变更新 | [ ] |
| 04 | useEffect 与清理 | [ ] |
| 05 | 列表与 key | [ ] |
| 06 | 事件处理与受控输入 | [ ] |
| 07 | 条件渲染 | [ ] |
| 08 | useMemo / useCallback / memo | [ ] |
| 09 | 状态提升与组件组合 | [ ] |
| 10 | 自定义 Hook | [ ] |

## 练习方式

页面每节内搜 `TODO(练习)` 完成小改动；配合 Console 观察渲染日志（04/08/10 节尤其要看日志）。

建议顺序：通读官方文档对应章节 → 来这里逐节玩 → 去 code-practice 做完整教程项目。
