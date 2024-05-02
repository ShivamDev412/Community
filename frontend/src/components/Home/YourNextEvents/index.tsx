import { RouteEndpoints } from "@/utils/Endpoints";
import NoNewEvents from "../../NoNewEvents";
import SectionTitle from "../SectionEventTitle";
import { useYourNextEvents } from "./useYourNextEvents";
import RsvpEventCard from "./RsvpEventCard";

function YourNextEvents() {
  const { rsvpEvents } = useYourNextEvents();
  return (
    <section>
      <SectionTitle
        title="Your Next Event"
        url={RouteEndpoints.YOUR_EVENTS}
        more={"View All"}
      />
      {rsvpEvents.length ? (
        <div className="flex flex-col gap-4 p-4 mt-5 rounded-lg bg-white border border-gray-300 py-4 my-4 ">
          {rsvpEvents.map((event: any) => (
            <RsvpEventCard key={event.id} event={event} />
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
