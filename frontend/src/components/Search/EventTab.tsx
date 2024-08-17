import { EventType } from "@/Types";
import EventCard from "../YourEvents/EventCard";
const EventTab: React.FC<{ data: EventType[] }> = ({ data }) => {
  console.log(data);
  return (
    <div className="flex flex-col gap-2 mt-5">
      {data.map((event) => (
        <EventCard key={event.id} data={event} />
      ))}
    </div>
  );
};

export default EventTab;
