import { RouteEndpoints } from "@/utils/Endpoints";
import SectionTitle from "../SectionEventTitle";
import { useUserQuery } from "@/redux/slice/api/userSlice";

const YourInterests = () => {
  const { data: user } = useUserQuery("");
  console.log(user?.data?.interests);
  return (
    <section>
      <SectionTitle
        title="Your Interests"
        url={RouteEndpoints.INTERESTS}
        more={"See all your interests"}
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {user?.data?.interests && user?.data?.interests?.length > 0 ? (
          user?.data?.interests?.slice(0, 5).map((interest) => (
            <div
              key={interest?.id}
              className="border border-cyan-700 px-2 py-1 rounded-lg text-white font-semibold bg-cyan-700"
            >
              {interest?.name}
            </div>
          ))
        ) : (
          <div>
            <p></p>
          </div>
        )}
      </div>
    </section>
  );
};

export default YourInterests;
