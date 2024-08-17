import { UserType } from "@/Types";
import { useUserQuery } from "@/redux/slice/api/userSlice";

const MyInterests = () => {
  const { data: user } = useUserQuery("");
  const { interests } = user?.data as UserType;
  return (
    <section className="bg-white p-6 rounded-lg">
      <h2 className="font-semibold text-xl">
        My interests ({interests.length})
      </h2>
      <div className="flex flex-wrap mt-5">
        {interests.map((interest) => (
          <span
            key={interest.id}
            className="text-white bg-cyan-700 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
          >
            {interest.name}
          </span>
        ))}
      </div>
    </section>
  );
};

export default MyInterests;
