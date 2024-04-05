import { GroupDetails } from "@/Types";
import { FC } from "react";
import ProfileAvatar from "../ProfileAvatar";
import { Link } from "react-router-dom";

const OrganizerAndMembers: FC<{ groupDetails: GroupDetails }> = ({
  groupDetails,
}) => {
  return (
    <div>
      <div>
        <h3 className="font-bold text-xl">Organizer</h3>
        <div className="flex items-center gap-4 mt-5">
          <ProfileAvatar
            image={groupDetails?.organized_by?.image}
            name={groupDetails?.organized_by?.name}
          />
          <p className="font-semibold text-lg">
            {groupDetails?.organized_by?.name}
          </p>
        </div>
      </div>
      <div>
        <div className="mt-10 flex justify-between">
          <h3 className="font-bold text-xl ">
            Members ({groupDetails?.membersCount})
          </h3>
          <Link
            to={`/group/${groupDetails?.name}/members`}
            className="text-cyan-500"
          >
            See All
          </Link>
        </div>
        <div className="flex items-center gap-4 mt-5 flex-wrap">
          {groupDetails.members.slice(0, 15).map((member) => (
            <ProfileAvatar
              key={member.user_id}
              image={member?.image || ""}
              name={member?.name || ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizerAndMembers;
