// 慢数据：async 服务端组件，2 秒后就绪（被 Suspense 接管）
async function getSlowData() {
  await new Promise((r) => setTimeout(r, 2000))
  return Array.from({ length: 5 }, (_, i) => ({ id: i, label: `报表-${i + 1}`, value: (i + 1) * 137 }))
}

export default async function SlowPanel() {
  const rows = await getSlowData()
  return (
    <div>
      <span className="badge server">Server</span>
      <table style={{ borderCollapse: 'collapse', marginTop: 8 }}>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td style={{ padding: '2px 16px 2px 0' }}>{r.label}</td>
              <td style={{ padding: '2px 0', textAlign: 'right' }}>{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
