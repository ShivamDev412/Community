import { NewEventType } from "@/Types";
import { getApi, postApiFile } from "@/utils/Api";
import { API_ENDPOINTS, Endpoints, RouteEndpoints } from "@/utils/Endpoints";
import { NewEventSchema } from "@/utils/Validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Toast from "@/utils/Toast";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/slice/loadingSlice";
import { useEffect, useState } from "react";
import { RootState } from "@/redux/RootReducer";

export const useNewEvent = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [tags, setTags] = useState<Array<{ value: string; label: string }>>([]);

  const [eventType, setEventType] = useState<string>("");
  const [groups, setGroups] = useState<Array<{ value: string; label: string }>>(
    []
  );
  const { groupsCreated } = useSelector((state: RootState) => state.groups);
  useEffect(() => {
    if (groupsCreated.length) {
      setGroups(
        groupsCreated.map((value) => ({
          value: value.group_id,
          label: value.name,
        }))
      );
    }
    getAllTags();
  }, [groupsCreated]);

  const getAllTags = async () => {
    dispatch(setLoading(true));
    try {
      const res = await getApi(`/api/event${Endpoints.TAGS}`);
      if (res.success) {
        setTags(
          res.data.map((value: { interest_id: string; name: string }) => {
            return {
              value: value.interest_id,
              label: value.name,
            };
          })
        );
      }
      dispatch(setLoading(false));
    } catch (e) {
      dispatch(setLoading(false));
    }
  };
  type FormField = z.infer<typeof NewEventSchema>;
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    control,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm<NewEventType>({
    defaultValues: {
      name: "",
      image: null,
      details: "",
      group: "",
      date: "",
      time: "",
      type: "",
      tags: [],
      link: undefined,
      address: undefined,
    },
    resolver: zodResolver(NewEventSchema),
  });

  const onSubmit: SubmitHandler<FormField> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("details", data.details);
    formData.append("date", data.date);
    formData.append("time", data.time);
    formData.append("type", data.type);
    formData.append("tags", JSON.stringify(data.tags));
    formData.append("image", data.image[0]);
    formData.append("group", data.group);
    if (data.type === "in-person") {
      data?.address && formData.append("location", data?.address);
    } else {
      data?.link && formData.append("link", data?.link);
    }
    try {
      dispatch(setLoading(true));
      const res = await postApiFile(
        `${API_ENDPOINTS.EVENT}${Endpoints.CREATE_EVENT}`,
        formData
      );
      if (res.success) {
        dispatch(setLoading(false));
        Toast(res.message, "success");
        navigation(RouteEndpoints.YOUR_EVENTS);
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
  const backToEvent = () => {
    navigation(RouteEndpoints.YOUR_EVENTS);
  };
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    backToEvent,
    groups,
    tags,
    control,
    setValue,
    eventType,
    setEventType,
    clearErrors,
    setError,
    getValues,
  };
};
