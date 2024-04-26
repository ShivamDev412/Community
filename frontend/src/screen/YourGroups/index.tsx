import BackToHome from "@/components/BackToHome";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";
import { RouteEndpoints } from "@/utils/Endpoints";
import { useYourGroup } from "./useYourGroup";
import GroupsSection from "@/components/YourGroups/GroupsSection";

const YourGroups = () => {
  const navigation = useNavigate();
  const {
    groupsCreated,
    groupsInMember,
    // pageNumberCreated,
    // pageNumberInMember,
  } = useYourGroup();
  return (
    <section className="w-11/12 sm:w-10/12 mx-auto overflow-x-hidden h-full pb-10">
      <section className="flex items-center justify-between mt-10">
        <div className="flex items-center gap-4">
          <BackToHome />
          <h1 className="text-2xl font-bold ">Your Groups</h1>
        </div>
        <div className="w-fit">
          <Button onClick={() => navigation(RouteEndpoints.CREATE_GROUP)}>
            Start a group
          </Button>
        </div>
      </section>
      <GroupsSection
        title="Members"
        data={groupsInMember}
        noDataText="You are not in any groups"
      />
      <GroupsSection
        title="Organizer"
        data={groupsCreated}
        noDataText="You haven't created any groups"
      />
    </section>
  );
};

export default YourGroups;
