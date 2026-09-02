// 05 轮询 / 配置：refreshInterval 做仪表盘类刷新；全局 SWRConfig 统一配置

import useSWR from 'swr'
import { fetchUsers, stats } from '../lib/api'

export default function Demo05() {
  // refreshInterval：每 3s 后台刷新；页面不可见时自动暂停（refreshWhenHidden 默认 false）
  const { data } = useSWR('users5', fetchUsers, {
    refreshInterval: 3000,
    dedupingInterval: 1000, // 1s 内相同请求去重
    keepPreviousData: true, // 刷新期间继续显示旧数据（不闪 loading）
  })

  return (
    <section className="card">
      <h2>05 轮询与配置</h2>
      <p>
        当前 <strong>{data?.length ?? 0}</strong> 个用户 · 累计请求 <strong>{stats.count}</strong> 次
      </p>
      <p className="muted">
        每 3 秒自动轮询；切到别的标签页会暂停（省请求）；keepPreviousData 让刷新期间不闪 loading。
        大写提醒：creativault 真实项目里 SWRConfig 常在 app 顶层统一配 fetcher + 全局选项。
      </p>
      {/* TODO(练习)1: 把 refreshInterval 改成 1000 观察请求计数增长；再改回 3000 */}
    </section>
  )
}
