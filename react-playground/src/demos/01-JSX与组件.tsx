// 01 JSX 与组件：组件 = 返回 UI 的函数（对比 FastAPI 路由函数返回 JSON，这里返回"UI 描述"）
// 注意：组件名必须大写开头，JSX 是语法糖（编译成 React.createElement / jsx 调用）

function Greeting() {
  const name = 'shawn'
  // JSX 里 {} 塞任意 JS 表达式；class → className；style 接收对象
  return (
    <div>
      <h3>你好，{name.toUpperCase()}！</h3>
      <p className="muted">当前时间：{new Date().toLocaleTimeString()}（页面不会自己走，见 04 useEffect）</p>
      {/* 列表/条件渲染见 05/07 */}
    </div>
  )
}

export default function Demo01() {
  return (
    <section id="d01" className="card">
      <h2>01 JSX 与组件</h2>
      <Greeting />
      {/* TODO(练习)1: 写一个 Badge 组件渲染 <span className="badge">{text}</span>，text 通过子组件属性外部传入（见 02 再改进） */}
    </section>
  )
}
