import { NewGroupType } from "@/Types";
import { postApiFile } from "@/utils/Api";
import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import { NewGroupSchema } from "@/utils/Validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Toast from "@/utils/Toast";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slice/loadingSlice";

export const useNewGroup = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  type FormField = z.infer<typeof NewGroupSchema>;
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setValue,
    setError,
    getValues,
    formState: { errors },
  } = useForm<NewGroupType>({
    defaultValues: {
      name: "",
      description: "",
      location: "",
      groupType: "Public",
      image: null,
    },
    resolver: zodResolver(NewGroupSchema),
  });
  const onSubmit: SubmitHandler<FormField> = async (data) => {
    const dataToSend = {
      ...data,
      about: data.description,
      group_type: data.groupType,
      image: data.image[0],
    };

    const formData = new FormData();
    formData.append("image", dataToSend.image);
    formData.append("name", dataToSend.name);
    formData.append("group_type", dataToSend.groupType);
    formData.append("location", dataToSend.location);
    formData.append("about", dataToSend.description);
    try {
      dispatch(setLoading(true));
      const res = await postApiFile(
        `${API_ENDPOINTS.GROUP}${Endpoints.CREATE_GROUP}`,
        formData
      );
      if (res.success) {
        dispatch(setLoading(false));
        Toast(res.message, "success");
        navigation(Endpoints.YOUR_GROUPS);
        reset();
        clearErrors();
      }
    } catch (e: any) {
      dispatch(setLoading(false));
      if (e.response.data.message.hasOwnProperty("name")) {
        setError("name", {
          type: "manual",
          message: e.response.data.message.name,
        });
      } else if (e.response.data.message.hasOwnProperty("image")) {
        setError("image", {
          type: "manual",
          message: e.response.data.message.image,
        });
      } else {
        Toast(e.response.data.message, "error");
      }
    }
  };
  const backToGroup = () => {
    navigation(Endpoints.YOUR_GROUPS);
  };
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    backToGroup,
    setValue,
    getValues,
  };
};
