import { EditProfileType } from "@/Types";
import { RootState } from "@/redux/RootReducer";
import { setLoading } from "@/redux/slice/loadingSlice";
import { API_ENDPOINTS, Endpoints, RouteEndpoints } from "@/utils/Endpoints";
import Toast from "@/utils/Toast";
import { EditProfileSchema } from "@/utils/Validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/redux/slice/userSlice";
import { useEffect } from "react";
import useAxiosPrivate from "@/Hooks/useAxiosPrivate";
const useEditProfile = () => {
  const { axiosPrivateFile } = useAxiosPrivate();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { name, image, location, bio } = useSelector(
    (state: RootState) => state.user
  );

  type FormField = z.infer<typeof EditProfileSchema>;
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    getValues,
    formState: { errors },
    setValue,
  } = useForm<EditProfileType>({
    defaultValues: {
      image: image ? image : "",
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1],
      address: location,
      bio: bio ? bio : "",
    },
    resolver: zodResolver(EditProfileSchema),
  });
  useEffect(() => {
    setValue("address", location);
  }, [location]);
  const onSubmit: SubmitHandler<FormField> = async (data) => {
    const formData = new FormData();
    formData.append(
      "image",
      typeof data?.image[0] === "object" ? data?.image[0] : data.image
    );
    formData.append("name", `${data?.firstName} ${data?.lastName}`);
    formData.append("address", data?.address ? data.address : "");
    formData.append("bio", JSON.stringify(data?.bio));
    try {
      dispatch(setLoading(true));
      const res = await axiosPrivateFile.post(
        `${API_ENDPOINTS.USER}${Endpoints.EDIT_PROFILE}`,
        formData
      );
      if (res.data.success) {
        dispatch(setLoading(false));
        Toast(res.data.message, "success");
        dispatch(setUser(res.data.data));
        navigation(RouteEndpoints.PROFILE);
        reset();
        clearErrors();
      }
    } catch (e: any) {
      dispatch(setLoading(false));
      Toast(e.message, "error");
    }
  };
  return {
    handleSubmit,
    register,
    errors,
    onSubmit,
    getValues,
    setValue,
  };
};
export default useEditProfile;
