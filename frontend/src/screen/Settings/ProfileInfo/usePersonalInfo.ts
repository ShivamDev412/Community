import { PersonalInfoType } from "@/Types";
import { setLoading } from "@/redux/slice/loadingSlice";
import { LifeStages, LookingFor } from "@/utils/Constant";
import { API_ENDPOINTS, Endpoints, RouteEndpoints } from "@/utils/Endpoints";
import { PersonalInfoSchema } from "@/utils/Validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import Toast from "@/utils/Toast";
import { setUser } from "@/redux/slice/userSlice";
import { RootState } from "@/redux/RootReducer";
import useAxiosPrivate from "@/Hooks/useAxiosPrivate";

export const usePersonalInfo = () => {

  const {axiosPrivate} = useAxiosPrivate();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { dob, sex, looking_for, life_state } = useSelector(
    (state: RootState) => state.user
  );
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
      gender: sex,
      lookingFor: [],
      lifeStages: [],
    },
    resolver: zodResolver(PersonalInfoSchema),
  });
  console.log(life_state)
  useEffect(() => {
    if (looking_for.length) {
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
    if (life_state.length) {
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
  const onSubmit: SubmitHandler<FormField> = async (data) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosPrivate.put(
        `${API_ENDPOINTS.USER}${Endpoints.UPDATE_PERSONAL_INFO}`,
        data
      );
      if (res.data.success) {
        dispatch(setLoading(false));
        Toast(res.data.message, "success");
        dispatch(setUser(res.data.data));
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
