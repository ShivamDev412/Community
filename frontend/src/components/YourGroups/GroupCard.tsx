import { GroupCardProps } from "@/Types";
import { RouteEndpoints } from "@/utils/Endpoints";
import { FC } from "react";
import { Link } from "react-router-dom";

const GroupCard: FC<GroupCardProps> = ({ data }) => {
  return (
    <Link to={`${RouteEndpoints.YOUR_GROUPS}/${data.name}/`} className="w-full sm:w-3/12" >
      <div className="flex flex-col gap-2 items-center rounded-lg">
        <div className="w-full h-full">
          <img
            src={data.image}
            alt={`${data.name}_group_image`}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <p className="truncate w-full text-center text-md font-semibold">{data.name}</p>
      </div>
    </Link>
  );
};

export default GroupCard;
