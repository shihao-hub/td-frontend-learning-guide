# form-playground

React Hook Form + Zod 练习场（P1，对应 `../learning-guide/04-项目技术栈/` 表单部分）。

## 启动

```bash
pnpm install
pnpm dev     # http://localhost:5173
pnpm check
```

## 知识点清单

| Demo | 知识点 | 完成 |
|---|---|---|
| 01 | register / handleSubmit / 基础规则 | [ ] |
| 02 | Zod schema + zodResolver + z.infer | [ ] |
| 03 | watch / setValue / 联动与派生值 | [ ] |
| 04 | useFieldArray 动态字段 | [ ] |
| 05 | 服务端错误回填 setError / isSubmitting | [ ] |
| 06 | 综合毕业练习（先自己写再对照） | [ ] |

## 学习要点

- RHF 非受控注册 = 少量重渲染；Zod 负责"一份 schema = 校验 + TS 类型"
- Zod 4 语法注意：`z.email()` / `z.url()` 顶层方法（旧教程的 `z.string().email()` 已标记废弃）
- 对照 creativault：搜索 `zodResolver` 看真实表单的写法
