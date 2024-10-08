import YourNextEvents from "@/components/Home/YourNextEvents";
import YourGroups from "@/components/Home/YourGroups";
import YourInterests from "@/components/Home/YourIntrests";
import HomeFilter from "@/components/Home/HomeFilter";
import HomeEvents from "@/components/Home/HomeEvents";

import { useUserQuery } from "@/redux/slice/api/userSlice";
function Home() {
  const {data:user} = useUserQuery("")
  return (
    <section className="w-11/12 sm:w-10/12 2xl:w-7/12 mx-auto">
      <h1 className="my-5 text-2xl sm:text-[3rem] font-bold sm:my-[0.7in]">
        Welcome, {user?.data?.name?.split(" ")[0]} 👋
      </h1>
      <section className="xs:flex xs:flex-col sm:flex-row justify-between gap-[3rem] items-start">
        <div className="sm:w-4/12">
          <div className="w-full bg-stone-100 p-4 rounded-lg gap-4 flex flex-col mt-5">
            <YourNextEvents />
            <YourGroups />
            <YourInterests />
          </div>
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
