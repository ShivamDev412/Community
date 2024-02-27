import YourNextEvents from "@/components/YourNextEvents";
import { useHome } from "./useHome";
import YourSavedEvents from "@/components/YourSavedEvents";
import YourGroups from "@/components/YourGroups";
import YourInterests from "@/components/YourIntrests";

function Home() {
  const { name } = useHome();
  return (
    <>
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
    </>
  );
}

export default Home;
