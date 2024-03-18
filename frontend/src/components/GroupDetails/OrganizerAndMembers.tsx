import { GroupDetails } from "@/Types";
import { FC } from "react";
import ProfileAvatar from "../ProfileAvatar";

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
            name={groupDetails.organized_by.name}
          />
          <p className="font-semibold text-lg">
            {groupDetails.organized_by.name}
          </p>
        </div>
      </div>
      <div>
        <h3 className="font-bold text-xl mt-10">Members ({groupDetails.membersCount})</h3>
        <div className="flex items-center gap-4 mt-5">
          {groupDetails.members.map((member) => (
            <ProfileAvatar
              key={member.user_id}
              image={member?.image ? member.image : ""}
              name={member?.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizerAndMembers;
