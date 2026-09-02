// 07 工具类型：TS 内置的类型级函数（creativault 代码里到处都是）
// 全部是"类型体操"，运行时零开销

interface Article {
  id: number
  title: string
  content: string
  tags: string[]
  publishedAt?: string
}

// 1. Partial<T>：全部变可选——更新接口的入参标配
function updateArticle(id: number, patch: Partial<Article>) {
  console.log('更新', id, patch)
}
updateArticle(1, { title: '新标题' })

// 2. Required<T>：全部变必选
type FullArticle = Required<Article>

// 3. Pick / Omit：挑几个字段 / 去掉几个字段（API 列表项常用 Omit 去掉大字段）
type ArticleListItem = Pick<Article, 'id' | 'title' | 'tags'>
type ArticleDraft = Omit<Article, 'id' | 'publishedAt'>

// 4. Record<K, V>：键值对（类比 dict[K, V]）
const articleCount: Record<string, number> = {}
articleCount['draft'] = 3

// 5. ReturnType / Parameters / Awaited：从函数反推类型
function parseDate(s: string): Date {
  return new Date(s)
}
type ParseResult = ReturnType<typeof parseDate> // Date
type ParseArg = Parameters<typeof parseDate>[0] // string

async function getJson() {
  return { x: 1 }
}
type JsonData = Awaited<ReturnType<typeof getJson>> // {x:number}（剥掉 Promise 外壳）

const full: FullArticle = { id: 1, title: 't', content: 'c', tags: [], publishedAt: '2026-01-01' }
const draft: ArticleDraft = { title: 'd', content: 'c', tags: [] }
console.log(full, draft, articleCount)
const pd: ParseResult = parseDate('2026-08-30')
console.log(pd, {} as JsonData)

// 6. as const / satisfies：约束值又保留字面量类型
const theme = {
  colors: { primary: '#0ea5e9', danger: '#ef4444' },
} as const // 所有值变 readonly 字面量
const config = {
  port: 3000,
  host: 'localhost',
} satisfies Record<string, string | number> // 校验形状但不加宽类型
console.log(theme.colors.primary, config.port + 1)

// TODO(练习)1: 用 Pick 定义 UserCard（name, email?），用 Omit 定义 UserCreateInput（去掉 id）
// TODO(练习)2: 写 type Nullable<T> = T | null，并声明一个 Nullable<string[]>

export {}
