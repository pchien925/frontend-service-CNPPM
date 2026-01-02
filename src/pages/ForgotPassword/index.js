import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import authService from '../../services/authService';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    defaultValues: { email: '' },
    mode: 'onTouched',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmitEmail = async ({ email }) => {
    setLoading(true);
    try {
      // GỌI API: gửi OTP về email
      const res = await authService.forgotPassword(email);

      alert(res?.message || `Mã OTP đã được gửi tới email: ${email}`);

      // Chuyển sang trang reset password kèm email
      navigate('/reset-password', { state: { email } });
    } catch (error) {
      console.error('Forgot password error:', error?.response || error);
      alert(
        error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-primary/10 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-4xl font-bold mb-2 text-center text-light-primary">
          Quên mật khẩu
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Nhập email để nhận mã OTP
        </p>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmitEmail)}
            className="flex flex-col gap-3"
          >
            <InputField
              label="Email"
              placeholder="Nhập email của bạn"
              fullWidth
              required
              error={errors.email?.message}
              {...register('email', {
                required: 'Vui lòng nhập email',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Email không đúng định dạng',
                },
              })}
            />

            <Button
              type="submit"
              fullWidth
              loading={loading}
              className="mt-4"
              variant="primary"
            >
              Gửi mã OTP
            </Button>
          </form>
        </FormProvider>

        <p className="mt-6 text-center text-sm text-gray-500">
          Quay lại trang{' '}
          <a
            href="/login"
            className="text-light-primary font-medium hover:underline"
          >
            Đăng nhập
          </a>
        </p>
      </div>
    </div>
  );
}
