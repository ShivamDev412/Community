import BackToHome from "@/components/BackToHome";
import { Endpoints } from "@/utils/Endpoints";
import Button from "@/components/Button";
import { useYourEvents } from "./useYourEvents";

const YourEvents = () => {
  const { navigation } = useYourEvents();
  return (
    <>
      <section className="flex items-center justify-between mt-10">
        <div className="flex items-center gap-4">
          <BackToHome />
          <h1 className="text-[2rem] font-bold ">Your Events</h1>
        </div>
        <div className="w-2/12">
          <Button onClick={() => navigation(Endpoints.NEW_EVENT)}>
            Start an event
          </Button>
        </div>
      </section>
      <section></section>
    </>
  );
};

export default YourEvents;
