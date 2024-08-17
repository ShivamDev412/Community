import { PersonalInfoType, UserType } from "@/Types";
import { setLoading } from "@/redux/slice/loadingSlice";
import { LifeStages, LookingFor } from "@/utils/Constant";
import { RouteEndpoints } from "@/utils/Endpoints";
import { PersonalInfoSchema } from "@/utils/Validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useDispatch } from "react-redux";
import Toast from "@/utils/Toast";
import { useUpdateUserPersonalInfoMutation, useUserQuery } from "@/redux/slice/api/userSlice";

export const usePersonalInfo = () => {

  const navigation = useNavigate();
  const dispatch = useDispatch();
  const {data:user} = useUserQuery("");
  const {dob, sex, life_state, looking_for} = user?.data as UserType;
  const [lookingFor, setLookingFor] = useState(LookingFor);
  const [lifeStages, setLifeStages] = useState(LifeStages);
  type FormField = z.infer<typeof PersonalInfoSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    getValues,
  } = useForm<PersonalInfoType>({
    defaultValues: {
      birthday: dob,
      gender: sex as string,
      lookingFor: [],
      lifeStages: [],
    },
    resolver: zodResolver(PersonalInfoSchema),
  });
  useEffect(() => {
    if (looking_for?.length) {
      looking_for.forEach((item) => {
        setLookingFor((prev) => {
          return prev.map((prevItem) => {
            if (prevItem.value === item) {
              return { ...prevItem, active: true };
            }
            return prevItem;
          });
        });
      });
    }
  }, [looking_for]);
  useEffect(() => {
    if (life_state?.length) {
      life_state.forEach((item) => {
        setLifeStages((prev) => {
          return prev.map((prevItem) => {
            if (prevItem.value === item) {
              return { ...prevItem, active: true };
            }
            return prevItem;
          });
        });
      });
    }
  }, [life_state]);
  useEffect(() => {
    const filteredValues = lookingFor
      .filter((item) => item.active && item.value)
      .map((item) => item.value);

    setValue("lookingFor", filteredValues);
  }, [lookingFor]);
  useEffect(() => {
    const filteredValues = lifeStages
      .filter((item) => item.active && item.value)
      .map((item) => item.value);

    setValue("lifeStages", filteredValues);
  }, [lifeStages]);
  const setData = (
    value: string,
    data: { value: string; active: boolean }[],
    cb: string
  ) => {
    const dataToUpdated = data.map((item) => {
      if (item.value === value) {
        return { ...item, active: !item.active };
      }
      return item;
    });
    if (cb === "setLookingFor") setLookingFor(dataToUpdated);
    if (cb === "setLifeStages") setLifeStages(dataToUpdated);
  };
  const [updatePersonalInfo] = useUpdateUserPersonalInfoMutation();
  const onSubmit: SubmitHandler<FormField> = async (data) => {
    try {
      dispatch(setLoading(true));
      const res = await updatePersonalInfo(data as PersonalInfoType).unwrap();
      if (res.success) {
        dispatch(setLoading(false));
        Toast(res.message, "success");
        navigation(RouteEndpoints.PROFILE);
      }
    } catch (e: any) {
      dispatch(setLoading(false));
      Toast(e.message, "error");
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    setError,
    setData,
    lookingFor,
    lifeStages,
    getValues,
  };
};
