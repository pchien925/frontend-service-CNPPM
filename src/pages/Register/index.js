import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../../components/ui/InputField";
import PasswordField from "../../components/ui/PasswordField";
import Button from "../../components/ui/Button";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    kind: 0,
    username: "",
    email: "",
    password: "",
    fullName: "",
    phone: "",
    avatarPath: "",
    groupId: 16,
  };

  const methods = useForm({ defaultValues });
  const { register, handleSubmit, formState: { errors } } = methods;

  const onSubmit = async (data) => {
      setLoading(true);
    console.log("Dữ liệu đăng ký:", data);

    // Giả lập delay API
      await new Promise((r) => setTimeout(r, 1200));

    setLoading(false);
    alert("Tạo tài khoản thành công!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-primary/10 p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-4xl font-bold mb-8 text-center text-light-primary">
          Đăng ký tài khoản
        </h2>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">

            <InputField
              label="Tên đăng nhập"
              placeholder="Nhập tên đăng nhập"
              fullWidth
              required
              error={errors.username?.message}
              {...register("username", {
                required: "Vui lòng nhập tên đăng nhập",
                minLength: { value: 3, message: "Tối thiểu 3 ký tự" },
                maxLength: { value: 255, message: "Tối đa 255 ký tự" },
              })}
            />

            <InputField
              label="Email"
              placeholder="Nhập địa chỉ email"
              fullWidth
              required
              error={errors.email?.message}
              {...register("email", {
                required: "Vui lòng nhập email",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Định dạng email không hợp lệ" },
              })}
            />

            <PasswordField
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              fullWidth
              required
              error={errors.password?.message}
              {...register("password", {
                required: "Vui lòng nhập mật khẩu",
                minLength: { value: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
                maxLength: { value: 255, message: "Tối đa 255 ký tự" },
              })}
            />

            <InputField
              label="Họ và tên"
              placeholder="Nhập họ và tên đầy đủ"
              fullWidth
              required
              error={errors.fullName?.message}
              {...register("fullName", { required: "Vui lòng nhập họ và tên" })}
            />

            <InputField
              label="Số điện thoại"
              placeholder="Nhập số điện thoại (không bắt buộc)"
              fullWidth
              error={errors.phone?.message}
              {...register("phone", {
                pattern: { value: /^[0-9+\-()\s]*$/, message: "Số điện thoại không hợp lệ" },
              })}
            />

            <Button type="submit" fullWidth loading={loading} className="mt-5">
              Đăng ký
            </Button>

          </form>
        </FormProvider>
        <p className="mt-3 text-center text-sm text-gray-500">
          Đã có tài khoản?{" "}
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