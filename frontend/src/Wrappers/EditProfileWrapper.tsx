import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FC } from "react";
import { Settings } from "@/utils/Constant";
import { WrapperProps } from "@/Types";


const EditProfileWrapper:FC<WrapperProps> = ({children}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  return (
    <section className="h-full flex w-full">
      <section className="h-full w-[15%] bg-[#f8f8f9] overflow-hidden">
        <div className="p-6 mx-auto">
          <h2 className="xs:hidden sm:block font-bold text-[1.4rem]">
            Settings
          </h2>
        </div>
        <div>
          {Settings.map(({ Logo, id, label }) => (
            <div key={id} className="mx-auto">
              <div className="mb-6 relative pl-6">
                {path === id && (
                  <div className="bg-cyan-600 h-7 w-1 absolute left-0 top-0"></div>
                )}
                <Link to={path} className="flex items-center gap-2">
                  <Logo
                    className={`h-5 w-5 ${
                      path === id ? "fill-cyan-600" : "fill-gray-500"
                    }`}
                  />
                  <p
                    className={`xs:hidden sm:block ${
                      path === id ? "text-cyan-600" : "text-gray-500"
                    }`}
                  >
                    {label}
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      {children}
    </section>
  );
};

export default EditProfileWrapper;
