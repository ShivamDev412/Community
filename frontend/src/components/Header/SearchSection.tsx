import { useGetCity } from "@/Hooks/useGetCity";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";

const SearchSection = () => {
  const [place, setPlace] = useState("");
  const { city } = useGetCity();
  useEffect(() => {
    setPlace(city);
  }, [city]);

  return (
    <div className="border border-slate-300 rounded-lg flex items-center">
      <input
        type="text"
        className="rounded-l-lg p-2 border-r border-slate-300"
        placeholder="Search events"
      />
      <input
        type="text"
        className=" p-2"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
      />
      <button className="bg-primary p-2 flex justify-center rounded-r-lg">
        <SearchIcon className="fill-white" />
      </button>
    </div>
  );
};

export default SearchSection;
