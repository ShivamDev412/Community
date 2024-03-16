import BackToHome from "@/components/BackToHome";
import { RouteEndpoints } from "@/utils/Endpoints";
import Button from "@/components/Button";
import { useYourEvents } from "./useYourEvents";

const YourEvents = () => {
  const { navigation } = useYourEvents();
  return (
    <section className="w-11/12 sm:w-8/12 mx-auto overflow-x-hidden h-full">
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
      <section></section>
    </section>
  );
};

export default YourEvents;
