import { EventType } from "@/Types";
import { FC } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { IoShareOutline } from "react-icons/io5";

import LazyLoadedImageComponent from "../LazyLoadedImageComponent";
import Toast from "@/utils/Toast";

const EventCard: FC<{ data: EventType }> = ({ data }) => {
  const eventDate = moment(data?.event_date).utc().format("ddd, MMM D");
  const eventTime = moment(data?.event_time).utc().format("h:mm A");
  const eventEndTime = moment(data?.event_end_time).utc().format("h:mm A");

  const handleShareClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    e.preventDefault();
    const eventUrl = `${window.location.origin}/event/${id}`;
    navigator.clipboard
      .writeText(eventUrl)
      .then(() => Toast("Link copied to clipboard","success"))
      .catch((error) => console.error("Failed to copy link: ", error));
  };

  return (
    <div className="event-card">
      <Link to={`/event/${data?.id}`}>
        <div className="flex xs:gap-2 sm:gap-4 mb-10 items-start">
          <div className="xs:w-2/5 sm:w-1/4 ">
            <LazyLoadedImageComponent
              image={data?.image}
              compressedImage={data?.compressed_image}
              alt={`${data?.name}_cover_image`}
            />
          </div>
          <div className="w-3/5 sm:w-3/4 sm:mt-5">
            <h3 className="uppercase font-semibold text-[rgba(124,111,80,1)] text-sm sm:text-[0.95rem]">
              {eventDate}
              <span className="text-[rgba(124,111,80,1)]"> - </span>
              {eventTime} - {eventEndTime}
            </h3>
            <h3 className="font-semibold text-lg">{data?.name}</h3>
            <p className="text-gray-500 text-sm">{data?.group?.location}</p>
            <div className="flex justify-between mt-5">
              <p className="text-gray-500 text-sm">
                {" "}
                {data?.members
                  ? `${data.members} ${
                      data.members === 1 ? "attendee" : "attendees"
                    }`
                  : "No attendee"}
              </p>
              <button onClick={(e) => handleShareClick(e, data?.id)}>
                {" "}
                <IoShareOutline className="share-icon h-6 w-6 text-gray-600 hover:text-black transition-all" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
