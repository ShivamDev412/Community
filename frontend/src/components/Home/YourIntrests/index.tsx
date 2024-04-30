import { RouteEndpoints } from "@/utils/Endpoints";
import SectionTitle from "../SectionEventTitle";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";

const YourInterests = () => {
  const { interests } = useSelector((state: RootState) => state.user);
  return (
    <section>
      <SectionTitle
        title="Your Interests"
        url={RouteEndpoints.INTERESTS}
        more={"See all your interests"}
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {interests?.length > 0 ? (
          interests?.slice(0, 5).map((interest) => (
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
