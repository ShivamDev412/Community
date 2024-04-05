import { setLoading } from "@/redux/slice/loadingSlice";
import { postApi } from "@/utils/Api";
import { API_ENDPOINTS, Endpoints, RouteEndpoints } from "@/utils/Endpoints";
import Toast from "@/utils/Toast";
import { ResetPasswordSchema } from "@/utils/Validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { useLocation, useNavigate } from "react-router-dom";

export const useResetPassword = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const token = location.search.split("=")[1];
  const dispatch = useDispatch();
  type FormField = z.infer<typeof ResetPasswordSchema>;
  const {
    register,
    handleSubmit,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(ResetPasswordSchema),
  });
  const onSubmit = async (data: FormField) => {
    const dataToSend = { ...data, token };
    try {
      dispatch(setLoading(true));
      const res = await postApi(
        `${API_ENDPOINTS.AUTH}${Endpoints.RESET_PASSWORD}`,
        dataToSend
      );
      if (res.success) {
        Toast(res.message, "success");
        navigation(RouteEndpoints.LOGIN);
        dispatch(setLoading(false));
        clearErrors();
      }
    } catch (err: any) {
      dispatch(setLoading(false));
    }
  };
  return {
    register,
    handleSubmit,
    onSubmit,
    getValues,
    errors,
  };
};
