import EditProfileWrapper from "@/Wrappers/EditProfileWrapper";
import { useInterests } from "./useInterests";
import { InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const Interests = () => {
  const {
    category,
    handleCategory,
    categories,
    interests,
    selectedInterests,
    handleSelectedInterests,
    handleRemoveInterest,
  } = useInterests();
  return (
    <EditProfileWrapper>
      <>
        <section>
          {" "}
          <h1 className="text-[2rem] font-bold">Interests</h1>
          <h3 className="font-bold text-lg mt-5">Your Interests</h3>
        </section>
        <section className="flex gap-3 flex-wrap items-center mt-10">
          {selectedInterests?.map((interest) => (
            <button
              key={interest.id}
              className="border border-cyan-700 p-2 rounded-lg text-white font-semibold flex gap-2 items-center bg-cyan-700"
              onClick={() => handleRemoveInterest(interest)}
            >
              {interest.name} <IoMdClose className="fill-white" />
            </button>
          ))}
        </section>
        <section className="w-1/2 mt-10">
          <FormControl className="w-5/12">
            <InputLabel id="category-select-label">Browse Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              color="primary"
              className="w-full"
              label="Browse Category"
              value={category}
              onChange={handleCategory}
            >
              {categories.map((option) => (
                <MenuItem value={option.name} key={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </section>
        <section className="flex gap-3 flex-wrap items-center mt-10">
          {interests.map((interest) => (
            <button
              key={interest.id}
              className="border border-gray-500 p-2 rounded-lg text-gray-500 font-semibold flex gap-2 items-center"
              onClick={() => handleSelectedInterests(interest)}
            >
              {interest.name} <IoMdAdd className="fill-gray-500" />
            </button>
          ))}
        </section>
      </>
    </EditProfileWrapper>
  );
};

export default Interests;
