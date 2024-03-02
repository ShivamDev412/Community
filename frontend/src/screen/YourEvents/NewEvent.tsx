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
    setError,
  } = useNewEvent();
  return (
    <>
      <h1 className="mt-10 text-[2rem] text-center font-semibold">
        Create new event
      </h1>
      <section className="my-10 w-full sm:w-1/2 mx-auto">
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
            errors={errors}
          />
          <DescriptionField
            id={"details"}
            label={"Event Description"}
            register={register}
            errors={errors}
          />
          <SelectField
            id={"group"}
            register={register}
            label={"Group"}
            errors={errors}
            options={[...groups]}
            defaultValue={""}
          />
          <SelectField
            id={"type"}
            register={register}
            label={"Event Type"}
            errors={errors}
            options={[...EventType]}
            onChange={setEventType}
            defaultValue={""}
          />
          <MultiSelectField
            id={"tags"}
            register={register}
            label={"Event Tags"}
            errors={errors}
            options={[...tags]}
            defaultValue={[]}
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
            // control={control}
          />
          <TimeField
            id={"time"}
            label={"Event Time"}
            register={register}
            errors={errors}
            setValue={setValue}
            setError={setError}
          />
          {eventType === "online" ? (
            <InputField
              id={"link"}
              label={"Event Link"}
              type={"text"}
              register={register}
              errors={errors}
            />
          ) : eventType === "in-person" ? (
            <SearchLocation
              id={"address"}
              label={"Event Location"}
              register={register}
              errors={errors}
              setValue={setValue}
            
            />
          ) : (
            <></>
          )}

          <FileUpload id={"image"} register={register} errors={errors} />
          <div className="flex items-center w-full justify-center gap-4">
            <Button type="button" className="bg-red-800" onClick={backToEvent}>
              Cancel
            </Button>

            <Button type="submit">Create Event</Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewEvent;
