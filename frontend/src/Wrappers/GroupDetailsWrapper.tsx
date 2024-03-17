import { useGroupDetails } from "@/screen/GroupDetails/useGroupDetails";
import {
  GroupImageSection,
  PrimaryInfoSection,
  GroupDetailTabSection,
} from "@/components/GroupDetails";

const GroupDetailWrapper = ({ children }: { children: React.ReactNode }) => {
  const { groupDetails } = useGroupDetails();
  return (
    <>
      <section className="pb-4 border-b border-gray-300">
        <section className="w-11/12 sm:w-10/12 lg:w-8/12 2xl:w-6/12 mx-auto overflow-x-hidden h-full mt-5">
          <section className="flex flex-wrap justify-between items-center xs:gap-4 sm:gap-0">
            <GroupImageSection
              image={groupDetails?.image}
              name={groupDetails?.name}
            />
            <PrimaryInfoSection
              name={groupDetails?.name}
              location={groupDetails?.location}
              membersCount={groupDetails?.members?.length}
              groupType={groupDetails?.group_type}
              organizedBy={groupDetails?.organized_by.name}
            />
          </section>
        </section>
      </section>
      <GroupDetailTabSection />
      {children}
    </>
  );
};

export default GroupDetailWrapper;
