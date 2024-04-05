import { EventDetailBannerImageProps } from "@/Types";
import { FC } from "react";
import LazyLoadedImageComponent from "../LazyLoadedImageComponent";

const EventDetailBannerImage: FC<EventDetailBannerImageProps> = ({
  image,
  compressedImage,
  name,
}) => {
  return (
    <div className="w-full h-auto">
      <LazyLoadedImageComponent
        image={image}
        alt={`${name}_image`}
        compressedImage={compressedImage}
      />
    </div>
  );
};

export default EventDetailBannerImage;
