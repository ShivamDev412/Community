import EditProfileWrapper from "@/Wrappers/EditProfileWrapper";
import { FormControl } from "@mui/material";
import { usePersonalInfo } from "./usePersonalInfo";
import { DateField, SelectField } from "@/components/Input";
import { GenderType } from "@/utils/Constant";
import LookingFor from "@/components/Settings/EditProfile/LookingFor";
import FormAction from "@/components/Settings/FormAction";
const ProfileInfo = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    setError,
    lookingFor,
    lifeStages,
    setData,
    getValues,
  } = usePersonalInfo();
  return (
    <EditProfileWrapper>
      <>
        <div>
          {" "}
          <h1 className="text-[2rem] font-bold">Personal Info</h1>
          <p>
            Completing this information helps with your group recommendations.
            Gender and Birthdays will not appear on your public profile
          </p>
        </div>
        <FormControl
          component="form"
          encType="multipart/form-data"
          className="flex flex-col gap-4 mt-10 xs:w-[85%] sm:w-9/12 lg:w-6/12 xl:w-4/12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <DateField
            id={"birthday"}
            label={"Birthday"}
            register={register}
            errors={errors}
            setValue={setValue}
            setError={setError}
            getValues={getValues}
          />
          <SelectField
            id={"gender"}
            register={register}
            label={"Gender"}
            errors={errors}
            options={[...GenderType]}
            getValues={getValues}
            defaultValue={""}
          />
          <LookingFor
            data={lookingFor}
            setData={setData}
            title={"What are you looking for?"}
            subTitle=""
            cb={"setLookingFor"}
          />
          <LookingFor
            data={lifeStages}
            setData={setData}
            title={"Life Stages"}
            subTitle={"Select what represents you"}
            cb={"setLifeStages"}
          />
          <FormAction />
        </FormControl>
      </>
    </EditProfileWrapper>
  );
};

export default ProfileInfo;
