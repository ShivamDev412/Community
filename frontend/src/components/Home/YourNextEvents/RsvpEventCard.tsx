import { EventType } from "@/Types";
import LazyLoadedImageComponent from "@/components/LazyLoadedImageComponent";
import moment from "moment";
import { Link } from "react-router-dom";

const RsvpEventCard: React.FC<{ event: EventType }> = ({ event }) => {
  const eventDate = moment(event?.event_date).utc().format("ddd, MMM D");
  const eventTime = moment(event?.event_time).utc().format("h:mm A");
  const eventEndTime = moment(event?.event_end_time).utc().format("h:mm A");
  return (
    <Link to={`/event/${event?.id}`} className="border-b-2">
      <div className="flex gap-2 items-start mb-5">
        <div className="xs:w-2/5 sm:w-[35%] ">
          <LazyLoadedImageComponent
            image={event?.image}
            compressedImage={event?.compressed_image}
            alt={`${event?.name}_cover_image`}
          />
        </div>
        <div className="xs:w-3/5 sm:w-[65%]">
          <h3 className="uppercase font-semibold text-[rgba(124,111,80,1)] text-sm">
            {eventDate}
            <span className="text-[rgba(124,111,80,1)]"> - </span>
            {eventTime} - {eventEndTime}
          </h3>
          <h3 className="font-semibold text-lg">{event?.name}</h3>
          <p className="text-gray-500 text-sm">{event?.group?.location}</p>
        </div>
      </div>
    </Link>
  );
};

export default RsvpEventCard;
