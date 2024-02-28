import BackToHome from "@/components/BackToHome";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";
import { Endpoints } from "@/utils/Endpoints";

const YourGroups = () => {
  const navigation = useNavigate();
  return (
    <>
      <section className="flex items-center justify-between mt-10">
        <div className="flex items-center gap-4">
          <BackToHome />
          <h1 className="text-[2rem] font-bold ">Your Groups</h1>
        </div>
        <div className="w-2/12">
          <Button onClick={() => navigation(Endpoints.NEW_GROUP)}>
            Start a group
          </Button>
        </div>
      </section>
      <section></section>
    </>
  );
};

export default YourGroups;
