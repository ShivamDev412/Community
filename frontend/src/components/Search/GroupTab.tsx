import { Group } from "@/Types";
import GroupCard from "../YourGroups/GroupCard";

const GroupTab: React.FC<{ data: Group[] }> = ({ data }) => {
  return (
    <div className="flex flex-wrap gap-4 mt-5">
      {data.map((group) => (
        <GroupCard key={group.id} data={group} />
      ))}
    </div>
  );
};

export default GroupTab;
