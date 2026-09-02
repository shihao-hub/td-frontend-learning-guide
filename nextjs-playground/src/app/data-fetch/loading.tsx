// 本段路由的 loading.tsx：Next 文件约定，等价于给整页套 <Suspense>
// 访问 /data-fetch 时先看到这个骨架，页面数据就绪后自动替换

export default function Loading() {
  return (
    <div className="card">
      <p className="muted">⏳ loading.tsx：整页加载骨架（文件约定的力量）…</p>
    </div>
  )
}
