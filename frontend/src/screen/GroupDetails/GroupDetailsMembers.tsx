import GroupDetailWrapper from "@/Wrappers/GroupDetailsWrapper";

const GroupDetailMembers = () => {
  return (
    <GroupDetailWrapper>
      <div className="flex justify-center items-center h-[50vh] text-lg font-semibold">
        <p>No members yet</p>
      </div>
    </GroupDetailWrapper>
  );
};

export default GroupDetailMembers;
