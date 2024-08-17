import { ProfileImageProps } from "@/Types";
import { RouteEndpoints } from "@/utils/Endpoints";
import { FC } from "react";
import { FaCalendar, FaLocationDot } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProfileImage: FC<ProfileImageProps> = ({
  image,
  compressedImage,
  email,
  name,
  joined_on_date,
  location,
}) => {
  return (
    <div className="w-full h-[4in] relative">
      <div className="absolute top-4 right-4 bg-opacity-15 bg-black py-1 px-2 rounded-md hover:cursor-pointer">
        <Link
          to={RouteEndpoints.EDIT_PROFILE}
          className="text-white  flex items-center gap-1"
        >
          <MdEdit className="h-7 w-7" /> Change profile photo
        </Link>
      </div>
      <LazyLoadImage
        alt={"placeholder_image"}
        height={"100%"}
        effect="opacity"
        src={image ? image : ""}
        width={"100%"}
       
        placeholderSrc={compressedImage}
        className="w-full h-full object-cover rounded-lg"
      />
      {/* <img
        src={image}
        alt="placeholder_image"
        className="w-full h-full object-cover rounded-lg"
      /> */}
      <div className="absolute bottom-6 left-6 text-white flex flex-col gap-2">
        <h3 className="font-semibold text-[1.8rem]">{name}</h3>
        <h3 className="">{email}</h3>
        <h3 className="flex items-center gap-1">
          {location !== "" && location !== null && (
            <>
              <FaLocationDot /> {location && location}
            </>
          )}
        </h3>
        <p className="flex items-center gap-1">
          <FaCalendar />
          {joined_on_date && joined_on_date}
        </p>
      </div>
    </div>
  );
};

export default ProfileImage;
