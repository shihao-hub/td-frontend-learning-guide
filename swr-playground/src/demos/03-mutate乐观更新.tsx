// 03 mutate：本地缓存更新——乐观 UI 的基础（用户改名立刻生效，后台慢慢同步）

import useSWR from 'swr'
import { useState } from 'react'
import { addUser, fetchUsers, renameUser, type User } from '../lib/api'

export default function Demo03() {
  const { data, mutate } = useSWR('users3', fetchUsers)
  const [name, setName] = useState('')

  // 乐观更新三步曲：先改缓存 → 发请求 → 用服务端结果修正（失败自动回滚到 revalidate）
  const optimisticRename = async (u: User) => {
    const newName = `${u.name}-改`
    await mutate(
      async () => {
        const server = await renameUser(u.id, newName) // 请求
        return undefined
      },
      {
        optimisticData: (data ?? []).map((x) => (x.id === u.id ? { ...x, name: newName } : x)), // ① 立刻显示
        rollbackOnError: true, // 失败回滚
        populateCache: false,
        revalidate: true, // ② 最终以后台 revalidate 为准
      },
    )
  }

  const add = async () => {
    if (!name.trim()) return
    setName('')
    await mutate(
      async () => {
        await addUser(name) // 请求完成后 revalidate 拉最新列表
        return undefined
      },
      { revalidate: true },
    )
  }

  return (
    <section className="card">
      <h2>03 mutate 乐观更新</h2>
      <div className="row" style={{ marginBottom: 8 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="新用户名" />
        <button className="primary" onClick={add}>添加</button>
      </div>
      <ul>
        {data?.map((u) => (
          <li key={u.id} className="row" style={{ justifyContent: 'space-between', padding: '2px 0' }}>
            <span>{u.name}</span>
            <button onClick={() => optimisticRename(u)}>改名（乐观）</button>
          </li>
        ))}
      </ul>
      <p className="muted">点"改名"：列表<strong>瞬间</strong>变化（乐观数据），400ms 后请求完成对齐 —— 体验关键</p>
      {/* TODO(练习)1: 把 optimisticData 去掉再点改名，对比体验差异 */}
    </section>
  )
}
