// 04 关联查询：手写 join（SQL 风格）与 db.query 关系查询（ORM 风格）两种姿势

import { desc, eq } from 'drizzle-orm'
import { db } from './db'
import { posts, users } from './db/schema'

// ① 手写 innerJoin：SQL 思维，灵活（多表、复杂条件随便加）
const rows = db
  .select({
    author: users.name,
    title: posts.title,
    views: posts.views,
  })
  .from(posts)
  .innerJoin(users, eq(posts.userId, users.id)) // ON 条件显式写
  .orderBy(desc(posts.views))
  .all()
console.table(rows)

// ② db.query 关系查询：schema 里 relations() 的回报——"拿用户带出他的文章"
// 查询对象是 thenable：await 即执行（同步/异步驱动写法统一）
const authors = await db.query.users.findMany({
  with: { posts: true }, // 嵌套加载，不需要手写 join
  orderBy: [users.id],
})
for (const a of authors) {
  console.log(`${a.name}: ${a.posts.map((p) => p.title).join('、') || '（无文章）'}`)
}

// 反方向：文章带出作者
const topPost = await db.query.posts.findFirst({
  where: eq(posts.published, true),
  with: { author: true },
  orderBy: [desc(posts.views)],
})
console.log('最热已发布文章:', topPost?.title, '作者:', topPost?.author.name)

// TODO(练习)1: 给 schema 加 comments 表（postId 外键），seed 几条评论后用 with 加载"文章+评论"
// TODO(练习)2: 统计每个作者的文章数（提示：groupBy + count，参考 drizzle 文档 aggregates）

export {}
