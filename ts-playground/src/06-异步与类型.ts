// 06 异步与类型：Promise / async-await
// Python 类比：asyncio 的 await 语法几乎一样，但 TS 的 Promise 是标准库一等公民

// 1. 手写 Promise（认识类型签名，实际很少裸写）
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// 2. async 函数：返回值永远被包成 Promise<T>
async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  await delay(100) // 模拟网络
  return { id, name: `user-${id}` }
}

// 3. 串行 vs 并行
async function serial() {
  const a = await fetchUser(1)
  const b = await fetchUser(2) // 等 a 完才开始
  return [a, b]
}
async function parallel() {
  const [a, b] = await Promise.all([fetchUser(1), fetchUser(2)]) // 同时发
  return [a, b]
}

// 4. 错误处理：try/catch + finally（Python 的 try/except/finally）
async function risky(): Promise<string> {
  try {
    const u = await fetchUser(3)
    return u.name
  } catch (e) {
    return `失败: ${(e as Error).message}`
  } finally {
    console.log('risky 结束')
  }
}

// 5. Promise.all / allSettled / race 的类型差异
const results = await Promise.allSettled([fetchUser(1), Promise.reject(new Error('boom'))])
for (const r of results) {
  if (r.status === 'fulfilled') console.log('成功:', r.value.name)
  else console.log('失败:', r.reason.message) // allSettled 不会整体失败
}

// 6. 顶层 await（tsx/ESM 支持）：不用包 main() 了
const [s1, s2, r] = await Promise.all([serial(), parallel(), risky()])
console.log(s1, s2, r)

// TODO(练习)1: 写 retry<T>(fn: () => Promise<T>, times: number): Promise<T>，失败自动重试指定次数后抛最后一次错误
// TODO(练习)2: 写 withTimeout<T>(p: Promise<T>, ms: number): Promise<T>，超时抛 TimeoutError（提示 Promise.race + AbortController 思路）

export {}
