import EditProfileWrapper from "@/Wrappers/EditProfileWrapper";
import { FormControl } from "@mui/material";
import { useChangePassword } from "./useChangePassword";
import { InputField } from "@/components/Input";
import Button from "@/components/Button";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    // reset,
    // clearErrors,
    // getValues,
    errors,
    // setValue,
    onSubmit,
  } = useChangePassword();
  return (
    <EditProfileWrapper>
      <section className="my-10 sm:ml-10 w-full xs:pl-[1in] sm:pl-[3.2in] md:pl-[2.5in] lg:pl-[2.8in] xl:pl-[2.5in] 2xl:pl-[3in]">
      <div>
          {" "}
          <h1 className="text-[2rem] font-bold">Change Password</h1>
        </div>
        <FormControl
          component="form"
          className="flex flex-col gap-4 mt-10 xs:w-[85%] sm:w-9/12 lg:w-6/12 xl:w-4/12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField
            id={"currentPassword"}
            label={"Current Password"}
            type={"password"}
            register={register}
            errors={errors}
          />
          <InputField
            id={"newPassword"}
            label={"New Password"}
            type={"password"}
            register={register}
            errors={errors}
          />
          <InputField
            id={"confirmPassword"}
            label={"Confirm Password"}
            type={"password"}
            register={register}
            errors={errors}
          />
          <Button type="submit" className="w-fit mt-6">Update Password</Button>
        </FormControl>
      </section>
    </EditProfileWrapper>
  );
};

export default ChangePassword;
