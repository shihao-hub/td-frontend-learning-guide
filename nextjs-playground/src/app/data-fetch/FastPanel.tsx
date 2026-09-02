// 快数据：立即返回
export default function FastPanel() {
  const data = { source: '同步计算', at: new Date().toISOString() }
  return (
    <p>
      <span className="badge server">Server</span> {data.source} @ {data.at}
    </p>
  )
}
