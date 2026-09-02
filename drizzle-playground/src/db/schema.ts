// schema：Drizzle 的核心——表定义即 TS 类型（对比 SQLAlchemy 的 Model，思路相同形式更轻）

import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }), // 主键自增（SQLite 写法）
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()), // 插入时的默认值
})

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id), // 外键（SQLite 需开启 foreign_keys 才强制，见 index.ts）
  title: text('title').notNull(),
  content: text('content'),
  published: integer('published', { mode: 'boolean' }).notNull().default(false), // SQLite 无布尔，用 0/1 映射
  views: integer('views').notNull().default(0),
})

// 关系声明：给 db.query.xxx.findMany({ with: ... }) 用的（04 演示）
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}))

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, { fields: [posts.userId], references: [users.id] }),
}))

// 类型工具：从表定义反推类型（类似 z.infer 的思路）
export type User = typeof users.$inferSelect // 查询结果的行类型
export type NewUser = typeof users.$inferInsert // 插入入参类型（id/createdAt 可省）
export type Post = typeof posts.$inferSelect
export type NewPost = typeof posts.$inferInsert
