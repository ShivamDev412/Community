import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { SignupSchema } from "@/utils/Validations";
import { SignupType } from "@/Types";
import { API_ENDPOINTS, Endpoints, RouteEndpoints } from "@/utils/Endpoints";
import Toast from "@/utils/Toast";
import { useDispatch } from "react-redux";
import { axiosPublicFile } from "@/utils/Axios";
import { setCredentials } from "@/redux/slice/authSlice";

export const useSignup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  type FormField = z.infer<typeof SignupSchema>;
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    getValues,
    setError,
    setValue,
    control,
    formState: { errors },
  } = useForm<SignupType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      image: null,
    },
    resolver: zodResolver(SignupSchema),
  });
  const onSubmit: SubmitHandler<FormField> = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("name", `${data.firstName} ${data.lastName}`);
    formData.append("email", data.email);
    formData.append("password", data.password);
    try {
      const response:any = await axiosPublicFile.post(
        `${API_ENDPOINTS.AUTH}${Endpoints.SIGNUP}`,
        formData
      );
      if (response.data.success) {
        Toast(response.data.message, "success");
        dispatch(setCredentials(response.data.data['auth-token']));
        navigate(RouteEndpoints.HOME);
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

  return { register, handleSubmit, onSubmit, errors, control,setValue, getValues };
};
