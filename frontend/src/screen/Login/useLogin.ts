import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "@/utils/Validations";
import { LoginType } from "@/Types";
import { postApi } from "@/utils/Api";
import { API_ENDPOINTS, RouteEndpoints } from "@/utils/Endpoints";
import Toast from "@/utils/Toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slice/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
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
  const onSubmit: SubmitHandler<FormField> = async (data) => {
    try {
      const response = await postApi(
        `${API_ENDPOINTS.AUTH}${RouteEndpoints.LOGIN}`,
        data
      );
      if (response.success) {
        Toast(response.message, "success");
        dispatch(
          setUser({
            ...response.data,
            bio: response.data.bio ? response.data.bio : "",
            dob: response.data.dob ? response.data.dob : "",
            life_state: response.data.life_state
              ? response.data.life_state
              : [],
            location: response.data.location ? response.data.location : "",
            looking_for: response.data.looking_for
              ? response.data.looking_for
              : [],
            sex: response.data.sex ? response.data.sex : "",
          })
        );
        navigate(RouteEndpoints.HOME);
        reset();
        clearErrors();
      }
    } catch (error: any) {
      const message = error.response.data.message;
      const type = message.includes("Password") ? "password" : "email";
      setError(type, {
        type: "manual",
        message: error.response?.data?.message,
      });
    }
  };

  return { register, handleSubmit, onSubmit, errors, getValues };
};
