import GroupDetailWrapper from "@/Wrappers/GroupDetailsWrapper";

import {
  GroupDescription,
  OrganizerAndMembers,
} from "@/components/GroupDetails";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/RootReducer";
const GroupDetail = () => {
  const { groupDetails } = useSelector((state: RootState) => state.groups);

  return (
    <GroupDetailWrapper>
      <section className="mt-5 flex flex-wrap gap-5 justify-between">
        <section className="w-full sm:w-[48.5%]">
          <GroupDescription about={groupDetails?.about} />
        </section>
        <section className="w-full sm:w-[48.5%]">
          <OrganizerAndMembers groupDetails={groupDetails} />
        </section>
      </section>
    </GroupDetailWrapper>
  );
};

export default GroupDetail;
