import EventCard from "@/components/YourEvents/EventCard";
import { useHomeEvents } from "./useHomeEvent";
import moment from "moment";
const HomeEvents = () => {
  const { events } = useHomeEvents();
  const todayTimestamp = moment().utc().startOf("day").unix();
  return (
    <section className="mt-5">
      {Object.entries(events).map(([timestamp, eventArray]) => (
        <div key={timestamp} className="mb-10">
          <h3 className="font-semibold text-xl pb-2 border-b-2 border-gray-400 mb-4">
            {parseInt(timestamp) === todayTimestamp
              ? "Today"
              : moment.unix(parseInt(timestamp)).utc().format("dddd D MMMM")}
          </h3>

          <ul>
            {eventArray?.map((event) => (
              <EventCard key={event.id} data={event} />
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default HomeEvents;
