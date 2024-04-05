import GroupDetailWrapper from "@/Wrappers/GroupDetailsWrapper";
import { useGroupEvents } from "./useGroupEvents";
import { GroupEventCard } from "@/components/GroupDetails";

const GroupDetailEvents = () => {
  const { groupEvents } = useGroupEvents();

  return (
    <GroupDetailWrapper>
      <section className="mt-5">
        {groupEvents?.events?.length !== 0 ? (
          groupEvents?.events?.map((event) => <GroupEventCard {...event} />)
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
