import { RouteEndpoints } from "@/utils/Endpoints";
import SectionTitle from "../SectionEventTitle";
import NoNewEvents from "@/components/NoNewEvents";

const YourGroups = () => {
  return (
    <section>
      <SectionTitle
        title="Your Groups"
        url={RouteEndpoints.YOUR_GROUPS}
        more={"See all your groups"}
      />
      <NoNewEvents
        title={"You are not in any groups"}
        subTitle={"Groups you have joined will appear here."}
      />
    </section>
  );
};

export default YourGroups;
