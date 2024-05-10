import {
  // EventTab,
  // GroupTab,
  SelectionTab,
  SearchTitle,
  SearchFilter
} from "@/components/Search/";
import { useSearchPage } from "./useSearchPage";

const Search = () => {
  const { events, groups } = useSearchPage();
  console.log(events, groups);
  return (
    <section className="w-11/12 sm:w-10/12 lg:w-9/12 2xl:w-6/12 mx-auto overflow-x-hidden mt-5 min-h-screen">
      <SearchTitle />
      <SelectionTab />
      <SearchFilter/>
    </section> 
  );
};

export default Search;
