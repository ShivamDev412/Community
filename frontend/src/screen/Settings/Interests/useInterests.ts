import { deleteApi, getApi, postApi } from "@/utils/Api";
import { API_ENDPOINTS, Endpoints } from "@/utils/Endpoints";
import { useEffect, useState } from "react";
import Toast from "@/utils/Toast";
import { SelectChangeEvent } from "@mui/material";

export const useInterests = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<
    { name: string; category_id: string }[]
  >([]);
  const [interests, setInterests] = useState<
    { name: string; interest_id: string }[]
  >([]);
  const [selectedInterests, setSelectedInterest] = useState<
    { name: string; interest_id: string }[]
  >([]);
  const getCategories = async () => {
    try {
      const res = await getApi(`${API_ENDPOINTS.USER}${Endpoints.CATEGORIES}`);
      if (res.success) {
        setCategories(res.data);
      }
    } catch (err: any) {
      Toast(err.message, "error");
    }
  };
  const getAllUserInterests = async () => {
    try {
      const res = await getApi(
        `${API_ENDPOINTS.USER}${Endpoints.GET_USER_INTERESTS}`
      );
      if (res.success) {
        setSelectedInterest(res.data);
      }
    } catch (err: any) {
      Toast(err.message, "error");
    }
  };
  useEffect(() => {
    getCategories();
    getAllUserInterests();
  }, []);
  const handleCategory = async (e: SelectChangeEvent<string>) => {
    const categoryId = categories.find(
      (c) => c.name === e.target.value
    )?.category_id;
    setCategory(e.target.value);
    if (categoryId) {
      try {
        const res = await getApi(
          `${API_ENDPOINTS.USER}${Endpoints.INTERESTS}/${categoryId}`
        );
        if (res.success) {
          setInterests(res.data);
        }
      } catch (err: any) {
        Toast(err.message, "error");
      }
    }
  };
  const handleSelectedInterests = async (interest: {
    name: string;
    interest_id: string;
  }) => {
    const updatedInterest = interests.filter(
      (i) => i.interest_id !== interest.interest_id
    );
    setSelectedInterest([...selectedInterests, interest]);
    setInterests(updatedInterest);
    const dataToSend = {
      interestId: interest.interest_id,
    };
    try {
      const res = await postApi(
        `${API_ENDPOINTS.USER}${Endpoints.ADD_INTERESTS}`,
        dataToSend
      );
      if (res.success) {
      }
    } catch (err: any) {
      Toast(err.message, "error");
    }
  };
  const handleRemoveInterest = async (interest: {
    name: string;
    interest_id: string;
  }) => {
    const updatedInterest = selectedInterests.filter(
      (i) => i.interest_id !== interest.interest_id
    );
    setSelectedInterest(updatedInterest);
    if (category !== "") {
      setInterests([...interests, interest]);
    }

    try {
      const res = await deleteApi(
        `${API_ENDPOINTS.USER}${Endpoints.DELETE_INTERESTS}/${interest.interest_id}`
      );
      if (res.success) {
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
