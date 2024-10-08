import { GroupsProps } from "@/Types";
import { FC } from "react";
import GroupCard from "./GroupCard";
import NoDataFound from "../NoDataFound";

const GroupsSection: FC<GroupsProps> = ({ title, data, noDataText }) => {
  return (
    <section className="w-full  sm:w-10/12 mx-auto mt-5">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-10 flex items-center gap-8 flex-wrap">
        {data.length ? (
          <>
            {data.map((value) => (
              <GroupCard data={value} key={value.name} />
            ))}
          </>
        ) : (
          <NoDataFound text={noDataText} />
        )}
      </div>
    </section>
  );
};

export default GroupsSection;
