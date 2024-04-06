import { FormControl, Button } from "@mui/material";
import AuthWrapper from "@/Wrappers/AuthWrapper";
import { InputField } from "@/components/Input";
import { Link } from "react-router-dom";
import { Endpoints } from "@/utils/Endpoints";
import { useLogin } from "./useLogin";
import SocialSignupSection from "@/components/SocialSignupSection";

function Login() {
  const { register, handleSubmit, onSubmit, errors, getValues } = useLogin();

  return (
    <AuthWrapper>
      <section className=" bg-white xs:rounded-none sm:rounded-[25px] p-4 xs:h-screen lg:h-[85%] justify-center flex flex-col items-center">
        <FormControl
          component="form"
          className="xs:w-full sm:w-3/4 xl:w-8/12 2xl:w-6/12 mx-auto flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-[2rem] text-center font-semibold">Log In</h2>
          <InputField
            id={"email"}
            label={"Email"}
            type={"text"}
            register={register}
            errors={errors}
            getValues={getValues}
          />
          <InputField
            id={"password"}
            label={"Password"}
            type={"password"}
            register={register}
            errors={errors}
            getValues={getValues}
          />
          <div className="flex justify-between">
            <Link to={Endpoints.FORGOT_PASSWORD}>Forgot Password?</Link>
          </div>

          <Button
            className="bg-primary text-white px-4 py-2 rounded-md capitalize text-lg font-semibold"
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
          <p className="text-right">
            Don't have an account?{" "}
            <Link to={Endpoints.SIGNUP} className="hover:text-primary">
              Signup
            </Link>
          </p>
        </FormControl>
        <SocialSignupSection />
      </section>
    </AuthWrapper>
  );
}

export default Login;
