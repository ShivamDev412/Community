import { EventDetailBannerImageProps } from "@/Types";
import { FC } from "react";

const EventDetailBannerImage: FC<EventDetailBannerImageProps> = ({
  image,
  name,
}) => {
  return (
    <div className="w-full h-auto">
      <img
        src={image}
        alt={`${name}_image`}
        className="w-full h-full rounded-lg"
      />
    </div>
  );
};

export default EventDetailBannerImage;
