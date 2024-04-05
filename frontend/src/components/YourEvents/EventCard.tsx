import { EventType } from "@/Types";
import { FC } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const EventCard: FC<{ data: EventType }> = ({ data }) => {
  const eventDate = moment(data?.event_date).utc().format("ddd, MMM D");
  const eventTime = moment(data?.event_time, "HH:mm:ss").utc().format("h:mm a");
  return (
    <Link to={`/event/${data?.event_id}`}>
      <div className="flex gap-4 mb-10">
        <div className="w-[20%] h-[1in]">
          <img
            src={data?.image}
            alt={`${name}_image`}
            className="w-full h-full rounded-lg"
          />
        </div>
        <div>
          <h3 className="uppercase font-semibold text-[rgba(124,111,80,1)]">
            {eventDate}
            <span className="text-[rgba(124,111,80,1)]"> - </span>
            {eventTime}
          </h3>
          <h3 className="font-semibold text-lg">{data?.name}</h3>
          <p className="text-gray-500 text-sm">{data?.group.location}</p>
          <p className="text-gray-500 text-sm mt-2">
            {" "}
            {data.members
              ? `${data.members} ${data.members === 1 ? "member" : "members"}`
              : "No members"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
