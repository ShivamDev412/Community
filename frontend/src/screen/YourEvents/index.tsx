import BackToHome from "@/components/BackToHome";
import { RouteEndpoints } from "@/utils/Endpoints";
import Button from "@/components/Button";
import { EventTabs } from "@/components/YourEvents";
import { useNavigate } from "react-router-dom";
const YourEvents = () => {
  const navigation = useNavigate();
  return (
    <section className="w-11/12 sm:w-10/12 lg:w-9/12 2xl:w-6/12 mx-auto overflow-x-hidden h-full mt-5 pb-10">
      <section className="flex items-center justify-between mt-10">
        <div className="flex items-center gap-4">
          <BackToHome />
          <h1 className="text-2xl font-bold ">Your Events</h1>
        </div>
        <div className="w-fit">
          <Button onClick={() => navigation(RouteEndpoints.CREATE_EVENT)}>
            Start an event
          </Button>
        </div>
      </section>
      <section>
        <EventTabs/>
      </section>
    </section>
  );
};

export default YourEvents;
