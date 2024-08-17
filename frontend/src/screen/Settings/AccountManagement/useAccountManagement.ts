import { AccountManagementType, UserType } from "@/Types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AccountManagementSchema } from "@/utils/Validations";
// import { z } from "zod";
import { useUserQuery } from "@/redux/slice/api/userSlice";

export const useAccountManagement = () => {
  // type FormField = z.infer<typeof AccountManagementSchema>;
  const { data: user } = useUserQuery("");
  const { email } = user?.data as UserType;

  const {
    register,
    // handleSubmit,
    reset,

    clearErrors,
    getValues,
    formState: { errors },
    setValue,
  } = useForm<AccountManagementType>({
    defaultValues: {
      email: email || "",
    },
    resolver: zodResolver(AccountManagementSchema),
  });
  // const onSubmit: SubmitHandler<FormField> = async (data) => {
  //  
  // };
  return {
    register,
    // handleSubmit,
    reset,
    clearErrors,
    getValues,
    errors,
    setValue,
    // onSubmit,
  };
};
