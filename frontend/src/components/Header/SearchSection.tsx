import SearchIcon from "@mui/icons-material/Search";
import { useHeader } from "./useHeader";
import LocationDropdown from "../LocationDropdown";
import Button from "../Button";
const SearchSection = () => {
  const {
    ref1,
    ref2,
    event,
    place,
    handleSearch,
    handleSetEvent,
    handleLocationInputClick,
    handleLocationChange,
    isLeftInputFocused,
    isRightInputFocused,
    getPlacePredictions,
    placePredictions,
    isPlacePredictionsLoading,
    handleLocationSelect,
    showLocationDropdown,
    handleLocationBlur,
  } = useHeader();

  return (
    <div className="rounded-lg flex items-center w-full">
      <div className="relative w-[45%]">
        <SearchIcon className="fill-slate-400 absolute left-2 top-[0.59rem]" />
        <input
          ref={ref1}
          type="text"
          value={event}
          onChange={handleSetEvent}
          className={`rounded-l-lg p-2 pl-10 border w-full ${
            isRightInputFocused ? "border-r-0" : "border-slate-300"
          } focus:outline-none focus:border-black hover:border-black`}
          placeholder="Search events"
        />
      </div>
      <div className="relative w-[45%]">
        <input
          ref={ref2}
          type="text"
          placeholder="City name"
          className={`p-2 border w-full ${
            isLeftInputFocused ? "border-l-0" : "border-slate-300"
          } focus:outline-none focus:border-black hover:border-black`}
          value={place}
          onFocus={handleLocationInputClick}
          onBlur={handleLocationBlur}
          onChange={(e: any) => {
            getPlacePredictions({ input: e.target.value });
            handleLocationChange(e);
          }}
        />
        {showLocationDropdown && (
          <LocationDropdown
            placePredictions={placePredictions}
            isPlacePredictionsLoading={isPlacePredictionsLoading}
            handleLocationSelect={handleLocationSelect}
          />
        )}
      </div>

      <Button
        className="p-2 flex justify-center rounded-r-lg rounded-l-none"
        onClick={handleSearch}
      >
        <SearchIcon className="fill-white h-6 w-6" />
      </Button>
    </div>
  );
};

export default SearchSection;
