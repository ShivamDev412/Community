import useAxiosPrivate from "@/Hooks/useAxiosPrivate";
import { NewEventType } from "@/Types";
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
import { setEventDetails } from "@/redux/slice/eventSlice";
import { EventDetailsInitialState } from "@/utils/Constant";
import dayjs from "dayjs";

export const useNewEvent = () => {
  const { axiosPrivate, axiosPrivateFile } = useAxiosPrivate();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [tags, setTags] = useState<Array<{ value: string; label: string }>>([]);
  const isEditableEvent = location.pathname.includes("edit-event");
  const { eventDetails } = useSelector((state: RootState) => state.events);
  const [eventType, setEventType] = useState<string>("");
  const [groups, setGroups] = useState<Array<{ value: string; label: string }>>(
    []
  );
  const { groupsCreated } = useSelector((state: RootState) => state.groups);
  useEffect(() => {
    if (eventDetails) {
      setEventType(eventDetails.event_type);
    }
  }, [eventDetails]);
  useEffect(() => {
    if (!isEditableEvent) {
      reset();
      dispatch(setEventDetails(EventDetailsInitialState));
    }
  }, [isEditableEvent]);
  useEffect(() => {
    if (groupsCreated.length) {
      setGroups(
        groupsCreated.map((value) => ({
          value: value.id,
          label: value.name,
        }))
      );
    }
    getAllTags();
  }, [groupsCreated]);

  const getAllTags = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axiosPrivate.get(`/api/event${Endpoints.TAGS}`);
      if (res.data.success) {
        setTags(
          res.data.data.map((value: { id: string; name: string }) => {
            return {
              value: value.id,
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
      name: isEditableEvent ? eventDetails?.name : "",
      image: isEditableEvent ? eventDetails?.image : null,
      details: isEditableEvent ? eventDetails?.details : "",
      group: isEditableEvent ? eventDetails?.group.id : "",
      date: isEditableEvent
        ? eventDetails?.event_date
        : dayjs().format("YYYY-MM-DD"),
      time: isEditableEvent
        ? eventDetails?.event_time
        : dayjs().format("HH:mm"),
      event_end_time: isEditableEvent
        ? eventDetails?.event_end_time
        : dayjs().format("HH:mm"),
      type: isEditableEvent ? eventDetails?.event_type : "",
      tags: isEditableEvent ? eventDetails?.tags : [],
      link: isEditableEvent ? eventDetails?.link || undefined : "",
      address: isEditableEvent ? eventDetails?.address || undefined : "",
    },
    resolver: zodResolver(NewEventSchema),
  });
  const addAndUpdateApi = async (type: string, formData: FormData) => {
    switch (type) {
      case "add":
        return await axiosPrivateFile.post(
          `${API_ENDPOINTS.EVENT}${Endpoints.CREATE_EVENT}`,
          formData
        );
      case "update":
        return await axiosPrivateFile.put(
          `${API_ENDPOINTS.EVENT}${Endpoints.UPDATE_EVENT}/${eventDetails.event_id}`,
          formData
        );
    }
  };
  const onSubmit: SubmitHandler<FormField> = async (data) => {
    const tagsToSend = tags
      .filter((value) => data.tags.includes(value.label))
      .map((value) => {
        return {
          id: value.value,
        };
      });
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("details", data.details);
    formData.append("date", data.date);
    formData.append("time", data.time);
    formData.append("event_end_time", data.event_end_time);
    formData.append("type", data.type);
    formData.append("tags", JSON.stringify(tagsToSend));
    formData.append(
      "image",
      typeof data?.image[0] === "object" ? data?.image[0] : data.image
    );
    formData.append("group", data.group);
    if (data.type === "in-person") {
      data?.address && formData.append("location", data?.address);
    } else {
      data?.link && formData.append("link", data?.link);
    }

    try {
      dispatch(setLoading(true));
      const res: any = await addAndUpdateApi(
        isEditableEvent ? "update" : "add",
        formData
      );
      if (res.data.success) {
        dispatch(setLoading(false));
        Toast(res.data.message, "success");
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
    isEditableEvent,
  };
};
