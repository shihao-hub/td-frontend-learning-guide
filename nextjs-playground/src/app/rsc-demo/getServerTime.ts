'use server'

// 服务端函数：整个文件都是服务端代码，导出的函数可被客户端组件 import 调用
// creativault 的 src/actions/ 目录就是这个模式（P2 核心知识）

export default async function getServerTime(): Promise<string> {
  // 这里可以查数据库、读密钥、调内部服务——浏览器永远接触不到这些代码与数据
  await new Promise((r) => setTimeout(r, 300))
  return new Date().toLocaleTimeString('zh-CN', { timeZone: 'Asia/Shanghai' })
}
