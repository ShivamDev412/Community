import { GroupCardProps } from "@/Types";
import { FC } from "react";
import { Link } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import LazyLoadedImageComponent from "../LazyLoadedImageComponent";

const GroupCard: FC<GroupCardProps> = ({ data }) => {
  return (
    <Link to={`/group/${data.name}/`} className="w-full sm:w-3/12">
      <div className="flex flex-col gap-2 items-center rounded-lg">
        <div className="w-full h-full">
          <LazyLoadedImageComponent
            alt={`${data.name}_group_image`}
            image={data?.image}
            compressedImage={data?.compressed_image}
          />
        </div>
        <p className="truncate w-full text-center text-md font-semibold">
          {data.name}
        </p>
      </div>
    </Link>
  );
};

export default GroupCard;
