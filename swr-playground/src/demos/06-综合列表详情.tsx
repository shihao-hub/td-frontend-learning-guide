// 06 综合实战：列表 + 详情 + 添加 + 重命名，一次串起 01~05 的知识（creativault 页面的典型形态）

import useSWR from 'swr'
import { useState } from 'react'
import { addUser, fetchUser, fetchUsers, renameUser, type User } from '../lib/api'

export default function Demo06() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [name, setName] = useState('')

  const { data: users, mutate: mutateList, isLoading } = useSWR('users6', fetchUsers)
  const { data: detail } = useSWR(selectedId ? ['user6', selectedId] : null, ([, id]) => fetchUser(id as number))
  const { data: editingName, mutate: setEditingName } = useSWR<string | null>(selectedId ? ['edit6', selectedId] : null, null)

  const rename = async () => {
    if (!selectedId || !editingName?.trim()) return
    await mutateList(
      async () => {
        await renameUser(selectedId, editingName)
        return undefined
      },
      {
        optimisticData: (users ?? []).map((u: User) => (u.id === selectedId ? { ...u, name: editingName } : u)),
        rollbackOnError: true,
        populateCache: false,
      },
    )
    setEditingName(null)
  }

  return (
    <section className="card">
      <h2>06 综合：列表 + 详情 + 操作</h2>
      <div className="row" style={{ alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          {isLoading ? (
            <p className="muted">加载中…</p>
          ) : (
            <ul>
              {users?.map((u) => (
                <li key={u.id} className="row" style={{ justifyContent: 'space-between', padding: '2px 0' }}>
                  <button className={selectedId === u.id ? 'primary' : ''} onClick={() => setSelectedId(u.id)}>
                    {u.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="row">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="新用户" />
            <button
              onClick={async () => {
                if (!name.trim()) return
                setName('')
                await mutateList(async () => {
                  await addUser(name)
                  return undefined
                })
              }}
            >
              添加
            </button>
          </div>
        </div>
        <div style={{ flex: 1, borderLeft: '1px solid #e2e8f0', paddingLeft: 16 }}>
          {!selectedId ? (
            <p className="muted">← 点选一个用户</p>
          ) : (
            <>
              <h3>{detail?.name ?? '…'}</h3>
              <p className="muted">{detail?.email} · {detail?.role}</p>
              <div className="row">
                <input value={editingName ?? ''} onChange={(e) => setEditingName(e.target.value)} placeholder="改名为…" />
                <button className="primary" onClick={rename}>保存</button>
              </div>
            </>
          )}
        </div>
      </div>
      {/* TODO(练习·毕业题)1: 不看实现，从空文件复刻"列表+详情+乐观改名+添加"四件套 */}
    </section>
  )
}
