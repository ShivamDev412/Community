import { DescriptionField, InputField, SelectField } from "@/components/Input";
import { useNewGroup } from "./useNewGroup";
import { GroupType } from "@/utils/Constant";
import FileUpload from "@/components/UploadFile";
import Button from "@/components/Button";
import SearchLocation from "@/components/SearchLocation";

const NewGroup = () => {
  const { register, handleSubmit, errors, onSubmit } = useNewGroup();
  return (
    <>
      <h1 className="mt-10 text-[2rem] text-center font-semibold">
        Create a new group
      </h1>
      <section className="my-10 w-full sm:w-1/2 mx-auto">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <InputField
            id={"name"}
            label={"Group Name"}
            type={"text"}
            register={register}
            errors={errors}
          />
          <DescriptionField
            id={"description"}
            label={"Group Description"}
            register={register}
            errors={errors}
          />
          <SelectField
            id={"groupType"}
            register={register}
            label={"Group Type"}
            errors={errors}
            options={[...GroupType]}
            defaultValue={GroupType[0].value}
          />
          <SearchLocation
            id={"location"}
            label={"Group Location"}
            register={register}
            errors={errors}
          />
          <FileUpload id={"image"} register={register} errors={errors}/>
          <Button type="submit">Create Group</Button>
        </form>
      </section>
    </>
  );
};

export default NewGroup;
