import YourNextEvents from "@/components/Home/YourNextEvents";
import { useHome } from "./useHome";
import YourGroups from "@/components/Home/YourGroups";
import YourInterests from "@/components/Home/YourIntrests";
import HomeFilter from "@/components/Home/HomeFilter";
import HomeEvents from "@/components/Home/HomeEvents";
function Home() {
  const { name } = useHome();
  return (
    <section className="w-11/12 sm:w-10/12 2xl:w-7/12 mx-auto">
      <h1 className="my-5 text-2xl sm:text-[3rem] font-bold sm:my-[0.7in]">
        Welcome, {name?.split(" ")[0]} 👋
      </h1>
      <section className="xs:flex xs:flex-col sm:flex-row justify-between gap-[3rem] items-start">
        <div className="w-full sm:w-4/12 bg-stone-100 p-6 rounded-lg gap-4 flex flex-col">
          <YourNextEvents />
          <YourGroups />
          <YourInterests />
        </div>
        <div className="w-full sm:w-8/12 flex-1">
          <HomeFilter />
          <HomeEvents />
        </div>
      </section>
    </section>
  );
}

export default Home;
