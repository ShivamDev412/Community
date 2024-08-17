import { NewGroupType } from "@/Types";
import { Endpoints } from "@/utils/Endpoints";
import { NewGroupSchema } from "@/utils/Validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Toast from "@/utils/Toast";
import { z } from "zod";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/slice/loadingSlice";
import {
  useCreateGroupMutation,
  useEditGroupMutation,
} from "@/redux/slice/api/groupsSlice";
import { RootState } from "@/redux/RootReducer";
export const useNewGroup = () => {
  const location = useLocation();
  const isEditGroup = location.pathname.includes("edit-group");
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { groupDetails } = useSelector((state: RootState) => state.groups);

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
      name: isEditGroup ? groupDetails?.name : "",
      description: isEditGroup ? groupDetails?.about : "",
      location: isEditGroup ? groupDetails?.location : "",
      groupType: isEditGroup ? groupDetails?.group_type : "",
      image: isEditGroup ? groupDetails?.image : "",
    },
    resolver: zodResolver(NewGroupSchema),
  });
  const [createGroup] = useCreateGroupMutation();
  const [editGroup] = useEditGroupMutation();
  const onSubmit: SubmitHandler<FormField> = async (data) => {
    const dataToSend = {
      ...data,
      about: data.description,
      group_type: data.groupType,
      image: data.image[0],
    };

    const formData = new FormData();
    formData.append(
      "image",
      typeof data?.image[0] === "object" ? data?.image[0] : data.image
    );
    formData.append("name", dataToSend.name);
    formData.append("group_type", dataToSend.groupType);
    formData.append("location", dataToSend.location);
    formData.append("about", dataToSend.description);
    try {
      dispatch(setLoading(true));
      const response = isEditGroup
        ? await editGroup({
            body: formData,
            groupId: groupDetails?.id as string,
          }).unwrap()
        : await createGroup(formData).unwrap();
      const { message, success } = response;
      if (success) {
        dispatch(setLoading(false));
        Toast(message, "success");
        navigation(Endpoints.YOUR_GROUPS);
        reset();
        clearErrors();
      }
    } catch (e: any) {
      dispatch(setLoading(false));
      if (e.data.message.hasOwnProperty("name")) {
        setError("name", {
          type: "manual",
          message: e.data.message.name,
        });
      } else if (e.data.message.hasOwnProperty("image")) {
        setError("image", {
          type: "manual",
          message: e.data.message.image,
        });
      } else {
        Toast(e.data.message, "error");
      }
    }
  };
  const backToGroup = () => {
    navigation(Endpoints.YOUR_GROUPS);
  };
  return {
    isEditGroup,
    register,
    handleSubmit,
    errors,
    onSubmit,
    backToGroup,
    setValue,
    getValues,
  };
};
