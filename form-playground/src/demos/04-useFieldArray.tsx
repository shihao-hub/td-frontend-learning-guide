// 04 useFieldArray：动态字段组（多条联系方式/多行明细的标配）

import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const inviteSchema = z.object({
  invitees: z
    .array(
      z.object({
        name: z.string().min(1, '姓名必填'),
        email: z.email('邮箱格式不对'),
      }),
    )
    .min(1, '至少邀请 1 人'),
})

type InviteForm = z.infer<typeof inviteSchema>

export default function Demo04() {
  const { register, handleSubmit, control, formState: { errors } } = useForm<InviteForm>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { invitees: [{ name: '', email: '' }] },
  })

  // field-array id 是 RHF 生成的稳定 key（千万别用 index 当 key）
  const { fields, append, remove } = useFieldArray({ control, name: 'invitees' })

  return (
    <section className="card">
      <h2>04 useFieldArray 动态字段</h2>
      <form onSubmit={handleSubmit((d) => alert(`邀请 ${d.invitees.length} 人`))} style={{ maxWidth: 480, display: 'grid', gap: 10 }}>
        {fields.map((f, i) => (
          <div key={f.id} className="row" style={{ alignItems: 'flex-start' }}>
            <div style={{ display: 'grid', gap: 4 }}>
              <input {...register(`invitees.${i}.name` as const)} placeholder={`姓名 ${i + 1}`} />
              {errors.invitees?.[i]?.name && <p style={{ color: '#dc2626', fontSize: 13, margin: 0 }}>{errors.invitees[i]?.name?.message}</p>}
            </div>
            <div style={{ display: 'grid', gap: 4 }}>
              <input {...register(`invitees.${i}.email` as const)} placeholder="邮箱" />
              {errors.invitees?.[i]?.email && <p style={{ color: '#dc2626', fontSize: 13, margin: 0 }}>{errors.invitees[i]?.email?.message}</p>}
            </div>
            <button type="button" onClick={() => remove(i)} disabled={fields.length === 1}>删</button>
          </div>
        ))}
        <div className="row">
          <button type="button" onClick={() => append({ name: '', email: '' })}>+ 添加邀请人</button>
          <button className="primary" type="submit">发送邀请</button>
        </div>
        {typeof errors.invitees?.message === 'string' && <p style={{ color: '#dc2626' }}>{errors.invitees.message}</p>}
        <p className="muted">注意 register 路径写法：invitees.{`{i}`}.name（模板字符串拼路径）</p>
      </form>
      {/* TODO(练习)1: 上限 5 人，超出时禁用"添加"按钮（fields.length 判断） */}
    </section>
  )
}
