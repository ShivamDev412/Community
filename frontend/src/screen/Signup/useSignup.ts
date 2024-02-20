import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { SignupSchema } from "@/utils/Validations";
import { SignupType } from "@/Types";
import { postApi } from "@/utils/Api";
import { Endpoints } from "@/utils/Endpoints";
import Toast from "@/utils/Toast";
export const useSignup = () => {
  const navigate = useNavigate();
  type FormField = z.infer<typeof SignupSchema>;
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<SignupType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(SignupSchema),
  });
  const onSubmit: SubmitHandler<FormField> = async (data) => {
    try {
      const response = await postApi(`/api/auth${Endpoints.SIGNUP}`, data);
      if (response.success) {
        Toast(response.message, "success");
        navigate(Endpoints.HOME);
        reset();
        clearErrors();
      }
    } catch (error: any) {
      setError("email", {
        type: "manual",
        message: error.response.data.message,
      });
    }
  };

  return { register, handleSubmit, onSubmit, errors };
};
