import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import { useEffect, useState } from "react";
import Toast from "@/utils/Toast";
import { SelectChangeEvent } from "@mui/material";
import useAxiosPrivate from "@/Hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/RootReducer";
import { setUserInterest } from "@/redux/slice/userSlice";
export const useInterests = () => {
  const dispatch = useDispatch();
  const { axiosPrivate } = useAxiosPrivate();
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<{ name: string; id: string }[]>(
    []
  );
  const [interests, setInterests] = useState<{ name: string; id: string }[]>(
    []
  );
  const { interests: selectedInterests } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    getCategories();
    getAllUserInterests();
  }, []);
  const getCategories = async () => {
    try {
      const res = await axiosPrivate.get(
        `${API_ENDPOINTS.USER}${Endpoints.CATEGORIES}`
      );
      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (err: any) {
      Toast(err.message, "error");
    }
  };
  const getAllUserInterests = async () => {
    try {
      const res = await axiosPrivate.get(
        `${API_ENDPOINTS.USER}${Endpoints.GET_USER_INTERESTS}`
      );
      if (res.data.success) {
        dispatch(setUserInterest(
          res.data.data.map((interest: any) => interest.interest)
        ));
      }
    } catch (err: any) {
      Toast(err.message, "error");
    }
  };
  const handleCategory = async (e: SelectChangeEvent<string>) => {
    const filteredCategories = categories.filter(
      (category) => category.name === e.target.value
    );
    const categoryId =
      filteredCategories.length > 0 ? filteredCategories[0].id : null;
    setCategory(e.target.value);
    if (categoryId) {
      try {
        const res = await axiosPrivate.get(
          `${API_ENDPOINTS.USER}${Endpoints.INTERESTS}/${categoryId}`
        );

        if (res.data.success) {
          const filteredInterests = res.data.data.filter(
            (interest: { id: string; name: string }) =>
              !selectedInterests?.some(
                (selectedInterest: { id: string }) =>
                  selectedInterest.id === interest.id
              )
          );
          setInterests(filteredInterests);
        }
      } catch (err: any) {
        Toast(err.message, "error");
      }
    }
  };
  const handleSelectedInterests = async (interest: {
    name: string;
    id: string;
  }) => {
    const updatedInterest = interests.filter((i) => i.id !== interest.id);
    dispatch(setUserInterest([...selectedInterests, interest]));
    setInterests(updatedInterest);
    const dataToSend = {
      interestId: interest.id,
    };
    try {
      const res = await axiosPrivate.post(
        `${API_ENDPOINTS.USER}${Endpoints.ADD_INTERESTS}`,
        dataToSend
      );
      if (res.data.success) {
      }
    } catch (err: any) {
      Toast(err.message, "error");
    }
  };
  const handleRemoveInterest = async (interest: {
    name: string;
    id: string;
  }) => {
    const updatedInterest = selectedInterests.filter(
      (i:{id:string}) => i.id !== interest.id
    );
    dispatch(setUserInterest((updatedInterest)));
    if (category !== "") {
      setInterests([...interests, interest]);
    }

    try {
      const res = await axiosPrivate.delete(
        `${API_ENDPOINTS.USER}${Endpoints.DELETE_INTERESTS}/${interest.id}`
      );
      if (res.data.success) {
        console.log(res.data, "data");
      }
    } catch (err: any) {
      Toast(err.message, "error");
    }
  };
  return {
    category,
    setCategory,
    handleCategory,
    categories,
    interests,
    selectedInterests,
    handleSelectedInterests,
    handleRemoveInterest,
  };
};
