// 03 watch / setValue / useFormState：RHF 里的"受控"姿势（订阅最小化，只在需要的值变化时渲染）

import { useForm } from 'react-hook-form'

interface OrderForm {
  plan: 'monthly' | 'yearly'
  seats: number
  coupon: string
  note: string
}

const PRICE = { monthly: 30, yearly: 300 }

export default function Demo03() {
  const { register, handleSubmit, watch, setValue, formState } = useForm<OrderForm>({
    defaultValues: { plan: 'monthly', seats: 1, coupon: '', note: '' },
  })

  const plan = watch('plan') // 单值订阅：只订阅 plan，sears 变化不触发这里重渲染
  const seats = watch('seats')
  const coupon = watch('coupon')
  const total = PRICE[plan] * seats * (coupon.toLowerCase() === 'vip' ? 0.8 : 1)

  return (
    <section className="card">
      <h2>03 watch / setValue / 表单联动</h2>
      <form onSubmit={handleSubmit((d) => alert(JSON.stringify(d)))} style={{ maxWidth: 380, display: 'grid', gap: 10 }}>
        <div className="row">
          {(['monthly', 'yearly'] as const).map((p) => (
            <label key={p} style={{ cursor: 'pointer' }}>
              <input type="radio" value={p} {...register('plan')} /> {p === 'monthly' ? '月付 ¥30' : '年付 ¥300'}
            </label>
          ))}
        </div>
        <div className="row">
          <button type="button" onClick={() => setValue('seats', Math.max(1, seats - 1))}>−</button>
          <span>席位数：{seats}</span>
          <button type="button" onClick={() => setValue('seats', seats + 1)}>+</button>
        </div>
        <input {...register('coupon')} placeholder="优惠码（试试 vip）" />
        <textarea {...register('note')} rows={2} placeholder="备注" />
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <span className="badge">应付：¥{total}{coupon.toLowerCase() === 'vip' ? '（8折）' : ''}</span>
          <span className="muted">脏表单：{formState.isDirty ? '是' : '否'}｜已触碰字段数：{Object.keys(formState.touchedFields).length}</span>
        </div>
        <button className="primary" type="submit">下单</button>
      </form>
      {/* TODO(练习)1: 年付时席位数自动 ×0.9 显示"企业折扣"标签（watch + 条件渲染） */}
    </section>
  )
}
