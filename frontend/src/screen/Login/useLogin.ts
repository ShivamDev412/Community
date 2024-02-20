import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "@/utils/Validations";
import { LoginType } from "@/Types";
import { postApi } from "@/utils/Api";
import { Endpoints } from "@/utils/Endpoints";
import Toast from "@/utils/Toast";
export const useLogin = () => {
  const navigate = useNavigate();
  type FormField = z.infer<typeof LoginSchema>;
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
    setError,
  } = useForm<LoginType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });
  const onSubmit: SubmitHandler<FormField> = async (data) => {
    try {
      const response = await postApi(`/api/auth${Endpoints.LOGIN}`, data);
      if (response.success) {
        Toast(response.message, "success");
        navigate(Endpoints.HOME);
        reset();
        clearErrors();
      }
    } catch (error: any) {
      const message = error.response.data.message;
      const type = message.includes("Password") ? "password" : "email";
      setError(type, {
        type: "manual",
        message: error.response.data.message,
      });
    }
  };

  return { register, handleSubmit, onSubmit, errors };
};
