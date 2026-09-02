// 05 服务端校验与提交状态：真实项目的完整闭环（客户端 Zod 快速反馈 + 服务端唯一真相）
// 这里用 setTimeout 模拟后端返回字段级错误，creativault 里对应 Server Action / API 的 422 响应

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const signUpSchema = z.object({
  username: z.string().min(3, '至少 3 位'),
})

type SignUp = z.infer<typeof signUpSchema>

// 模拟服务端：用户名 "admin" 已被占用
function mockApi(data: SignUp): Promise<{ ok: true } | { ok: false; field: 'username'; message: string }> {
  return new Promise((resolve) =>
    setTimeout(() => {
      if (data.username === 'admin') resolve({ ok: false, field: 'username', message: '该用户名已被占用（服务端返回）' })
      else resolve({ ok: true })
    }, 1200),
  )
}

export default function Demo05() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<SignUp>({ resolver: zodResolver(signUpSchema) })

  const onSubmit = async (data: SignUp) => {
    clearErrors('username')
    const res = await mockApi(data)
    if (!res.ok) {
      // 服务端字段错误回填到表单：setError 与客户端校验错误同一种展示
      setError('username', { type: 'server', message: res.message })
      return
    }
  }

  return (
    <section className="card">
      <h2>05 服务端校验与提交状态</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 360, display: 'grid', gap: 10 }}>
        <div>
          <input {...register('username')} placeholder="用户名（输入 admin 试试已被占用）" />
          <p style={{ color: '#dc2626', margin: '4px 0 0', fontSize: 13 }}>{errors.username?.message}</p>
        </div>
        <button className="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? '注册中…' : '注册'}
        </button>
        {isSubmitSuccessful && !errors.username && <p style={{ color: '#059669' }}>✓ 注册成功</p>}
      </form>
      <p className="muted" style={{ marginTop: 8 }}>isSubmitting 期间按钮自动禁用；同一套 errors 展示客户端/服务端两种来源</p>
      {/* TODO(练习)1: mockApi 加"用户名不能是 test"，同样走 setError 回填 */}
    </section>
  )
}
