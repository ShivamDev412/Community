import GroupDetailWrapper from "@/Wrappers/GroupDetailsWrapper";

import {
  GroupDescription,
  OrganizerAndMembers,
} from "@/components/GroupDetails";
import { useGroupDetails } from "./useGroupDetails";
const GroupDetail = () => {
  const { groupDetails } = useGroupDetails();
  console.log(groupDetails);
  return (
    <GroupDetailWrapper>
      {groupDetails?.data && (
        <section className="mt-5 flex flex-wrap gap-5 justify-between">
          <section className="w-full sm:w-[48.5%]">
            <GroupDescription about={groupDetails?.data?.about} />
          </section>
          <section className="w-full sm:w-[48.5%]">
            <OrganizerAndMembers groupDetails={groupDetails?.data} />
          </section>
        </section>
      )}
    </GroupDetailWrapper>
  );
};

export default GroupDetail;
