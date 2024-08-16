import GroupDetailWrapper from "@/Wrappers/GroupDetailsWrapper";
import { useGroupEvents } from "./useGroupEvents";
import { GroupEventCard } from "@/components/GroupDetails";

const GroupDetailEvents = () => {
  const { eventsInGroup } = useGroupEvents();
  return (
    <GroupDetailWrapper>
      <section className="mt-5">
        {eventsInGroup?.data?.length !== 0 ? (
          eventsInGroup?.data?.map((event) => <GroupEventCard {...event as any} />)
        ) : (
          <div className="flex justify-center items-center h-[50vh] text-lg font-semibold">
            <p>No upcoming events</p>
          </div>
        )}
      </section>
    </GroupDetailWrapper>
  );
};

export default GroupDetailEvents;
