// 04 泛型：类型的"参数化"
// Python 类比：TypeVar（def first(items: list[T]) -> T），TS 泛型更常用也更严格

// 1. 泛型函数：调用时 T 由实参推断
function first<T>(items: T[]): T | undefined {
  return items[0]
}
const n = first([1, 2, 3]) // T=number，返回 number|undefined
const s = first(['a', 'b']) // T=string
console.log(n, s)

// 2. 泛型约束：要求 T 具备某属性
function pickLongest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b
}
console.log(pickLongest('typescript', 'go'))
console.log(pickLongest([1, 2, 3], [1, 2]))
// pickLongest(1, 2) // ❌ number 没有 length，取消注释看报错

// 3. 泛型接口 / 类型：库 API 的标配（Promise<T>、Array<T> 你已经天天在用）
interface Box<T> {
  value: T
}
function makeBox<T>(value: T): Box<T> {
  return { value }
}
const box = makeBox(10) // Box<number>
console.log(box.value)

// 4. keyof / 索引访问：类型层面的反射
interface User {
  id: number
  name: string
  email?: string
}
type UserKeys = keyof User // 'id' | 'name' | 'email'
type IdType = User['id'] // number

function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}
const u: User = { id: 1, name: 'shawn' }
console.log(getProp(u, 'name'), getProp(u, 'id'))

// 5. 泛型默认值
interface Paginated<T = unknown> {
  items: T[]
  total: number
}
const page: Paginated<string> = { items: ['a'], total: 1 }
console.log(page)

// TODO(练习)1: 写 function unique<T>(items: T[]): T[] 去重（提示 Set）
// TODO(练习)2: 写 function groupBy<T, K extends string | number>(items: T[], key: (item: T) => K): Record<K, T[]>，按 key 分组并测试

export {}
