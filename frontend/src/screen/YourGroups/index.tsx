import BackToHome from "@/components/BackToHome";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";
import { RouteEndpoints } from "@/utils/Endpoints";

const YourGroups = () => {
  const navigation = useNavigate();
  return (
    <section className="w-8/12 mx-auto overflow-x-hidden">
      <section className="flex items-center justify-between mt-10">
        <div className="flex items-center gap-4">
          <BackToHome />
          <h1 className="text-[2.5rem] font-bold ">Your Groups</h1>
        </div>
        <div className="w-2/12">
          <Button onClick={() => navigation(RouteEndpoints.CREATE_GROUP)}>
            Start a group
          </Button>
        </div>
      </section>
      <section className="w-10/12 mx-auto mt-5">
        <h2 className="text-2xl font-semibold">Members</h2>
      </section>
      <section className="w-10/12 mx-auto mt-5">
        <h2 className="text-2xl font-semibold">Your Groups</h2>
      </section>
    </section>
  );
};

export default YourGroups;
