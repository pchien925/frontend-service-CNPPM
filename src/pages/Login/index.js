import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../../components/ui/InputField";
import PasswordField from "../../components/ui/PasswordField";
import Button from "../../components/ui/Button";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import apiClient from "../../services/apiClient";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  
  const defaultValues = { username: "", password: "" };
  const methods = useForm({ defaultValues });
  const { register, handleSubmit, formState: { errors } } = methods;

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("Submit data:", data);

    try {
<<<<<<< HEAD
      // Bypass apiClient interceptor và gửi request trực tiếp
      const response = await fetch('https://backend-service-cnppm.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Đăng nhập thất bại');
      }

      const res = await response.json();
      
      // Backend returns { data: { access_token, user_kind } }
      const { data: tokenData } = res;
      const { access_token, user_kind } = tokenData;

      login(access_token, user_kind);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
=======
      const res = await apiClient.post('/api/auth/login', {
        username: data.username,
        password: data.password,
      });
      const { accessToken, refreshToken, userKind } = res.data;

      login(accessToken, refreshToken, userKind);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      alert("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
>>>>>>> 00469f619241899c2322f7b6b3271717250a49ad
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-primary/10 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-4xl font-bold mb-8 text-center text-light-primary">
          Đăng nhập
        </h2>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            {/* Trường Username */}
            <InputField
              label="Tên đăng nhập"
              placeholder="Nhập tên đăng nhập của bạn"
              fullWidth
              required
              error={errors.username?.message}
              {...register("username", {
                required: "Vui lòng nhập tên đăng nhập",
                minLength: {
                  value: 3,
                  message: "Tên đăng nhập phải có ít nhất 3 ký tự",
                },
                maxLength: {
                  value: 30,
                  message: "Tên đăng nhập không được vượt quá 30 ký tự",
                },
                // Tuỳ chọn: chỉ cho phép chữ cái, số và một số ký tự đặc biệt
                pattern: {
                  value: /^[a-zA-Z0-9._-]+$/,
                  message: "Tên đăng nhập chỉ được chứa chữ cái, số, dấu chấm, gạch dưới và gạch ngang",
                },
              })}
            />

            {/* Trường Mật khẩu */}
            <PasswordField
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              fullWidth
              required
              error={errors.password?.message}
              {...register("password", {
                required: "Vui lòng nhập mật khẩu",
                minLength: { value: 6, message: "Mật khẩu ít nhất 6 ký tự" },
              })}
            />

            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-sm text-light-primary hover:underline"
              >
                Quên mật khẩu?
              </a>
            </div>

            <Button
              type="submit"
              fullWidth
              loading={loading}
              variant="primary"
            >
              Đăng nhập
            </Button>

            <div className="my-2 flex items-center">
              <div className="flex-1 h-px bg-gray-400 mx-1"></div>
              <span className="text-xs font-medium text-gray-600 px-2">
                HOẶC
              </span>
              <div className="flex-1 h-px bg-gray-400 mx-1"></div>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                type="button"
                fullWidth
                variant="secondary"
                className="w-full flex items-center justify-center gap-8"
                onClick={() => alert("Đăng nhập bằng Google")}
              >
                <FaGoogle className="w-5 h-5 text-red-500" />
                <span className="pl-4">Tiếp tục với Google</span>
              </Button>

              <Button
                type="button"
                fullWidth
                variant="secondary"
                className="w-full flex items-center justify-center gap-8"
                onClick={() => alert("Đăng nhập bằng Facebook")}
              >
                <FaFacebookF className="w-5 h-5 text-blue-600" />
                <span className="pl-4">Tiếp tục với Facebook</span>
              </Button>
            </div>
          </form>
        </FormProvider>

        <p className="mt-3 text-center text-sm text-gray-500">
          Chưa có tài khoản?{" "}
          <a
            href="/register"
            className="text-light-primary font-medium hover:underline"
          >
            Đăng ký ngay
          </a>
        </p>
      </div>
    </div>
  );
}