# tailwind-playground

Tailwind CSS 4 练习场（P0 随用随学，对应 `../learning-guide/04-项目技术栈/` 的 Tailwind 部分）。

纯 HTML + CSS，无框架。打开页面逐节对照效果，用 DevTools 审查每个 class 生成的 CSS。

## 启动

```bash
pnpm install
pnpm dev   # http://localhost:5173
```

## 知识点清单

| 章节 | 知识点 | 完成 |
|---|---|---|
| 01 | 间距与盒模型（p/m/gap，1 单位 = 0.25rem） | [ ] |
| 02 | 排版与颜色（text/font/truncate、@theme 自定义色） | [ ] |
| 03 | Flex 布局（justify/items/flex-1/wrap） | [ ] |
| 04 | Grid 布局（grid-cols/gap） | [ ] |
| 05 | 状态变体（hover/focus/disabled/group） | [ ] |
| 06 | 组件模式（utility 组合 Button/Card） | [ ] |
| 07 | 暗色与响应式（dark:/sm/md 断点） | [ ] |

## 练习方式

在 `index.html` 里搜 `TODO(练习)`（HTML 注释形式），在对应章节内补全。目标是：看到 creativault 组件的 className 能一眼读懂结构。

## Tailwind 4 要点（与旧教程差异）

- 配置走 CSS：`@theme { --color-brand: ... }`，不再需要 `tailwind.config.js`
- Vite 接入：`@tailwindcss/vite` 插件 + CSS 里 `@import "tailwindcss"`
- 新原子类：`size-6` = w-6+h-6
