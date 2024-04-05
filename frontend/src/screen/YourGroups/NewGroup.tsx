import { DescriptionField, InputField, SelectField } from "@/components/Input";
import { useNewGroup } from "./useNewGroup";
import { GroupType } from "@/utils/Constant";
import FileUpload from "@/components/UploadFile";
import Button from "@/components/Button";
import SearchLocation from "@/components/SearchLocation";

const NewGroup = () => {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    backToGroup,
    setValue,
    getValues,
    isEditGroup,
  } = useNewGroup();
  return (
    <>
      <h1 className="mt-10 text-[2rem] text-center font-semibold">
        {isEditGroup ? "Edit Group" : "Create New Group"}
      </h1>
      <section className="my-10 w-full sm:w-1/2 xl:w-1/4 mx-auto">
        <form
          className="flex flex-col gap-8"
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <InputField
            id={"name"}
            label={"Group Name"}
            type={"text"}
            register={register}
            errors={errors}
            getValues={getValues}
          />
          <DescriptionField
            id={"description"}
            label={"Group Description"}
            register={register}
            getValues={getValues}
            errors={errors}
          />
          <SelectField
            id={"groupType"}
            register={register}
            label={"Group Type"}
            errors={errors}
            options={[...GroupType]}
            defaultValue={
              getValues("groupType")
                ? getValues("groupType")
                : GroupType[0].value
            }
            getValues={getValues}
          />
          <SearchLocation
            id={"location"}
            label={"Group Location"}
            register={register}
            errors={errors}
            getValues={getValues}
            setValue={setValue}
          />
          <FileUpload
            id={"image"}
            register={register}
            errors={errors}
            getValues={getValues}
          />
          <div className="flex items-center w-full justify-center gap-4">
            <Button type="button" className="bg-red-800" onClick={backToGroup}>
              Cancel
            </Button>

            <Button type="submit">
              {isEditGroup ? "Update" : "Create"} Group
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewGroup;
