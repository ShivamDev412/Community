import { GroupTabSection } from "@/utils/Constant";
import { Link } from "react-router-dom";
import useGroupDetailsTab from "./useGroupDetailsTab";

const GroupDetailTabSection = () => {
  const { getLink, path } = useGroupDetailsTab();
  return (
    <section className="flex items-center gap-10">
      {GroupTabSection?.map((value) => (
        <Link key={value.value}
          to={getLink(value?.link)}
          className={`${
            `/${path}` === value?.link ? "text-cyan-500" : "text-black"
          } text-lg font-semibold` }
        >
          {value?.value}
        </Link>
      ))}
    </section>
  );
};

export default GroupDetailTabSection;
