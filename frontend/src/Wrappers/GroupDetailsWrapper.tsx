import { useGroupDetails } from "@/screen/GroupDetails/useGroupDetails";
import {
  GroupImageSection,
  PrimaryInfoSection,
  GroupDetailTabSection,
} from "@/components/GroupDetails";
import React from "react";
import { useSelector } from "react-redux";
import GroupDetailsSkeleton from "@/screen/GroupDetails/GroupDetailsSkeleton";
import { RootState } from "@/redux/RootReducer";

const GroupDetailWrapper = ({ children }: { children: React.ReactNode }) => {
  const { groupDetails } = useGroupDetails();
  const { skeletonLoading } = useSelector((state: RootState) => state.loading);
  return (
    <>
      {skeletonLoading ? (
        <GroupDetailsSkeleton />
      ) : (
        <>
          <section className="pb-4 border-b border-gray-300 overflow-x-hidden">
            <section className="w-11/12 sm:w-10/12 lg:w-9/12 2xl:w-6/12 mx-auto overflow-x-hidden h-full mt-5">
              <section className="flex flex-wrap justify-between xs:gap-4 sm:gap-0 overflow-hidden">
                <GroupImageSection
                  image={groupDetails?.image}
                  name={groupDetails?.name}
                  compressedImage={groupDetails?.compressed_image}
                />
                <></>
                <PrimaryInfoSection
                  host={groupDetails?.organized_by?.id}
                  name={groupDetails?.name}
                  location={groupDetails?.location}
                  membersCount={groupDetails?.membersCount}
                  groupType={groupDetails?.group_type}
                  organizedBy={groupDetails?.organized_by.name}
                />
              </section>
            </section>
          </section>
          <section className="w-11/12 sm:w-10/12 lg:w-9/12 2xl:w-6/12 mx-auto mt-5">
            <GroupDetailTabSection />
            {children}
          </section>
        </>
      )}
    </>
  );
};

export default GroupDetailWrapper;
