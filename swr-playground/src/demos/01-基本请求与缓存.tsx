// 01 基本请求与缓存：useSWR(key, fetcher)，key 相同的组件共享同一次请求
// SWR = stale-while-revalidate：先给缓存（旧数据立即显示），后台再验证更新

import useSWR from 'swr'
import { fetchUsers, stats } from '../lib/api'

// 两个组件用同一个 key：只有一次网络请求（Console 看请求计数）
function UserList() {
  const { data, isLoading } = useSWR('users', fetchUsers)
  console.log('[01 UserList] 渲染，累计请求数:', stats.count)
  if (isLoading) return <p className="muted">加载中…（600ms 假延迟）</p>
  return (
    <ul>
      {data?.map((u) => (
        <li key={u.id}>
          {u.name} <span className="muted">({u.role})</span>
        </li>
      ))}
    </ul>
  )
}

function UserCount() {
  const { data } = useSWR('users', fetchUsers) // 同 key → 命中同一缓存，不发第二次请求
  return <span className="badge">共 {data?.length ?? '…'} 人</span>
}

export default function Demo01() {
  return (
    <section className="card">
      <h2>01 基本请求与缓存</h2>
      <div className="row">
        <UserCount />
        <span className="muted">切换到别的标签页再切回来 → focus 重新验证（stale-while-revalidate 体验）</span>
      </div>
      <UserList />
      {/* TODO(练习)1: 再复制一个组件用 key 'users' 渲染邮箱列表，验证依旧只有一次请求 */}
    </section>
  )
}
