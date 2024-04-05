import EditProfileWrapper from "@/Wrappers/EditProfileWrapper";
import { FormControl } from "@mui/material";
import { useAccountManagement } from "./useAccountManagement";
import { InputField } from "@/components/Input";
import { RouteEndpoints } from "@/utils/Endpoints";
import { Link } from "react-router-dom";

const AccountManagement = () => {
  const {
    register,
    handleSubmit,
    // reset,
    // clearErrors,
    getValues,
    errors,
    // setValue,
    onSubmit,
  } = useAccountManagement();
  return (
    <EditProfileWrapper>
      <>
        <div>
          {" "}
          <h1 className="text-[2rem] font-bold">Account Management</h1>
        </div>
        <FormControl
          component="form"
          encType="multipart/form-data"
          className="flex flex-col gap-4 mt-10 xs:w-[85%] sm:w-9/12 lg:w-6/12 xl:w-4/12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField
            id={"email"}
            label={"Email"}
            type={"text"}
            disabled={true}
            register={register}
            errors={errors}
            getValues={getValues}
          />
          {/* <FormAction /> */}
          <section>
            <h2 className="text-lg font-bold my-6">Change your password</h2>
            <Link
              to={RouteEndpoints.CHANGE_PASSWORD}
              className="text-cyan-700 border-2 text-md border-cyan-700 rounded-lg p-2 bg-white hover:bg-cyan-700 hover:text-white transition"
            >
              Change Password
            </Link>
          </section>
          <section>
            <h2 className="text-lg font-bold my-6">Deactivate your account</h2>
            <button className="capitalize text-md text-cyan-700 border-2 border-cyan-700 rounded-lg p-2 bg-white hover:bg-cyan-700 hover:text-white transition">
              Deactivate Account
            </button>
          </section>
        </FormControl>
      </>
    </EditProfileWrapper>
  );
};

export default AccountManagement;
