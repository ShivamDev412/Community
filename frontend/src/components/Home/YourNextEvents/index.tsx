import { RouteEndpoints } from "@/utils/Endpoints";
import NoNewEvents from "../../NoNewEvents";
import SectionTitle from "../SectionEventTitle";

function YourNextEvents() {
  return (
    <section>
      <SectionTitle
        title="Your Next Event"
        url={RouteEndpoints.YOUR_EVENTS}
        more={"View All"}
      />

      <NoNewEvents
        title={"You have not registered for any events"}
        subTitle={"Events you have registered for will appear here."}
      />
    </section>
  );
}

export default YourNextEvents;
