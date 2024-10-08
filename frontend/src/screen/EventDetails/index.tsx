import moment from "moment";
import Button from "@/components/Button";
import { useEventDetails } from "./useEventDetail";
import {
  EventAttendees,
  EventDescription,
  EventDetailBannerImage,
  EventDetailsHeaderSection,
  EventGroupDetails,
  EventTags,
  EventTimeAndLocation,
} from "@/components/EventDetails";
import GroupAndEventEditAndDelete from "@/components/GroupAndEventEditAndDelete";

const EventDetail = () => {
  const {
    eventDetails: event,
    id: userId,
    attendEvent,
    isAttending,
    cancelRSVP,
  } = useEventDetails();
  const eventDate = moment(event?.event_date).utc().format("ddd, MMM D YYYY");
  const eventTime = moment(event?.event_time).utc().format("h:mm a");
  const eventEndTime = moment(event?.event_end_time).utc().format("h:mm a");
  return (
    <section className="mb-10">
      <section className="bg-white w-screen shadow">
        <EventDetailsHeaderSection
          eventName={event?.name}
          eventType={event?.event_type}
          eventDate={eventDate}
          hostProfilePic={event?.host?.image}
          hostName={event?.host?.name}
        />
      </section>
      <section className="flex justify-between flex-wrap w-11/12 sm:w-10/12 lg:w-9/12 2xl:w-6/12 mx-auto mt-6">
        <section className="w-full lg:w-[65%] h-auto">
          <EventDetailBannerImage
            image={event?.image}
            compressedImage={event.compressed_image}
            name={event?.name}
          />
          <div className="mt-5">
            {event?.host?.id === userId ? (
              <GroupAndEventEditAndDelete
                name={event?.name ? event?.name : ""}
                url={`/edit-event/${event.id}`}
              />
            ) : isAttending ? (
              <div className="my-5 flex gap-2 w-fit">
                <Button
                  className="font-semibold text-lg bg-green-900
              border-green-700 hover:cursor-default hover:opacity-100"
                >
                  You're Going
                </Button>
                <Button
                  className="bg-red-700 border-red-700"
                  onClick={cancelRSVP}
                >
                  Cancel RSVP
                </Button>
              </div>
            ) : (
              <Button
                className="bg-red-500
                  border-red-500 w-fit"
                onClick={attendEvent}
              >
                {event?.link ? "Attend Online" : "Attend"}
              </Button>
            )}
          </div>

          <EventDescription description={event?.details} />
          <EventTags tags={event?.tags} />
          <EventAttendees members={event?.members} />
        </section>
        <section className="w-full lg:w-[30%] xs:mt-5 xl:mt-0 flex lg:flex-col flex-wrap md:flex md:justify-between lg:justify-start">
          <EventGroupDetails
            groupImage={event?.group?.image}
            groupName={event?.group?.name}
            groupType={event?.group?.group_type}
          />
          <EventTimeAndLocation
            eventDate={eventDate}
            eventTime={eventTime}
            eventLink={event?.link}
            eventEndTime={eventEndTime}
            eventAddress={event?.address}
          />
        </section>
      </section>
    </section>
  );
};

export default EventDetail;
