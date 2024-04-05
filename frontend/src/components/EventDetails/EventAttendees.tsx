import { EventAttendeesProps } from "@/Types";
import { RouteEndpoints } from "@/utils/Endpoints";
import { FC } from "react";
import { Link } from "react-router-dom";

const EventAttendees: FC<EventAttendeesProps> = ({ members }) => {
  return (
    <div className="mt-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Attendees ({members?.length})</h2>
        <Link to={RouteEndpoints.HOME} className="text-cyan-500">See All</Link>
      </div>

      <div className="bg-white p-4 rounded-lg flex gap-4 shadow mt-5 flex-wrap">
        {members?.map((member) => (
          <div
            key={member?.user_id}
            className="flex items-center gap-2 mb-2 flex-col border rounded-md p-3 w-[47%] sm:w-[25%] lg:w-[30%] xl:w-[23%] relative pb-10"
          >
            {member?.type === "host" && (
              <p className="p-1 rounded-md absolute -top-3 left-3 bg-yellow-700 text-white text-sm font-semibold">
                Host
              </p>
            )}
            <div className="w-[4rem] h-[4rem]">
              <img
                src={member?.image}
                alt={`${member?.name}_profile_pic`}
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="text-center">
              <p className="text-[1rem] font-semibold">{member?.name}</p>
              {member?.type === "member" ? (
                <p className="text-gray-500 capitalize text-sm">
                  {member?.type}
                </p>
              ) : (
                <p className="text-gray-500 capitalize text-sm">Organizer</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventAttendees;
