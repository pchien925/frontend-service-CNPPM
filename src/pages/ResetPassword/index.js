import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import InputField from '../../components/ui/InputField';
import PasswordField from '../../components/ui/PasswordField';
import Button from '../../components/ui/Button';
import authService from '../../services/authService';

export default function ResetPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const methods = useForm({
    defaultValues: { otp: '', password: '', confirmPassword: '' },
    mode: 'onTouched',
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  useEffect(() => {
    const emailFromState = location.state?.email;
    if (!emailFromState) {
      navigate('/forgot-password');
      return;
    }
    setEmail(emailFromState);
  }, [location.state, navigate]);

  // tránh render khi chưa có email (vừa navigate về)
  if (!email) return null;

  const password = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // GỌI API: reset password
      const res = await authService.resetPassword({
        email,
        otpCode: data.otp,
        newPassword: data.password,
      });

      alert(res?.message || 'Đặt lại mật khẩu thành công! Vui lòng đăng nhập.');

      setTimeout(() => {
        navigate('/login');
      }, 800);
    } catch (error) {
      console.error('Reset password error:', error?.response || error);
      alert(
        error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      // GỌI API: gửi lại OTP
      const res = await authService.forgotPassword(email);
      alert(res?.message || 'Mã OTP mới đã được gửi!');
    } catch (error) {
      console.error('Resend OTP error:', error?.response || error);
      alert(
        error.response?.data?.message ||
          'Gửi lại OTP thất bại. Vui lòng thử lại.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-primary/10 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-4xl font-bold mb-2 text-center text-light-primary">
          Đặt lại mật khẩu
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Mã OTP đã được gửi tới <span className="font-semibold">{email}</span>
        </p>

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
                  value: /^\d{4,6}$/,
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
                maxLength: { value: 255, message: 'Tối đa 255 ký tự' },
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

            <button
              type="button"
              onClick={handleResendOTP}
              disabled={loading}
              className="text-sm text-light-primary hover:underline mt-3 disabled:opacity-50"
            >
              Gửi lại mã OTP
            </button>

            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-sm text-gray-500 hover:underline mt-2"
            >
              Quay lại
            </button>
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
