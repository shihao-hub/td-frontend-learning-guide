// 02 Zod schema：校验规则和数据形状写一处，TS 类型还能从 schema 反推（schema 即类型即校验）
// creativault 标配组合：zodResolver(schema) + useForm<z.infer<typeof schema>>

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const profileSchema = z.object({
  nickname: z.string().min(2, '昵称至少 2 个字').max(20, '最多 20 个字'),
  email: z.email('邮箱格式不对'),
  age: z.coerce.number().int().min(1, '至少 1 岁').max(150, '不太对吧'), // coerce: input 的字符串自动转数字
  bio: z.string().max(100, '简介最多 100 字').optional(),
  website: z.url('URL 格式不对').optional().or(z.literal('')),
})

type ProfileForm = z.infer<typeof profileSchema> // ✨ 类型从 schema 来，不用写两遍

export default function Demo02() {
  // ⚠️ z.coerce 场景必须写三个泛型：输入类型(input)、context、转换后输出(output)
  // 不写的话 resolver 类型对不上（input 的 age 是 unknown，output 才是 number）——真实项目高频坑
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.input<typeof profileSchema>, unknown, z.output<typeof profileSchema>>({
    resolver: zodResolver(profileSchema), // 校验交给 zod
    defaultValues: { nickname: '', email: '', age: 18, bio: '', website: '' },
  })

  const onSubmit = (data: ProfileForm) => alert(`✓ 校验通过\n${JSON.stringify(data, null, 2)}`)

  const field = (name: keyof ProfileForm, label: string, input: React.ReactNode) => (
    <div>
      <label style={{ display: 'block', fontSize: 13, marginBottom: 4 }}>{label}</label>
      {input}
      <p style={{ color: '#dc2626', margin: '4px 0 0', fontSize: 13 }}>{errors[name]?.message}</p>
    </div>
  )

  return (
    <section className="card">
      <h2>02 Zod schema 与错误显示</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 380, display: 'grid', gap: 10 }}>
        {field('nickname', '昵称', <input {...register('nickname')} />)}
        {field('email', '邮箱', <input {...register('email')} placeholder="you@example.com" />)}
        {field('age', '年龄', <input {...register('age')} type="number" />)}
        {field('bio', '简介（可选）', <textarea {...register('bio')} rows={2} />)}
        {field('website', '个人主页（可选）', <input {...register('website')} placeholder="https://" />)}
        <button className="primary" type="submit" disabled={isSubmitting}>提交（全过才弹窗）</button>
      </form>
      {/* TODO(练习)1: 给 website 加"必须 https 开头"规则（提示 refine 或 startsWith） */}
    </section>
  )
}
