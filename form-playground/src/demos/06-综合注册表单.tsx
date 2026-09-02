// 06 综合实战：一个"接近真实"的注册表单——Zod 全量校验 + 联动 + 动态字段 + 提交状态
// 这是 form-playground 的毕业练习：先自己写，卡住再对照实现

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const registerSchema = z
  .object({
    name: z.string().min(2, '姓名至少 2 个字'),
    email: z.email('邮箱格式不对'),
    password: z.string().min(8, '至少 8 位').regex(/[A-Z]/, '须含大写字母').regex(/\d/, '须含数字'),
    confirmPassword: z.string(),
    role: z.enum(['developer', 'designer', 'manager']),
    skills: z.array(z.string().min(1, '技能不能为空')).min(1, '至少填 1 项技能'),
    agree: z.literal(true, { message: '必须同意条款' }),
  })
  .refine((d) => d.password === d.confirmPassword, { path: ['confirmPassword'], message: '两次密码不一致' }) // 跨字段校验
type RegisterForm = z.infer<typeof registerSchema>

const empty = { name: '', email: '', password: '', confirmPassword: '', skills: [''] }

export default function Demo06() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { ...empty, role: 'developer', agree: false } as unknown as RegisterForm,
  })

  const skills = watch('skills')

  const onSubmit = async (d: RegisterForm) => {
    await new Promise((r) => setTimeout(r, 1000)) // 模拟请求
    console.log('提交：', d)
    alert('注册成功！数据见 Console')
  }

  const err = (msg?: string) => (msg ? <p style={{ color: '#dc2626', fontSize: 13, margin: '2px 0 0' }}>{msg}</p> : null)

  return (
    <section className="card">
      <h2>06 综合：注册表单</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 420, display: 'grid', gap: 10 }}>
        <input {...register('name')} placeholder="姓名" />
        {err(errors.name?.message)}
        <input {...register('email')} placeholder="邮箱" />
        {err(errors.email?.message)}
        <input {...register('password')} type="password" placeholder="密码（8位+大写+数字）" />
        {err(errors.password?.message)}
        <input {...register('confirmPassword')} type="password" placeholder="确认密码" />
        {err(errors.confirmPassword?.message)}
        <select {...register('role')}>
          <option value="developer">开发者</option>
          <option value="designer">设计师</option>
          <option value="manager">经理</option>
        </select>
        {skills.map((_, i) => (
          <div key={i} className="row">
            <input {...register(`skills.${i}` as const)} placeholder={`技能 ${i + 1}`} />
            <button type="button" onClick={() => setValue('skills', skills.filter((_, j) => j !== i))}>删</button>
            {err(errors.skills?.[i]?.message)}
          </div>
        ))}
        <button type="button" onClick={() => setValue('skills', [...skills, ''])}>+ 加技能</button>
        {err(typeof errors.skills?.message === 'string' ? errors.skills.message : undefined)}
        <label style={{ fontSize: 13 }}>
          <input type="checkbox" {...register('agree')} /> 我已阅读并同意条款
        </label>
        {err(errors.agree?.message)}
        <button className="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? '提交中…' : isSubmitSuccessful ? '已注册（可重复测试）' : '注册'}
        </button>
      </form>
      {/* TODO(练习·毕业题)1: 关掉本文件实现过程，从空文件复刻这个表单（schema → resolver → UI → 错误展示） */}
    </section>
  )
}
