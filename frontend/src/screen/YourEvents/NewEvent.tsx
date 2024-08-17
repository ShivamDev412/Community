import {
  DateField,
  TimeField,
  DescriptionField,
  InputField,
  SelectField,
  MultiSelectField,
} from "@/components/Input";
import { useNewEvent } from "./useNewEvent";
import SearchLocation from "@/components/SearchLocation";
import FileUpload from "@/components/UploadFile";
import Button from "@/components/Button";
import { EventType } from "@/utils/Constant";
import {DevTool} from "@hookform/devtools"
const NewEvent = () => {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    backToEvent,
    groups,
    tags,
    setValue,
    eventType,
    setEventType,
    clearErrors,
    getValues,
    setError,
    isEditableEvent,
    categories,
    getTags,
    control,
  } = useNewEvent();
  return (
    <>
      <h1 className="mt-10 text-[2rem] text-center font-semibold">
        {isEditableEvent ? "Edit Event" : "Create new event"}
      </h1>
      <section className="my-10 w-full sm:w-1/2 xl:w-1/4 mx-auto">
        <form
          className="flex flex-col gap-8"
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <InputField
            id={"name"}
            label={"Event Name"}
            type={"text"}
            register={register}
            getValues={getValues}
            errors={errors}
          />
          <DescriptionField
            id={"details"}
            label={"Event Description"}
            register={register}
            getValues={getValues}
            errors={errors}
          />
          <SelectField
            id={"group"}
            register={register}
            label={"Group"}
            errors={errors}
            options={[...groups]}
            defaultValue={getValues("group") || groups[0]?.value}
            getValues={getValues}
          />
          <SelectField
            id={"type"}
            register={register}
            label={"Event Type"}
            errors={errors}
            options={[...EventType]}
            onChange={setEventType}
            defaultValue={getValues("type") || EventType[0]?.value}
            getValues={getValues}
          />
            <SelectField
            id={"category"}
            register={register}
            label={"Category"}
            errors={errors}
            options={[...categories]}
            defaultValue={getValues("category") || categories[0]?.value}
            getValues={getValues}
            onChange={getTags}
          />
          <MultiSelectField
            id={"tags"}
            register={register}
            label={"Event Tags"}
            errors={errors}
            options={[...tags]}
            defaultValue={getValues("tags") || []}
            getValues={getValues}
            setValue={setValue}
            clearErrors={clearErrors}
            setError={setError}
          />
          <DateField
            id={"date"}
            label={"Event Date"}
            register={register}
            errors={errors}
            setValue={setValue}
            setError={setError}
            getValues={getValues}
          />
          <TimeField
            id={"time"}
            label={"Event Time"}
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            setError={setError}
          />
          <TimeField
            id={"event_end_time"}
            label={"Event End Time"}
            register={register}
            errors={errors}
            getValues={getValues}
            setValue={setValue}
            setError={setError}
          />

          <InputField
            id={"link"}
            label={"Event Link"}
            type={"text"}
            getValues={getValues}
            register={register}
            errors={errors}
            disabled={eventType === "in-person" || eventType === ""}
          />

          <SearchLocation
            id={"address"}
            label={"Event Location"}
            register={register}
            getValues={getValues}
            errors={errors}
            setValue={setValue}
            disabled={eventType === "online" || eventType === ""}
          />

          <FileUpload
            id={"image"}
            register={register}
            errors={errors}
            getValues={getValues}
          />
          <div className="flex items-center w-full justify-center gap-4">
            <Button type="button" className="bg-red-800" onClick={backToEvent}>
              Cancel
            </Button>

            <Button type="submit">
              {isEditableEvent ? "Update Event" : "Create Event"}
            </Button>
          </div>
        </form>
        <DevTool control={control} placement="top-right" />
      </section>
    </>
  );
};

export default NewEvent;
