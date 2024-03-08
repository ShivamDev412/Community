import { LookingForType } from "@/Types";
import { FC } from "react";
import { GoPlus } from "react-icons/go";
import { IoMdClose } from "react-icons/io";

const LookingFor: FC<LookingForType> = ({
  data,
  setData,
  title,
  subTitle = "",
  cb,
}) => {
  return (
    <div className="mt-5">
      <h3 className="font-semibold">{title}</h3>
      {subTitle !== "" && <p className="text-gray-500">{subTitle}</p>}
      <div className="flex flex-wrap gap-2 mt-2">
        {data.map((value) => (
          <button
            key={value.value}
            type="button"
            className={`p-[0.6rem] pl-4 rounded-[25px] border flex justify-center items-center gap-1 hover:cursor-pointer ${
              value.active
                ? "bg-cyan-700 border-white"
                : "bg-white border-gray-600"
            }`}
            onClick={() => setData(value.value, data, cb)}
          >
            <p
              className={`font-semibold ${
                value.active ? "text-white" : "text-gray-500"
              }`}
            >
              {value.value}
            </p>
            {value.active ? (
              <IoMdClose className="w-6 h-6 fill-white" />
            ) : (
              <GoPlus className="w-6 h-6 fill-gray-500" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LookingFor;
