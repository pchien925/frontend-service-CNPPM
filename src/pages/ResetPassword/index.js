import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import InputField from '../../components/ui/InputField'
import PasswordField from '../../components/ui/PasswordField'
import Button from '../../components/ui/Button'

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false)
  const defaultValues = { otp: '', password: '', confirmPassword: '' }
  const methods = useForm({ defaultValues })
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods

  const onSubmit = async (data) => {
    setLoading(true)
    console.log('Reset password data:', data)

    // Giả lập delay API
    await new Promise((r) => setTimeout(r, 1200))

    setLoading(false)
    alert('Đặt lại mật khẩu thành công!')
  }

  const password = watch('password')

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-primary/10 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-4xl font-bold mb-8 text-center text-light-primary">
          Đặt lại mật khẩu
        </h2>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <InputField
              label="OTP"
              placeholder="Nhập mã OTP"
              fullWidth
              required
              error={errors.otp?.message}
              {...register('otp', {
                required: 'Vui lòng nhập OTP',
                pattern: {
                  value: /^\d{4,6}$/, // giả định OTP 4-6 chữ số
                  message: 'OTP không hợp lệ',
                },
              })}
            />

            <PasswordField
              label="Mật khẩu mới"
              placeholder="Nhập mật khẩu mới"
              fullWidth
              required
              error={errors.password?.message}
              {...register('password', {
                required: 'Vui lòng nhập mật khẩu',
                minLength: { value: 6, message: 'Mật khẩu ít nhất 6 ký tự' },
              })}
            />

            <PasswordField
              label="Xác nhận mật khẩu"
              placeholder="Nhập lại mật khẩu"
              fullWidth
              required
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: 'Vui lòng xác nhận mật khẩu',
                validate: (value) =>
                  value === password || 'Mật khẩu không khớp',
              })}
            />

            <Button
              type="submit"
              fullWidth
              loading={loading}
              className="mt-4"
              variant="primary"
            >
              Đặt lại mật khẩu
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
