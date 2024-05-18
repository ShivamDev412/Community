import { RouteEndpoints } from "@/utils/Endpoints";
import NoNewEvents from "../../NoNewEvents";
import SectionTitle from "../SectionEventTitle";
import RsvpEventCard from "./RsvpEventCard";
import { useRsvpEventsQuery } from "@/redux/slice/api/homeSlice";

function YourNextEvents() {
  const { data: rsvpEvents } = useRsvpEventsQuery("");
  return (
    <section>
      <SectionTitle
        title="Your Next Event"
        url={RouteEndpoints.YOUR_EVENTS}
        more={"View All"}
      />
      {rsvpEvents?.data?.length ? (
        <div className="flex flex-col p-4 mt-5 rounded-lg bg-white border border-gray-300 py-4 my-4 ">
          {rsvpEvents?.data?.map((event: any, index: number) => (
            <RsvpEventCard
              key={event.id}
              event={event}
              isLast={index === rsvpEvents?.data?.length - 1}
            />
          ))}
        </div>
      ) : (
        <NoNewEvents
          title={"You have not registered for any events"}
          subTitle={"Events you have registered for will appear here."}
        />
      )}
    </section>
  );
}

export default YourNextEvents;
