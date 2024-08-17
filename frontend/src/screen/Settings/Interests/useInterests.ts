import { useEffect, useState } from "react";
import Toast from "@/utils/Toast";
import { SelectChangeEvent } from "@mui/material";
import { useCategoriesQuery } from "@/redux/slice/api/categoriesSlice";
import {
  useAddTagMutation,
  useDeleteTagMutation,
  useLazyTagsQuery,
  useUserTagsQuery,
} from "@/redux/slice/api/tagsSlice";
import { Interest } from "@/Types";
export const useInterests = () => {
  const [category, setCategory] = useState("");
  const [interests, setInterests] = useState<{ name: string; id: string }[]>(
    []
  );
  const { data: categories } = useCategoriesQuery("");
  const { data: selectedInterests } = useUserTagsQuery("");
  const [addTag] = useAddTagMutation();
  const [deleteTag] = useDeleteTagMutation();
  const [trigger, { data: tagsData }] = useLazyTagsQuery();
  useEffect(() => {
    if (tagsData) {
      setInterests(
        tagsData?.data.length
          ? tagsData?.data?.map((value) => ({
              name: value.name,
              id: value.id,
            }))
          : []
      );
    }
  }, [tagsData]);
  const handleCategory = async (e: SelectChangeEvent<string>) => {
    const filteredCategories = categories?.data.filter(
      (category) => category.name === e.target.value
    );
    const categoryId =
      filteredCategories && filteredCategories.length > 0
        ? filteredCategories[0].id
        : null;
    setCategory(e.target.value);
    if (categoryId) {
      try {
        trigger(categoryId);
      } catch (err: any) {
        Toast(err.message, "error");
      }
    }
  };
  const handleSelectedInterests = async (interest: {
    name: string;
    id: string;
  }) => {
    try {
      const response = await addTag({
        interestId: interest.id,
      }).unwrap();
      if (response.success) {
        const updatedInterest = interests.filter((i) => i.id !== interest.id);
        setInterests(updatedInterest);
      }
    } catch (err: any) {
      Toast(err.message, "error");
    }
  };
  const handleRemoveInterest = async (interest: Interest) => {
    try {
      const res = await deleteTag(interest.id).unwrap();
      if (res.success) {
        setInterests((prevInterest) => [...prevInterest, interest]);
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
