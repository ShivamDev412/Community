import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "@/utils/Validations";
import { LoginType } from "@/Types";
import { RouteEndpoints } from "@/utils/Endpoints";
import Toast from "@/utils/Toast";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { setLoading } from "@/redux/slice/loadingSlice";
import { setCredentials } from "@/redux/slice/authSlice";
import { useLoginMutation } from "@/redux/slice/api/authSlice";
export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  type FormField = z.infer<typeof LoginSchema>;

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    getValues,
    formState: { errors },
    setError,
  } = useForm<LoginType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });
  const [login] = useLoginMutation();
  const onSubmit: SubmitHandler<FormField> = async (credentials) => {
    try {
      dispatch(setLoading(true));
      // const response:any = await axios.post(
      //   `${API_ENDPOINTS.AUTH}${RouteEndpoints.LOGIN}`,
      //   data
      // );
      const response = await login(credentials).unwrap();
      const { success, message, data } = response;
      if (success) {
        Toast(message, "success");
        dispatch(setCredentials(data["auth-token"]));

        navigate(RouteEndpoints.HOME);
        reset();
        clearErrors();
        dispatch(setLoading(false));
      }
    } catch (error: any) {
      const message = error.response.data.message;
      const type = message.includes("Password") ? "password" : "email";
      setError(type, {
        type: "manual",
        message: error.response?.data?.message,
      });
      dispatch(setLoading(false));
    }
  };

  return { register, handleSubmit, onSubmit, errors, getValues };
};
