# ts-playground

TypeScript 基础练习场（P0，对应 `../learning-guide/01-基础知识/02-TypeScript-类型系统.md`）。

纯 Node 运行，无需浏览器。每个文件是一个独立知识点，包含可运行示例 + `TODO(练习)`。

## 启动

```bash
pnpm install
pnpm tsx src/01-基础类型与类型注解.ts   # 逐个运行
pnpm check                             # 全量类型检查
```

## 知识点清单

| 文件 | 知识点 | 完成 |
|---|---|---|
| `src/01-基础类型与类型注解.ts` | 类型注解 vs 推断（对比 Python 注解） | [ ] |
| `src/02-接口与类型别名.ts` | interface vs type | [ ] |
| `src/03-联合-交叉-收窄.ts` | union / literal / narrowing | [ ] |
| `src/04-泛型.ts` | 泛型函数、泛型约束 | [ ] |
| `src/05-数组方法类型.ts` | map / filter / reduce 的类型流动 | [ ] |
| `src/06-异步与类型.ts` | Promise / async-await 类型 | [ ] |
| `src/07-工具类型.ts` | Partial / Pick / Omit / Record / ReturnType | [ ] |
| `src/08-严格模式.ts` | strict 下常见报错与修复 | [ ] |

## 练习方式

每个文件里搜 `TODO(练习)`，按要求补全后再运行验证输出。全部完成后勾掉上表并对照 `../learning-guide/学习进度追踪.md` 第 1-2 周 checklist。
