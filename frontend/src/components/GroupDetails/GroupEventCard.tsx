import { EventDetailType } from "@/Types";

import { PiVideoCameraLight } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import moment from "moment";
import { FC } from "react";
import { Link } from "react-router-dom";

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
}) => {
  const eventDate = moment(event_date).format("ddd, MMM D YYYY");
  const eventTime = moment(event_time, "HH:mm:ss").format("h:mm a");
  const eventEndTime = moment(event_end_time, "HH:mm:ss").format("h:mm a");
  return (
    <Link to={`/event/${id}`}>
      <div className="bg-white rounded-lg p-4 shadow flex gap-3">
        <div className="h-[1in] w-auto">
          <img
            src={image}
            alt={`${name}_image`}
            className="w-full h-full rounded-lg"
          />
        </div>
        <div>
          <h3 className="uppercase text-cyan-700 font-bold text-[1rem]">
            {eventDate}, {eventTime} - {eventEndTime}
          </h3>
          <h2 className="capitalize text-xl mt-2 font-semibold">{name}</h2>
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
          <p className="mt-5">{details}</p>
          <div className="mt-5 flex relative items-center">
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
            <p className="text-[1rem] ml-5">{members?.length} attendees</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GroupEventCard;
