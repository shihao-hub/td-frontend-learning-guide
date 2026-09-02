// 05 数组方法的类型流动：map / filter / reduce
// Python 类比：列表推导式 + functools.reduce，但回调参数类型自动推断

type OrderStatus = 'paid' | 'pending' // 先给字面量联合一个名字
interface Order {
  id: number
  amount: number
  status: OrderStatus
}
const orders: Order[] = [
  { id: 1, amount: 99, status: 'paid' },
  { id: 2, amount: 199, status: 'pending' },
  { id: 3, amount: 59, status: 'paid' },
]

// 1. map：类型随回调返回值流动
const amounts: number[] = orders.map((o) => o.amount)
const labels: string[] = orders.map((o) => `#${o.id}:${o.status}`)
console.log(amounts, labels)

// 2. filter + 类型谓词（type guard）
const paid = orders.filter((o) => o.status === 'paid')
console.log('paid:', paid)

function isPaid(o: Order): o is Order & { status: 'paid' } {
  return o.status === 'paid'
}
const paid2 = orders.filter(isPaid) // 谓词让 filter 后类型更精确
console.log('paid2:', paid2.length)

// 3. reduce：手动标注初始值类型，否则默认推断会错
const total = orders.reduce((sum, o) => sum + o.amount, 0)
const byStatus = orders.reduce<Record<string, number>>((acc, o) => {
  acc[o.status] = (acc[o.status] ?? 0) + 1
  return acc
}, {})
console.log({ total, byStatus })

// 4. find / some / every / sort 链式组合（日常业务管道）
const big = orders.find((o) => o.amount > 100)
const anyPending = orders.some((o) => o.status === 'pending')
const allPaid = orders.every((o) => o.status === 'paid')
const sorted = [...orders].sort((a, b) => b.amount - a.amount) // sort 会改原数组，习惯先拷贝
console.log({ big, anyPending, allPaid, sorted: sorted.map((o) => o.id) })

// 5. 解构与展开（ES6+，配合类型）
const [first, ...rest] = orders
const merged = [...orders, { id: 4, amount: 10, status: 'pending' as const }]
console.log(first.id, rest.length, merged.length)

// TODO(练习)1: 计算 orders 里 paid 订单的金额总和（用 filter + reduce）
// TODO(练习)2: 写函数 toMap<T extends {id:number}>(items: T[]): Map<number, T>，转成 id 索引的 Map 并测试

export {}
