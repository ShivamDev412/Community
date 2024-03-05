import { RouteEndpoints } from "@/utils/Endpoints";
import NoNewEvents from "../../NoNewEvents";
import SectionTitle from "../SectionEventTitle";

function YourNextEvents() {
  return (
    <section>
      <SectionTitle
        title="Your Next Event"
        url={RouteEndpoints.HOME}
        more={"View All"}
      />

      <NoNewEvents />
    </section>
  );
}

export default YourNextEvents;
