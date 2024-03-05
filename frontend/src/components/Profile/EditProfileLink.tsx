import { EditProfileLinkProps } from "@/Types";
import { RouteEndpoints } from "@/utils/Endpoints";
import { FC } from "react";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const EditProfileLink: FC<EditProfileLinkProps> = ({ name, image }) => {
  return (
    <div className="flex items-center gap-5 bg-white p-6 rounded-lg mt-10">
      <div className="rounded-full h-[0.7in] w-[0.7in]">
        <img
          src={image}
          alt={`${name}_image`}
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <div>
        <h3 className="font-semibold">{name}</h3>
        <Link to={RouteEndpoints.EDIT_PROFILE} className="flex items-center gap-1 text-cyan-700 hover:underline">
          {" "}
          <MdEdit className="h-4 w-4" /> Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default EditProfileLink;
