import { GroupsProps } from "@/Types";
import { FC } from "react";
import GroupCard from "./GroupCard";

const GroupsSection: FC<GroupsProps> = ({ title, data, noDataText }) => {
  return (
    <section className="w-full  sm:w-10/12 mx-auto mt-5">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-10 flex items-center gap-10 flex-wrap">
        {data.length ? (
          <>
            {data.map((value) => (
              <GroupCard data={value} key={value.group_id} />
            ))}
          </>
        ) : (
          <div className="flex justify-center w-full">
            <p>{noDataText}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default GroupsSection;
