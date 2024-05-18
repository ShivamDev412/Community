import { ChangePasswordType } from "@/Types";
import { ChangePasswordSchema } from "@/utils/Validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slice/loadingSlice";
import { RouteEndpoints } from "@/utils/Endpoints";
import Toast from "@/utils/Toast";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "@/redux/slice/api/userSlice";
export const useChangePassword = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [changePassword] = useChangePasswordMutation();
  type FormField = z.infer<typeof ChangePasswordSchema>;
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    getValues,
    formState: { errors },
    setValue,
    setError,
  } = useForm<ChangePasswordType>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(ChangePasswordSchema),
  });
  const onSubmit: SubmitHandler<FormField> = async (data) => {
    console.log(data);
    try {
      dispatch(setLoading(true));
      const res = await changePassword(data).unwrap();
      if (res.success) {
        dispatch(setLoading(false));
        Toast(res.message, "success");
        navigation(RouteEndpoints.ACCOUNT_MANAGEMENT);
        reset();
        clearErrors();
      }
    } catch (e: any) {
      dispatch(setLoading(false));
      setError("currentPassword", {
        type: "manual",
        message: e.response.data.message,
      });
      // Toast(e.response.data.message, "error");
    }
  };
  return {
    register,
    handleSubmit,
    reset,
    clearErrors,
    getValues,
    errors,
    setValue,
    onSubmit,
  };
};
