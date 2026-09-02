// 04 条件请求与依赖请求：key 为 null 时不发；后续 key 依赖前面数据时自动串行

import useSWR from 'swr'
import { useState } from 'react'
import { fetchUser, fetchUsers } from '../lib/api'

export default function Demo04() {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  // ① 条件请求：没选中时 key=null → SWR 不发请求
  const { data: users } = useSWR('users4', fetchUsers)

  // ② 依赖请求：key 里包含 users?.length，前一个没回来时这条不发
  const { data: detail, isLoading } = useSWR(
    selectedId ? ['user', selectedId] : null, // 数组 key：多参数用数组（自动序列化区分）
    ([, id]) => fetchUser(id as number),
  )
  void users

  return (
    <section className="card">
      <h2>04 条件 / 依赖请求</h2>
      <div className="row">
        <button onClick={() => setSelectedId(null)}>不选（key=null 不请求）</button>
        {[1, 2, 3].map((id) => (
          <button key={id} className={selectedId === id ? 'primary' : ''} onClick={() => setSelectedId(id)}>
            用户{id}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 10, minHeight: 48 }}>
        {selectedId === null ? (
          <p className="muted">未选中任何用户 → useSWR 第一参数为 null，不发请求</p>
        ) : isLoading ? (
          <p className="muted">加载用户 {selectedId} 详情…</p>
        ) : (
          <p>
            <strong>{detail?.name}</strong> <span className="muted">{detail?.email} / {detail?.role}</span>
          </p>
        )}
      </div>
      <p className="muted">细节：数组 key ['user', id] 每个组合独立缓存——切来切去秒开（第二次命中缓存）</p>
      {/* TODO(练习)1: 再加一层依赖：显示该用户名反转字符串，依赖 detail?.name（useSWR key 为 detail ? 'reverse-xxx' : null 的思路） */}
    </section>
  )
}
