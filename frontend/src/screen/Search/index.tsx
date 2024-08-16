import {
  // EventTab,
  // GroupTab,
  SelectionTab,
  SearchTitle,
  GroupTab,
  EventTab,
  // SearchFilter
} from "@/components/Search/";
import { useSearchPage } from "./useSearchPage";

const Search = () => {
  const { data, search } = useSearchPage();
  console.log(data);
  return (
    <section className="w-11/12 sm:w-10/12 lg:w-9/12 2xl:w-6/12 mx-auto overflow-x-hidden mt-5 min-h-screen">
      <SearchTitle />
      <SelectionTab />
      {/* <SearchFilter/> */}

      {search.tab === "groups" && <GroupTab data={(data as any) || []} />}
      {search.tab === "events" && <EventTab data={(data as any) || []} />}
    </section>
  );
};

export default Search;
