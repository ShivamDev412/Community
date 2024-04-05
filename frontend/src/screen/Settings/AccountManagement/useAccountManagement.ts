import { AccountManagementType } from "@/Types";
import { RootState } from "./../../../redux/RootReducer";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {  useSelector } from "react-redux";
import { AccountManagementSchema } from "@/utils/Validations";
import { z } from "zod";

export const useAccountManagement = () => {
  type FormField = z.infer<typeof AccountManagementSchema>;
  const { email } = useSelector((state: RootState) => state.user);
  const {
    register,
    handleSubmit,
    reset,
  
    clearErrors,
    getValues,
    formState: { errors },
    setValue,
    
  } = useForm<AccountManagementType>({
    defaultValues: {
      email: email ? email : "",
    },
    resolver: zodResolver(AccountManagementSchema),
  });
  const onSubmit: SubmitHandler<FormField> = async (data) => {
    console.log(data);
  };
  return {
    register,
    handleSubmit,
    reset,
    clearErrors,
    getValues,
    errors,
    setValue,
    onSubmit,
  };
};
