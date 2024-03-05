import { SectionTitleProps } from "@/Types";
import { FC } from "react";
import { Link } from "react-router-dom";

const SectionTitle: FC<SectionTitleProps> = ({ title, url, more }) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">{title}</h2>
      <Link to={url} className="text-md text-cyan-700">
        {more}
      </Link>
    </div>
  );
};
export default SectionTitle;
