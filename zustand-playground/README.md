# zustand-playground

Zustand 5 客户端全局状态练习场（P1，对应 `../learning-guide/04-项目技术栈/` Zustand 部分）。

## 启动

```bash
pnpm install
pnpm dev     # http://localhost:5173
pnpm check
```

## 知识点清单

| Demo | 知识点 | 完成 |
|---|---|---|
| 01 | create store / 按字段订阅 / 函数式 set | [ ] |
| 02 | actions 与不可变更新（map/filter/展开） | [ ] |
| 03 | 选择器与 useShallow（v5 关键规则） | [ ] |
| 04 | persist 中间件 + partialize | [ ] |
| 05 | 多 store 组合 / 组件外 getState | [ ] |

## 学习要点

- Zustand 5 选择器返回新对象/数组必须包 `useShallow`，否则可能无限循环（03 有对照实验）
- 先修：`../react-playground/` 03（不可变更新）与 09（状态提升，理解 Zustand 解决了什么）
- 对照 creativault：搜索 `create<` 找到项目里的真实 store 读一读
