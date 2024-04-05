import { InputField } from "@/components/Input";
import { RouteEndpoints } from "@/utils/Endpoints";
import { Button, FormControl } from "@mui/material";
import { Link } from "react-router-dom";
import { useResetPassword } from "./useResetPassword";

const ResetPassword = () => {
  const { register, handleSubmit, onSubmit, getValues, errors } =
    useResetPassword();
  return (
    <main className="bg-primary h-screen w-screen flex justify-center items-center">
      <section className="bg-white rounded-lg p-4 w-full sm:w-1/3">
        <FormControl
          component="form"
          className="xs:w-full sm:w-3/4 xl:w-8/12 2xl:w-6/12 mx-auto flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl font-bold text-center">Reset Password</h1>
      
          <InputField
            id="email"
            label="Email"
            type="text"
            register={register}
            errors={errors}
            getValues={getValues}
          />
          <InputField
            id={"newPassword"}
            label={"Password"}
            type={"password"}
            register={register}
            errors={errors}
            getValues={getValues}
          />
          <InputField
            id={"confirmPassword"}
            label={"Password"}
            type={"password"}
            register={register}
            errors={errors}
            getValues={getValues}
          />
          <div className="flex justify-between">
            <Link to={RouteEndpoints.LOGIN}>Back to Login</Link>
          </div>

          <Button
            className="bg-primary text-white px-4 py-2 rounded-md capitalize text-lg font-semibold mt-5 disabled:bg-gray-400 disabled:cursor-not-allowed"
            type="submit"
            variant="contained"
          >
            Reset Password
          </Button>
        </FormControl>
      </section>
    </main>
  );
};

export default ResetPassword;
