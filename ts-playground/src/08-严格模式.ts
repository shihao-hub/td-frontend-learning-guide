// 08 严格模式：strict: true 下最常见的报错与修复
// 本项目 tsconfig 已开 strict；creativault 同样是 strict。
// 带着报错学：把注释逐块解开，看 tsc / tsx 报什么，再注释回去

// 1. strictNullChecks：null/undefined 不再是"万金油"
const name1: string | null = Math.random() > 0.5 ? 'shawn' : null
// const len: number = name1.length // ❌ 'name1' is possibly 'null'
const len: number = name1?.length ?? 0 // ✅ 可选链 + 空值合并
console.log(len)

// 2. noImplicitAny：参数必须给类型（或可推断）
// function bad(x) { return x + 1 } // ❌ Parameter 'x' implicitly has an 'any' type
function good(x: number) {
  return x + 1
}
console.log(good(1))

// 3. 数组越界问题：TS 不检查索引越界，返回 T 而不是 T|undefined（除非 noUncheckedIndexedAccess）
const arr: number[] = [1, 2, 3]
const maybe: number | undefined = arr[10] // tsconfig 未开 noUncheckedIndexedAccess 时不报错，要靠习惯
console.log(maybe)

// 4. 类型断言 vs 类型守卫：断言是"我担保"，守卫是"我证明"
const input: unknown = '{"a":1}'
const v1 = (input as { a: number }).a // 断言：错了运行时炸
if (typeof input === 'string') {
  const v2 = JSON.parse(input) as { a: number } // 解析后仍需断言（JSON 无法静态推断）
  console.log(v1, v2)
}

// 5. 函数返回值一致性
function clamp(n: number, min: number, max: number): number {
  if (n < min) return min
  if (n > max) return max
  return n // 漏掉这行会报：Not all code paths return a value
}
console.log(clamp(150, 0, 100))

// 6. readonly 与不变性
const frozen = { list: [1, 2] } as const
// frozen.list.push(3) // ❌ Property 'push' does not exist on type 'readonly [1, 2]'
console.log(frozen.list.length)

// 7. enum vs const enum vs 联合字面量（现代 TS 更推荐字面量联合，见 03）
const ENV = { dev: 'development', prod: 'production' } as const
type Env = (typeof ENV)[keyof typeof ENV] // 'development' | 'production'
const env: Env = ENV.dev
console.log(env)

// TODO(练习)1: 写 safeGet<T>(arr: T[], i: number): T | undefined，体会为什么返回类型要带 undefined
// TODO(练习)2: 跑 pnpm check，确认本文件 0 报错；再故意把 len 那行改成 name1.length，看报错信息长什么样

export {}
