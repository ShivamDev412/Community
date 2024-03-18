import { ProfileAvatarProps } from "@/Types";
import { FC } from "react";

const ProfileAvatar: FC<ProfileAvatarProps> = ({ image, name }) => {
  return (
    <div className="h-[4.2rem] w-[4.2rem]">
      <img
        src={image}
        alt={`${name}_profile_image`}
        className="h-full w-full rounded-full"
      />
    </div>
  );
};

export default ProfileAvatar;
