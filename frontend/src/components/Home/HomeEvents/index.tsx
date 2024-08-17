import EventCard from "@/components/YourEvents/EventCard";
import { useHomeEvents } from "./useHomeEvent";
import moment from "moment";
import NoDataFound from "@/components/NoDataFound";
import { Link } from "react-router-dom";
import { RouteEndpoints } from "@/utils/Endpoints";
const HomeEvents = () => {
  const { events } = useHomeEvents();
  const todayTimestamp = moment().utc().startOf("day").unix();
  const isEventsEmpty = events && Object.keys(events.data).length === 0;
  return (
    <section className="mt-5">
      {isEventsEmpty ? (
        <div className="flex justify-center gap-4 flex-col items-center">
          <NoDataFound text={"No suggested events"} />
          <Link
            to={RouteEndpoints.SEARCH}
            className="text-cyan-700 font-medium"
          >
            Discover new events
          </Link>
        </div>
      ) : (
        events && Object.entries(events?.data).map(([timestamp, eventArray]) => (
          <div key={timestamp && timestamp} className="mb-10">
            <h3 className="font-semibold text-xl pb-2 border-b-2 border-gray-400 mb-4">
              {parseInt(timestamp) === todayTimestamp
                ? "Today"
                : moment
                    .unix(parseInt(timestamp && timestamp))
                    .utc()
                    .format("dddd D MMMM")}
            </h3>
            <ul>
              {eventArray.map((event) => (
                <EventCard key={event?.id} data={event} />
              ))}
            </ul>
          </div>
        ))
      )}
    </section>
  );
};

export default HomeEvents;
