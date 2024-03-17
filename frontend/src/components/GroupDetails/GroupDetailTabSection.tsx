import { GroupTabSection } from "@/utils/Constant";
import { Link } from "react-router-dom";
import useGroupDetailsTab from "./useGroupDetailsTab";

const GroupDetailTabSection = () => {
  const { getLink, path } = useGroupDetailsTab();
  return (
    <section className="w-11/12 sm:w-10/12 lg:w-8/12 2xl:w-6/12 mx-auto mt-5">
      <div className="flex items-center gap-4">
        {GroupTabSection.map((value) => (
          <Link
            to={getLink(value.link)}
            className={`${
              `/${path}` === value.link
                ? "text-cyan-500"
                : "text-black"
            }`}
          >
            {value.value}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default GroupDetailTabSection;
