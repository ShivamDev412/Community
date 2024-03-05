import { ProfileStatsProps } from "@/Types";
import { FC } from "react";
const ProfileStats: FC<ProfileStatsProps> = ({ value, title }) => {
  return (
    <div className="flex justify-center flex-col items-center">
      <h2 className="text-[1.8rem] font-bold">{value}</h2>
      <p className="text-[0.9rem]">{title}</p>
    </div>
  );
};

export default ProfileStats;
