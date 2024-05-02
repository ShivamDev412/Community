import { EventDetailType } from "@/Types";

import { PiVideoCameraLight } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import moment from "moment";
import { FC } from "react";
import { Link } from "react-router-dom";
import LazyLoadedImageComponent from "../LazyLoadedImageComponent";

const GroupEventCard: FC<EventDetailType> = ({
  event_date,
  event_type,
  event_end_time,
  event_time,
  name,
  details,
  members,
  image,
  id,
  compressed_image,
}) => {
  const eventDate = moment(event_date).format("ddd, MMM D YYYY");
  const eventTime = moment(event_time, "HH:mm:ss").format("h:mm a");
  const eventEndTime = moment(event_end_time, "HH:mm:ss").format("h:mm a");
  return (
    <Link to={`/event/${id}`}>
      <div className="bg-white rounded-lg p-4 shadow flex gap-3 items-start">
        <div className="xs:w-2/5 sm:w-1/4 ">
          <LazyLoadedImageComponent
            image={image}
            compressedImage={compressed_image}
            alt={`${name}_cover_image`}
          />
        </div>
        <div>
          <h3 className="uppercase text-[rgba(124,111,80,1)] font-bold text-sm sm:text-[0.95rem]">
            {eventDate}, {eventTime} - {eventEndTime}
          </h3>
          <h2 className="capitalize text-lg mt-2 font-semibold">{name}</h2>
          <div className="mt-2">
            {event_type === "online" ? (
              <div className="flex items-center gap-3">
                <PiVideoCameraLight className="h-6 w-6 fill-gray-500" />
                <p className="capitalize text-gray-500">{event_type} Event</p>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <FaLocationDot />
                <p className="capitalize text-gray-500">{event_type} Event</p>
              </div>
            )}
          </div>
          <p className="mt-2 text-gray-600">{details}</p>
          <div className="mt-2 flex relative items-center">
            {members?.slice(0, 5).map((member, index) => (
              <div
                key={member.id}
                className={`h-[3rem] w-[3rem] ${index > 0 ? "-ml-5" : ""}`}
              >
                <img
                  src={member.image}
                  alt={`${member.name}_image`}
                  className="rounded-full w-full h-full"
                />
              </div>
            ))}
            <p className="text-gray-500 text-sm ml-2">
              {members?.length > 5
                ? `+${members?.length - 5} attendees`
                : `${members?.length} attendees`}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GroupEventCard;
