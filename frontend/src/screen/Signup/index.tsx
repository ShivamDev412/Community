import { FormControl, Button } from "@mui/material";
import { Link } from "react-router-dom";
import AuthWrapper from "@/Wrappers/AuthWrapper";
import { InputField } from "@/components/Input";
import { Endpoints } from "@/utils/Endpoints";
import Divider from "@/components/Divider";
import { useSignup } from "./useSignup";
import FileUpload from "@/components/UploadFile";
import { DevTool } from "@hookform/devtools";
import GoogleAuth from "@/components/GoogleAuth";

function Signup() {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    control,
    setValue,
    getValues,
  } = useSignup();
  return (
    <AuthWrapper>
      <section className=" bg-white xs:rounded-none sm:rounded-[25px] p-4 xs:h-screen lg:h-[85%] justify-center flex flex-col items-center overflow-y-auto">
        <h2 className="text-[2rem] text-center font-semibold">
          Create Account
        </h2>
        <FormControl
          component="form"
          className="xs:w-full sm:w-3/4 xl:w-8/12 2xl:w-6/12 mx-auto flex flex-col gap-4  pl-5 pr-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FileUpload
            id={"image"}
            register={register}
            errors={errors}
            className="rounded-full w-[2in] object-cover"
            title={"Upload profile picture"}
            getValues={getValues}
          />
          <InputField
            id={"firstName"}
            label={"First Name"}
            type={"text"}
            register={register}
            errors={errors}
            getValues={getValues}
          />
          <InputField
            id={"lastName"}
            label={"Last Name"}
            type={"text"}
            register={register}
            errors={errors}
            getValues={getValues}
          />
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
          <Button
            className="bg-primary text-white px-4 py-2 rounded-md capitalize text-lg font-semibold"
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
          <p className="text-right">
            Already have an account?{" "}
            <Link to={Endpoints.LOGIN} className="hover:text-primary">
              Log In
            </Link>
          </p>
        </FormControl>
        <DevTool control={control} />
        <section className="mt-4 flex flex-col w-full">
          <Divider />
          <div className="w-1/2 mx-auto flex justify-center mt-5">
            <GoogleAuth setGoogleData={setValue} />
          </div>
        </section>
      </section>
    </AuthWrapper>
  );
}

export default Signup;
