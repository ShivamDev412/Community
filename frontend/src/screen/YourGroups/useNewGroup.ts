import { NewGroupType } from "@/Types";
import { NewGroupSchema } from "@/utils/Validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const useNewGroup = () => {
  type FormField = z.infer<typeof NewGroupSchema>;
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
    // setError,
  } = useForm<NewGroupType>({
    defaultValues: {
      name: "",
      description: "",
      location: "",
      groupType: "Public",
      image: null,
    },
    resolver: zodResolver(NewGroupSchema),
  });
  const onSubmit: SubmitHandler<FormField> = async (data) => {
    const dataToSend = {
      ...data,
      about: data.description,
      group_type: data.groupType,
      image: data.image[0]
    };
    console.log(dataToSend);
    // reset();
    // clearErrors();
  };
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
