import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const defaultValues = { email: "" };
  const methods = useForm({ defaultValues });
  const { register, handleSubmit, formState: { errors } } = methods;

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("Request password reset for:", data);

    // Giả lập delay API
    await new Promise((r) => setTimeout(r, 1200));

    setLoading(false);
    alert("Hướng dẫn đặt lại mật khẩu đã được gửi tới email của bạn!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-primary/10 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-4xl font-bold mb-8 text-center text-light-primary">
          Quên mật khẩu
        </h2>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <InputField
              label="Email"
              placeholder="Nhập email của bạn"
              fullWidth
              required
              error={errors.email?.message}
              {...register("email", {
                required: "Vui lòng nhập email",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email không đúng định dạng",
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
              Gửi yêu cầu
            </Button>
          </form>
        </FormProvider>

        <p className="mt-3 text-center text-sm text-gray-500">
          Quay lại trang{" "}
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
