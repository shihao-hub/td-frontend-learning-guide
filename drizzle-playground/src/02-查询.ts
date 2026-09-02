// 02 查询：select / where / orderBy / limit —— 对照 SQLAlchemy 的 select(...).where(...)

import { and, desc, eq, gt, like, or } from 'drizzle-orm'
import { db } from './db'
import { posts, users } from './db/schema'

// 全量
const allUsers = db.select().from(users).all() // better-sqlite3 驱动：同步方法 .all()/.get()/.run()

// 精确条件（eq = ==）+ 只取一条
const alice = db.select().from(users).where(eq(users.email, 'alice@drizzle.dev')).get()

// 组合条件：and / or / 比较 / 模糊
const hotDrafts = db
  .select()
  .from(posts)
  .where(and(eq(posts.published, false), gt(posts.views, 1))) // 未发布且 views>1
  .all()

const search = db
  .select()
  .from(posts)
  .where(or(like(posts.title, '%Drizzle%'), like(posts.content, '%SQLite%')))
  .orderBy(desc(posts.views)) // 按浏览量降序
  .limit(10)
  .all()

// 投影：只取需要的列（返回类型自动收窄）
const titles = db.select({ id: posts.id, title: posts.title, views: posts.views }).from(posts).all()

console.log('全部用户:', allUsers.map((u) => u.name))
console.log('alice:', alice?.email)
console.log('热门草稿:', hotDrafts.map((p) => p.title))
console.log('搜索结果:', search.map((p) => `${p.title}(${p.views})`))
console.table(titles)

// TODO(练习)1: 查询 views 在 10~200 之间的已发布文章（提示 between 或 and(gte, lte)）
// TODO(练习)2: 查询所有 email 以 drizzle.dev 结尾的用户数量（提示 count：db.select({ n: count() })）
