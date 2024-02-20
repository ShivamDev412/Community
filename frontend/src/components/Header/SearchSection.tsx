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
    <div className="border rounded-lg flex items-center">
      <div>
      <SearchIcon className="fill-slate-400" />
        <input
          type="text"
          className="rounded-l-lg p-2 border  focus:outline-none focus:border-black"
          placeholder="Search events"
        />
      </div>

      <input
        type="text"
        className=" p-2 border border-slate-300 focus:outline-none focus:border-black "
        value={place}
        onChange={(e) => setPlace(e.target.value)}
      />
      <button className="bg-primary p-2 flex justify-center rounded-r-lg border border-primary">
        <SearchIcon className="fill-white" />
      </button>
    </div>
  );
};

export default SearchSection;
