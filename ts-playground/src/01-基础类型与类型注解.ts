// 01 基础类型与类型注解：注解 vs 推断
// Python 类比：def f(x: int) -> str ... TS 注解更严格，且编译期报错（Python 运行期才报）

// 1. 显式注解：变量、函数参数、返回值
const userName: string = 'shawn'
const age: number = 30
const isAdmin: boolean = true
const ids: number[] = [1, 2, 3] // 等价 Array<number>，类比 Python list[int]

function greet(name: string, hour: number): string {
  return hour < 12 ? `早上好, ${name}` : `你好, ${name}`
}

console.log(greet(userName, 9), { age, isAdmin, ids })

// 2. 类型推断：能推断就不必注解（TS 是结构化推断，比 Python 更强）
let count = 0 // 推断为 number，不是 any
count += 1
// count = 'x' // ❌ 取消注释看报错：Type 'string' is not assignable to type 'number'

const names = ['a', 'b'] // 推断 string[]
names.push('c')

// 3. any / unknown / void / never
let raw: any = JSON.parse('{"x":1}') // any：放弃检查（危险，尽量少用）
let safe: unknown = JSON.parse('{"x":1}')
// safe.x        // ❌ unknown 不许直接访问属性
if (typeof safe === 'object' && safe !== null && 'x' in safe) {
  console.log('unknown 收窄后可用:', (safe as { x: number }).x) // 收窄 + 断言
}

function log(msg: string): void {
  console.log(msg) // void：无返回值，类比 Python 的 -> None
}

function fail(message: string): never {
  throw new Error(message) // never：永不返回
}

log('done')
try {
  fail('演示 never')
} catch (e) {
  console.log('caught:', (e as Error).message)
}

// TODO(练习)1: 声明一个 Product 类型注解版变量（name: string, price: number, tags: string[]）并打印
const product: { name: string; price: number; tags: string[] } = {
  name: '机械键盘',
  price: 399,
  tags: ['外设', '办公'],
}
console.log(product)

// TODO(练习)2: 写函数 formatPrice(price: number, currency: string = 'CNY'): string，返回 "¥99.00" 样式（提示 toFixed）
function formatPrice(price: number, currency: string = 'CNY'): string {
  const symbol = currency === 'USD' ? '$' : '¥'
  return `${symbol}${price.toFixed(2)}`
}

console.log(formatPrice(99))          // ¥99.00（currency 不传，默认参数生效）
console.log(formatPrice(42.5, 'USD')) // $42.50


export {}
