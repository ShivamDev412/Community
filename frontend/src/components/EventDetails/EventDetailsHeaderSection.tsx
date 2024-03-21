import { EventDetailsHeaderSectionProps } from "@/Types";
import { FC } from "react";

const EventDetailsHeaderSection: FC<EventDetailsHeaderSectionProps> = ({
  eventName,
  eventType,
  eventDate,
  hostProfilePic,
  hostName,
}) => {
  return (
    <section className="py-6 w-11/12 sm:w-10/12 lg:w-9/12 2xl:w-6/12 mx-auto">
      <h1 className="text-[2rem] font-bold">
        {eventName}{" "}
        <span className="capitalize">
          [{eventType}] - {eventDate}
        </span>
      </h1>
      <div className="flex items-center gap-3 mt-5">
        <div className="h-[3rem] w-[3rem]">
          <img
            src={hostProfilePic}
            alt={`${hostName}_image`}
            className="h-full w-full rounded-full"
          />
        </div>
        <div>
          <p className="text-lg">Hosted By</p>
          <p className="font-semibold">{hostName}</p>
        </div>
      </div>
    </section>
  );
};

export default EventDetailsHeaderSection;
