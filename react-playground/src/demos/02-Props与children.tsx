// 02 Props 与 children：父 → 子的单向数据流
// Python 类比：函数参数 + 关键字参数；children = 位置参数里的"内容"

interface UserCardProps {
  name: string
  email: string
  vip?: boolean // 可选 prop 带默认值
  onRemove?: () => void // 回调 prop：子组件"向上通信"的唯一方式
  children?: React.ReactNode // 标签中间的内容
}

function UserCard({ name, email, vip = false, onRemove, children }: UserCardProps) {
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 12, minWidth: 200 }}>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <strong>{name}</strong>
        {vip && <span className="badge">VIP</span>}
        {onRemove && (
          <button onClick={onRemove} aria-label="删除">
            ×
          </button>
        )}
      </div>
      <div className="muted">{email}</div>
      {children && <div style={{ marginTop: 8 }}>{children}</div>}
    </div>
  )
}

export default function Demo02() {
  return (
    <section id="d02" className="card">
      <h2>02 Props 与 children</h2>
      <div className="row">
        <UserCard name="shawn" email="shawn@example.com">
          <span className="muted">这行是 children 传进来的</span>
        </UserCard>
        <UserCard name="admin" email="admin@example.com" vip onRemove={() => alert('回调：删除 admin')}>
          <span className="muted">vip=true 时显示徽章</span>
        </UserCard>
      </div>
      {/* TODO(练习)1: 给 UserCard 加一个 online?: boolean prop，在线时名字前加 🟢（提示：{online && '🟢'}） */}
    </section>
  )
}
