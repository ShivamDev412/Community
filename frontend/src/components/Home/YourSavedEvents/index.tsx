import { RouteEndpoints } from "@/utils/Endpoints";
import SectionTitle from "../SectionEventTitle";

const YourSavedEvents = () => {
  return (
    <section>
      <SectionTitle title="Your Saved Event" url={RouteEndpoints.HOME} more={"View All"}/>

      {/* <NoNewEvents /> */}
    </section>
  );
};

export default YourSavedEvents;
