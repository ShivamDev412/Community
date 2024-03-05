import YourNextEvents from "@/components/Home/YourNextEvents";
import { useHome } from "./useHome";
import YourSavedEvents from "@/components/Home/YourSavedEvents";
import YourGroups from "@/components/Home/YourGroups";
import YourInterests from "@/components/Home/YourIntrests";

function Home() {
  const { name } = useHome();
  return (
    <section className="w-8/12 mx-auto overflow-x-hidden">
      <h1 className="text-[3rem] font-bold mt-10">
        Welcome, {name?.split(" ")[0]} 👋
      </h1>
      <section className="flex justify-between gap-4">
        <section className="w-8/12">
          <h1>Events</h1>
        </section>
        <section className="w-4/12 bg-stone-100 p-6 rounded-lg gap-4 flex flex-col">
          <YourNextEvents />
          {/* Conditional Render */}
          <YourSavedEvents />
          <YourGroups />
          <YourInterests />
        </section>
      </section>
    </section>
  );
}

export default Home;
