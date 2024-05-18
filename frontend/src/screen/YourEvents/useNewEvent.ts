import { NewEventType } from "@/Types";
import { RouteEndpoints } from "@/utils/Endpoints";
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
import moment from "moment";
import {
  useCreateEventMutation,
  useUpdateEventMutation,
} from "@/redux/slice/api/eventsSlice";
import { useGroupsCreatedQuery } from "@/redux/slice/api/groupsSlice";
import { useCategoriesQuery } from "@/redux/slice/api/categoriesSlice";
import { useLazyTagsQuery, useTagsQuery } from "@/redux/slice/api/tagsSlice";

export const useNewEvent = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [tags, setTags] = useState<Array<{ value: string; label: string }>>([]);
  const isEditableEvent = location.pathname.includes("edit-event");
  const { eventDetails } = useSelector((state: RootState) => state.events);
  const [eventType, setEventType] = useState<string>("");
  const [groups, setGroups] = useState<Array<{ value: string; label: string }>>(
    []
  );
  const [createEvent] = useCreateEventMutation();
  const [updateEvent] = useUpdateEventMutation();
  const { data: userGroupsData } = useGroupsCreatedQuery("");
  const { data: categoriesData } = useCategoriesQuery("");
  const [trigger, { data: tagsData }] = useLazyTagsQuery();
  const { data: onMountTagsData } = useTagsQuery(
    eventDetails?.category_id || "",
    {
      skip: !isEditableEvent,
    }
  );
  useEffect(() => {
    if (eventDetails.event_type) {
      setEventType(eventDetails.event_type);
    }
    if (onMountTagsData) {
      setTags(
        onMountTagsData?.data.length
          ? onMountTagsData?.data?.map((value) => ({
              value: value.id,
              label: value.name,
            }))
          : []
      );
    }
    if (!isEditableEvent) {
      reset();
      dispatch(setEventDetails(EventDetailsInitialState));
    }
    if (tagsData) {
      setTags(
        tagsData?.data.length
          ? tagsData?.data?.map((value) => ({
              value: value.id,
              label: value.name,
            }))
          : []
      );
    }
  }, [eventDetails, isEditableEvent, tagsData, onMountTagsData]);
  useEffect(() => {
    userGroupsData &&
      setGroups(
        userGroupsData?.data.length
          ? userGroupsData?.data?.map((value) => ({
              value: value.id,
              label: value.name,
            }))
          : []
      );
    categoriesData?.data.length &&
      setCategories(
        categoriesData?.data.length
          ? categoriesData?.data?.map((value) => ({
              value: value.id,
              label: value.name,
            }))
          : []
      );
  }, [userGroupsData, categoriesData]);
  const getTags = (categoryId: string) => {
    setValue("tags", []);
    trigger(categoryId);
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
      group: isEditableEvent ? eventDetails?.group.group_id : "",
      category: isEditableEvent ? eventDetails?.category_id : "",
      date: isEditableEvent
        ? eventDetails?.event_date
        : dayjs().format("YYYY-MM-DD"),
      time: isEditableEvent
        ? moment(eventDetails?.event_time).utc().format("HH:mm")
        : dayjs().format("HH:mm"),
      event_end_time: isEditableEvent
        ? moment(eventDetails?.event_end_time).utc().format("HH:mm")
        : dayjs().format("HH:mm"),
      type: isEditableEvent ? eventDetails?.event_type : "",
      tags: isEditableEvent ? eventDetails?.tags.map((tag) => tag.name) : [],
      link: isEditableEvent ? eventDetails?.link || undefined : "",
      address: isEditableEvent ? eventDetails?.address || undefined : "",
    },
    resolver: zodResolver(NewEventSchema),
  });
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
    formData.append("category", data.category);
    formData.append("tags", JSON.stringify(tagsToSend));

    formData.append(
      "image",
      typeof data?.image[0] === "object" ? data?.image[0] : data.image
    );
    formData.append("group", data.group);
    if (data.type === "in-person") {
      data?.address && formData.append("address", data?.address);
    } else {
      data?.link && formData.append("link", data?.link);
    }

    try {
      dispatch(setLoading(true));
      const res = isEditableEvent
        ? await updateEvent({
            eventId: eventDetails.id,
            body: formData,
          }).unwrap()
        : await createEvent(formData).unwrap();
      if (res.success) {
        dispatch(setLoading(false));
        Toast(res.message, "success");
        navigation(RouteEndpoints.YOUR_EVENTS);
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
    categories,
    getTags,
  };
};
