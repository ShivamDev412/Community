import { postApi } from "@/utils/Api";
import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import Toast from "@/utils/Toast";
import { ForgotPassword } from "@/utils/Validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slice/loadingSlice";
export const useForgotPassword = () => {
;
  const dispatch = useDispatch();
  type FormField = z.infer<typeof ForgotPassword>;
  const {
    register,
    handleSubmit,
    clearErrors,

    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(ForgotPassword),
  });
  const onSubmit = async (data: FormField) => {
    try {
      dispatch(setLoading(true));
      const res = await postApi(
        `${API_ENDPOINTS.AUTH}${Endpoints.FORGOT_PASSWORD}`,
        data
      );
      if (res.success) {
        Toast(res.message, "success");
        dispatch(setLoading(false));
        clearErrors();
      }
    } catch (err: any) {
      dispatch(setLoading(false));
      Toast(err.response.data.message, "error");
    }
  };
  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    getValues,
  };
};
