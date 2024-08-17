import { EditProfileType, UserType } from "@/Types";
import { setLoading } from "@/redux/slice/loadingSlice";
import { RouteEndpoints } from "@/utils/Endpoints";
import Toast from "@/utils/Toast";
import { EditProfileSchema } from "@/utils/Validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useEditProfileMutation, useUserQuery } from "@/redux/slice/api/userSlice";
const useEditProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const { data: user } = useUserQuery("");
  const { image, name, location, bio } = user?.data as UserType;
  const [editProfile] = useEditProfileMutation();
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
      const res = await editProfile(formData).unwrap();
      if (res.success) {
        dispatch(setLoading(false));
        Toast(res.message, "success");
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
