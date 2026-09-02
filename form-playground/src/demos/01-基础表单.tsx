// 01 基础表单：register 把 input "注册"进表单，handleSubmit 统一收集
// 对比 react-playground/06 的手写受控：RHF 用非受控 ref 注册，重渲染极少（这是它快的原因）

import { useForm } from 'react-hook-form'

interface FormData {
  username: string
  password: string
}

export default function Demo01() {
  //泛型指定数据形状；register 返回的 {onChange onBlur name ref} 展开到 input 上
  const { register, handleSubmit, formState } = useForm<FormData>({ defaultValues: { username: '', password: '' } })

  const onSubmit = (data: FormData) => alert(`提交成功：\n${JSON.stringify(data, null, 2)}`)

  return (
    <section className="card">
      <h2>01 基础表单：register / handleSubmit</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 360, display: 'grid', gap: 10 }}>
        <div>
          <input {...register('username', { required: '用户名必填', minLength: { value: 2, message: '至少 2 个字符' } })} placeholder="用户名" />
          <p style={{ color: '#dc2626', margin: '4px 0 0', fontSize: 13 }}>{formState.errors.username?.message}</p>
        </div>
        <div>
          <input {...register('password', { required: '密码必填', minLength: { value: 6, message: '至少 6 位' } })} type="password" placeholder="密码" />
          <p style={{ color: '#dc2626', margin: '4px 0 0', fontSize: 13 }}>{formState.errors.password?.message}</p>
        </div>
        <button className="primary" type="submit" disabled={formState.isSubmitting}>提交</button>
        <p className="muted">规则直接写在 register 里（简单场景够用）；复用和复杂校验见 02 的 Zod</p>
      </form>
      {/* TODO(练习)1: 加"确认密码"字段，用 validate: (v) => v === watch('password') || '两次不一致'（watch 见 03） */}
    </section>
  )
}
