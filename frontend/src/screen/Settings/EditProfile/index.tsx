import EditProfileWrapper from "@/Wrappers/EditProfileWrapper";
import { FormControl, IconButton } from "@mui/material";
import useEditProfile from "./useEditProfile";
import { DescriptionField, InputField } from "@/components/Input";
import FileUpload from "@/components/UploadFile";
import SearchLocation from "@/components/SearchLocation";
import { CiCircleInfo } from "react-icons/ci";
import Tooltip from "@mui/material/Tooltip";
import FormAction from "@/components/Settings/FormAction";

const EditProfile = () => {
  const { handleSubmit, register, errors, onSubmit, getValues, setValue } =
    useEditProfile();
  return (
    <EditProfileWrapper>
      <>
        <div>
          {" "}
          <h1 className="text-[2rem] font-bold">Edit Profile</h1>
          <p>This information will appear on your public profile</p>
        </div>
        <FormControl
          component="form"
          encType="multipart/form-data"
          className="flex flex-col gap-4 mt-10 xs:w-[85%] sm:w-9/12 lg:w-6/12 xl:w-4/12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FileUpload
            id={"image"}
            register={register}
            errors={errors}
            getValues={getValues}
            className="rounded-full w-[2in] object-cover"
            title={"Upload profile picture"}
          />
          <InputField
            id={"firstName"}
            label={"First Name"}
            type={"text"}
            getValues={getValues}
            register={register}
            errors={errors}
          />
          <InputField
            id={"lastName"}
            label={"Last Name"}
            type={"text"}
            getValues={getValues}
            register={register}
            errors={errors}
          />
          <DescriptionField
            id={"bio"}
            label={"Bio"}
            getValues={getValues}
            register={register}
            errors={errors}
          />
          <div className="relative">
            <SearchLocation
              id={"address"}
              label={"Address"}
              register={register}
              errors={errors}
              setValue={setValue}
              getValues={getValues}
              placeholder="Enter Your City"
            />
            <Tooltip
              title="Enter Your City"
              className="absolute -right-10 top-2"
            >
              <IconButton>
                <CiCircleInfo className="" />
              </IconButton>
            </Tooltip>
          </div>
          <FormAction />
        </FormControl>
      </>
    </EditProfileWrapper>
  );
};

export default EditProfile;
