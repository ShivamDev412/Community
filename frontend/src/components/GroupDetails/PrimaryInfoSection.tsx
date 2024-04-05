import { FC } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { PrimaryInfoSectionProps } from "@/Types";
import GroupAndEventEditAndDelete from "../GroupAndEventEditAndDelete";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";

const PrimaryInfoSection: FC<PrimaryInfoSectionProps> = ({
  host,
  name,
  location,
  membersCount,
  groupType,
  organizedBy,
}) => {
  const { userId } = useSelector((state: RootState) => state.user);
  return (
    <div className="w-full sm:w-[45%] flex flex-col xs:gap-2 xl:gap-4 mt-4">
      <h1 className="text-2xl lg:text-[2rem] font-bold py-2">{name}</h1>
      <p className="flex gap-2 items-center">
        <span>
          <FaLocationDot className="h-4 w-4" />
        </span>
        {location}
      </p>
      <div className="flex gap-2 items-center">
        <p className="flex gap-2 items-center">
          <HiUsers className="h-5 w-5" />
          {Number(membersCount)
            ? `${membersCount} ${
                Number(membersCount) === 1 ? "member" : "members"
              }`
            : "No members"}
        </p>

        <span className="bg-gray-400 h-4 w-[1px]"></span>
        <p>{groupType} Group</p>
      </div>
      <p className="flex gap-2 items-center">
        <FaUser className="h-4 w-4" /> Organized by:{" "}
        <span className="font-semibold">{organizedBy}</span>
      </p>
      {userId === host && (
        <GroupAndEventEditAndDelete name={name ? name : ""} url={`/edit-group/${name}`}/>
      )}
    </div>
  );
};

export default PrimaryInfoSection;
