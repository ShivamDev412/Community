import { EventGroupDetailsProp } from "@/Types";
import { FC } from "react";

const EventGroupDetails: FC<EventGroupDetailsProp> = ({
  groupImage,
  groupName,
  groupType,
}) => {
  return (
    <div className="bg-white p-3 rounded-lg shadow md:w-[49%] h-fit lg:w-full">
      <div className="flex gap-4">
        <div className="w-1/2 h-auto">
          <img
            src={groupImage}
            alt={`${groupName}_image`}
            className="w-full h-full rounded-lg"
          />
        </div>
        <div>
          <p className="font-semibold">{groupName}</p>
          <p className="text-gray-500">{groupType} Group</p>
        </div>
      </div>
    </div>
  );
};

export default EventGroupDetails;
