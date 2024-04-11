import { NewGroupType } from "@/Types";
import { postApiFile, putApiFile } from "@/utils/Api";
import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import { NewGroupSchema } from "@/utils/Validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Toast from "@/utils/Toast";
import { z } from "zod";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/slice/loadingSlice";
import { RootState } from "@/redux/RootReducer";
import { useEffect } from "react";
import { setGroupDetails } from "@/redux/slice/groupSlice";

export const useNewGroup = () => {
  const location = useLocation();
  const isEditGroup = location.pathname.includes("edit-group");
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { groupDetails } = useSelector((state: RootState) => state.groups);
  useEffect(() => {
    if (!isEditGroup) {
      reset();
      dispatch(
        setGroupDetails({
          about: "",
          created_at: "",
          group_id: "",
          group_type: "",
          image: "",
          compressed_image: "",
          location: "",
          latitude: 0,
          longitude: 0,
          membersCount: 0,
          members: [],
          name: "",
          organized_by: {
            name: "",
            image: "",
            compressed_image: "",
            id: "",
          },
          updated_at: "",
        })
      );
    }
  }, [isEditGroup]);
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
  //

  const addAndUpdateApi = async (type: string, formData: FormData) => {
    switch (type) {
      case "add":
        return await postApiFile(
          `${API_ENDPOINTS.GROUP}${Endpoints.CREATE_GROUP}`,
          formData
        );
      case "update":
        return await putApiFile(
          `${API_ENDPOINTS.GROUP}${Endpoints.UPDATE_GROUP}/${groupDetails.id}`,
          formData
        );
    }
  };
  const onSubmit: SubmitHandler<FormField> = async (data) => {
    const dataToSend = {
      ...data,
      about: data.description,
      group_type: data.groupType,
      image: data.image[0]
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
      const res = await addAndUpdateApi(
        isEditGroup ? "update" : "add",
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
