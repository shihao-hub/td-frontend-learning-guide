// 01 建表与 seed：先跑我！生成 dev.db 并灌入演示数据
// 两种建表方式：① 本文件的 CREATE TABLE（自包含）② pnpm db:push（drizzle-kit 按 schema 同步，改表结构后用）

import { sql } from 'drizzle-orm'
import { db } from './db'
import { posts, users } from './db/schema'

db.run(sql`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL
)`)

db.run(sql`CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  title TEXT NOT NULL,
  content TEXT,
  published INTEGER NOT NULL DEFAULT 0,
  views INTEGER NOT NULL DEFAULT 0
)`)

// 清空后重新 seed（幂等：跑多少次结果一致）
db.run(sql`DELETE FROM posts`)
db.run(sql`DELETE FROM users`)

const [alice, bob, carol] = db
  .insert(users)
  .values([
    { name: 'alice', email: 'alice@drizzle.dev' },
    { name: 'bob', email: 'bob@drizzle.dev' },
    { name: 'carol', email: 'carol@drizzle.dev' },
  ])
  .returning() // 返回插入后的完整行（含自增 id）——SQLite 3.35+ 支持
  .all()

db.insert(posts)
  .values([
    { userId: alice.id, title: 'Drizzle 入门', content: 'schema 即类型', published: true, views: 120 },
    { userId: alice.id, title: 'Drizzle 事务', content: 'db.transaction(...)', published: false, views: 3 },
    { userId: bob.id, title: 'SQLite WAL 模式', content: '并发读不阻塞', published: true, views: 45 },
    { userId: carol.id, title: '从 SQLAlchemy 到 Drizzle', content: '思维迁移指南', published: true, views: 256 },
  ])
  .run()

console.log('✓ dev.db 已就绪：3 用户 / 4 文章')
console.table(db.select().from(users).all())

// TODO(练习)1: 加第 4 个用户并给他两篇文章，重新运行验证幂等性
