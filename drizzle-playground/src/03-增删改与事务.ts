// 03 增删改 + 事务：写操作三板斧，transaction 保证原子性

import { eq, sql } from 'drizzle-orm'
import { db } from './db'
import { posts, users } from './db/schema'

// INSERT：已在 01 见过；这里演示"取号再插入"
const [newUser] = db
  .insert(users)
  .values({ name: 'dave', email: `dave-${Date.now()}@drizzle.dev` }) // email 有 UNIQUE 约束，加时间戳防重跑冲突
  .returning()
  .all()

// UPDATE：where 必须带（不带 = 全表更新，Drizzle 不拦你，Python 那边也一样）
db.update(posts).set({ views: sql`${posts.views} + 10` }).where(eq(posts.id, 1)).run() // 原子自增用 sql 表达式
db.update(users).set({ name: 'dave2' }).where(eq(users.id, newUser.id)).run()

// DELETE
const removed = db.delete(posts).where(eq(posts.userId, newUser.id)).run()
console.log('新用户及其文章已清理，删除行数:', removed.changes)
db.delete(users).where(eq(users.id, newUser.id)).run()

// TRANSACTION：要么全成要么全滚（对比 SQLAlchemy 的 async with session.begin()）
try {
  db.transaction((tx) => {
    const [u] = tx
      .insert(users)
      .values({ name: 'eve', email: `eve-${Date.now()}@drizzle.dev` })
      .returning()
      .all()
    tx.insert(posts).values({ userId: u.id, title: '事务里的文章', published: true }).run()
    // 故意制造失败：email 重复触发 UNIQUE 冲突 → 整个事务回滚，users 里也不会有 eve
    tx.insert(users).values({ name: 'dup', email: u.email }).run()
  })
  console.log('unreachable（上面必然抛错）')
} catch (e) {
  console.log('✓ 事务回滚成功（新用户+文章都没写进去）:', (e as Error).message.slice(0, 60))
}

console.log('当前用户数:', db.select().from(users).all().length)

// TODO(练习)1: 写一个"发布文章"事务：插入文章 + 给作者发一条通知记录（需自己加 notifications 表，改 schema 后 pnpm db:push）
