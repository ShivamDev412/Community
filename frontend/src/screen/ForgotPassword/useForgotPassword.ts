import Toast from "@/utils/Toast";
import { ForgotPassword } from "@/utils/Validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slice/loadingSlice";
import { useForgotPasswordMutation } from "@/redux/slice/api/userSlice";
export const useForgotPassword = () => {
  const dispatch = useDispatch();
  const [forgotPassword] = useForgotPasswordMutation()
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
      const res = await forgotPassword(data).unwrap();
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
