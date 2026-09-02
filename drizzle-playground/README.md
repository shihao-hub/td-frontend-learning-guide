# drizzle-playground

Drizzle ORM 练习场（P3，对应 `../learning-guide/04-项目技术栈/` Drizzle 部分）。本地 SQLite（better-sqlite3），零外部依赖。

## 启动

```bash
pnpm install
pnpm tsx src/01-建表与seed.ts   # 先跑这个！生成 dev.db + 演示数据
pnpm tsx src/02-查询.ts         # 其余任意顺序
pnpm tsx src/03-增删改与事务.ts
pnpm tsx src/04-关联查询.ts
pnpm check
```

## 知识点清单

| 文件 | 知识点 | 完成 |
|---|---|---|
| `src/db/schema.ts` | 表定义 / $inferSelect 类型反推 | [ ] |
| `01` | 建表 / returning / seed 幂等 | [ ] |
| `02` | select / where(and,or,like) / orderBy / 投影 | [ ] |
| `03` | insert / update(原子自增) / delete / transaction | [ ] |
| `04` | innerJoin vs db.query 关系查询 | [ ] |

## 迁移工作流（真实项目用）

```bash
pnpm db:generate   # 改 schema.ts 后生成迁移 SQL（存 ./drizzle/）
pnpm db:push       # 或直接把 schema 推到库（开发期偷懒用）
pnpm db:studio     # 浏览器里看数据
```

## 对照 creativault

creativault 的 `packages/db`：schema 在 `src/schema/`，驱动是 postgres，但 `select().from().where()` 那一套完全一致——这里学的直接迁移过去。Python 世界的对照物：SQLAlchemy Core（Drizzle 的 API 风格更像它，不像 Django ORM）。

注意：`dev.db` 不入库（根 .gitignore 已排除）。
