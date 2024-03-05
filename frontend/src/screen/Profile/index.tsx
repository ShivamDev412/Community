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
  const { image, name, location, email, joined_on_date } = useProfile();
  return (
    <section className="overflow-x-hidden bg-[#f8f8f9] h-full">
      <section className="flex justify-between flex-wrap mt-10 xs:w-11/12 sm:w-8/12 mx-auto">
        <section className="xs:w-full sm:w-[30%] xl:w-4/12">
          <section className="bg-white p-6 rounded-lg">
            <ProfileImage
              image={image}
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
          <EditProfileLink image={image} name={name} />
        </section>

        <section className="xs:w-full sm:w-8/12">
          <MyInterests />
          <Groups />
        </section>
      </section>
    </section>
  );
};

export default Profile;
