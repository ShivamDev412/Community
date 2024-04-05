import { FC } from "react";
import { GoClock } from "react-icons/go";
import { PiVideoCameraLight } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { EventTimeAndLocationProps } from "@/Types";

const EventTimeAndLocation: FC<EventTimeAndLocationProps> = ({
  eventDate,
  eventTime,
  eventEndTime,
  eventLink,
  eventAddress,
}) => {
  return (
    <div className="bg-white p-3 rounded-lg shadow mt-5 md:mt-0 lg:mt-5 md:w-[49%] lg:w-full">
      <div className="flex gap-4 items-center mb-5">
        <GoClock className="h-5 w-5 fill-gray-500" />
        <div>
          <p className="font-semibold">{eventDate}</p>
          <p className="text-gray-500">
            {eventTime} - {eventEndTime}
          </p>
        </div>
      </div>
      {eventLink ? (
        <div className="flex gap-4 items-center">
          <PiVideoCameraLight className="h-5 w-5 fill-gray-500" />
          <div className="w-3/4">
            <p className="font-semibold">Online Event</p>
            <p className="text-gray-500 break-all">{eventLink}</p>
          </div>
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <FaLocationDot className="h-5 w-5 fill-gray-500" />
          <div className="w-3/4">
            <p className="font-semibold">Offline Event</p>
            <p className="text-gray-500 break-all	">{eventAddress}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventTimeAndLocation;
