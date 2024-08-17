import { UserType } from "@/Types";
import { useProfile } from "./useProfile";
import {
  EditProfileLink,
  ImLookingTo,
  ProfileImage,
  ProfileStats,
  MyInterests,
  Groups,
} from "@/components/Profile";

const Profile = () => {
  const { user, joined_on_date } =
    useProfile();
    const {image, name, email, location, compressed_image} = user?.data as UserType;
  return (
    <section className="overflow-x-hidden bg-[#f8f8f9] h-full pb-10 mt-5">
      <section className="flex justify-between flex-wrap xs:w-11/12 w-11/12 sm:w-10/12 lg:w-9/12 2xl:w-6/12 mx-auto overflow-x-hidden h-full mt-5 pb-10">
        <section className="xs:w-full sm:w-[30%] xl:w-4/12">
          <section className="bg-white p-6 rounded-lg">
            <ProfileImage
              image={image ? image : ""}
              compressedImage={compressed_image ? compressed_image : ""}
              name={name}
              email={email}
              joined_on_date={joined_on_date}
              location={location}
            />
            <div className="flex items-center justify-between mt-5">
              <ProfileStats value="20" title="Groups" />
              <div className="bg-gray-300 h-[2.8rem] w-[1px]"></div>
              <ProfileStats value="20" title="Interests" />
              <div className="bg-gray-300 h-[2.8rem] w-[1px]"></div>
              <ProfileStats value="20" title="RVSPs" />
            </div>
            <ImLookingTo />
          </section>
          <EditProfileLink image={image ? image : ""} name={name} />
        </section>

        <section className="xs:w-full sm:w-[60%]">
          <MyInterests />
          <Groups />
        </section>
      </section>
    </section>
  );
};

export default Profile;
