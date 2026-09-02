// 服务端子组件：没有 'use client'，跟随父级留在服务端（边界是"从该文件往下"都算客户端）
export default function ServerChild() {
  const from = '我是服务端组件的孩子，同样在服务端渲染'
  return (
    <p>
      <span className="badge server">Server</span> {from}
    </p>
  )
}
