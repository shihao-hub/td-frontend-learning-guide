// 06 事件处理与受控输入：React 推荐全部受控（value + onChange 成对出现）
// 对比传统后端模板：Jinja2 提交后整页刷新；React 里每次击键都更新 state → UI 即时反馈

import { useState } from 'react'

export default function Demo06() {
  const [text, setText] = useState('')
  const [amount, setAmount] = useState(1)
  const [fruit, setFruit] = useState('apple')

  return (
    <section id="d06" className="card">
      <h2>06 事件处理与受控输入</h2>

      <div className="row">
        {/* 受控文本框：value 绑 state，onChange 写回 state（数据流闭环） */}
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="输入点什么" />
        <span className="muted">长度 {text.length}｜双向：{text}</span>
      </div>

      <div className="row" style={{ marginTop: 12 }}>
        <button onClick={() => setAmount((a) => Math.max(1, a - 1))}>-</button>
        <span>数量：{amount}</span>
        <button onClick={() => setAmount((a) => a + 1)}>+</button>
      </div>

      <div className="row" style={{ marginTop: 12 }}>
        <select value={fruit} onChange={(e) => setFruit(e.target.value)}>
          <option value="apple">苹果</option>
          <option value="banana">香蕉</option>
          <option value="cherry">樱桃</option>
        </select>
        <span className="badge">{fruit}</span>
      </div>

      <form
        style={{ marginTop: 12 }}
        onSubmit={(e) => {
          e.preventDefault() // 阻止原生提交刷新页面；真实表单用 form-playground 的 RHF
          alert(`提交：${text} x${amount} (${fruit})`)
        }}
      >
        <button className="primary" type="submit">提交</button>
      </form>

      {/* TODO(练习)1: 加一个 checkbox"需要打包"，勾选时提交内容后追加"(已打包)" */}
      {/* TODO(练习)2: 给文本框加 maxLength=10 并显示剩余字数 */}
    </section>
  )
}
