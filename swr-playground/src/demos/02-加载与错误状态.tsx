// 02 加载与错误状态：isLoading / error 的标准三段式 UI（SWR 自带重试，无需手写）

import useSWR from 'swr'
import { fetchUsers, setFailureRate } from '../lib/api'

export default function Demo02() {
  const { data, error, isLoading } = useSWR('users2', fetchUsers, {
    // 重试策略：错误后指数退避，最多 3 次
    errorRetryCount: 3,
    errorRetryInterval: 1000,
  })

  return (
    <section className="card">
      <h2>02 加载 / 错误 / 重试</h2>
      <div className="row" style={{ marginBottom: 8 }}>
        <button onClick={() => setFailureRate(0)}>故障率 0%（正常）</button>
        <button onClick={() => setFailureRate(0.5)}>故障率 50%</button>
        <span className="muted">改完点"重新挂载"或切窗口验证</span>
      </div>

      {isLoading ? (
        <p className="muted">加载中…</p>
      ) : error ? (
        // 错误分支：重试 3 次仍失败才走到这里；retrying 时 data 为空且 isLoading=false
        <p style={{ color: '#dc2626' }}>❌ {error.message}（已自动重试 3 次）</p>
      ) : (
        <p style={{ color: '#059669' }}>✓ {data?.length} 个用户加载成功</p>
      )}

      <p className="muted">UI 模式：isLoading → loading 界面；error → 错误界面；否则数据界面</p>
      {/* TODO(练习)1: 给错误界面加"手动重试"按钮（提示：useSWR 返回的 mutate 或 key 传 null 再恢复） */}
    </section>
  )
}
