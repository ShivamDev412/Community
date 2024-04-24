import { ChangePasswordType } from "@/Types";
import { ChangePasswordSchema } from "@/utils/Validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slice/loadingSlice";
import { API_ENDPOINTS, Endpoints, RouteEndpoints } from "@/utils/Endpoints";
import Toast from "@/utils/Toast";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "@/Hooks/useAxiosPrivate";
export const useChangePassword = () => {
  const {axiosPrivate} = useAxiosPrivate()
  const dispatch = useDispatch();
  const navigation = useNavigate();
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
      const res = await axiosPrivate.put(
        `${API_ENDPOINTS.USER}${Endpoints.CHANGE_PASSWORD}`,
        data
      );
      if (res.data.success) {
        dispatch(setLoading(false));
        Toast(res.data.message, "success");
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
