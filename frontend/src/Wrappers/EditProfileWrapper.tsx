import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FC } from "react";
import { Settings } from "@/utils/Constant";
import { WrapperProps } from "@/Types";

const EditProfileWrapper: FC<WrapperProps> = ({ children }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  return (
    <section className="h-full flex w-full">
      <section className="h-full w-[15%] sm:w-[50%] lg:w-[35%] xl:w-[22%] 2xl:w-[15%] bg-[#f8f8f9] overflow-hidden">
        <div className="p-6 mx-auto">
          <h2 className="xs:hidden md:block font-bold text-[1.4rem]">
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
                {path !== id ? (
                  <Link to={path} className="flex items-center gap-2">
                    <Logo
                      className={`h-5 w-5 ${
                        path === id ? "fill-cyan-600" : "fill-gray-500"
                      }`}
                    />
                    <p
                      className={`xs:hidden md:block ${
                        path === id ? "text-cyan-600" : "text-gray-500"
                      }`}
                    >
                      {label}
                    </p>
                  </Link>
                ) : (
                  <div className="flex items-center gap-2">
                    <Logo
                      className={`h-5 w-5 ${
                        path === id ? "fill-cyan-600" : "fill-gray-500"
                      }`}
                    />
                    <p
                      className={`xs:hidden md:block ${
                        path === id ? "text-cyan-600" : "text-gray-500"
                      }`}
                    >
                      {label}
                    </p>
                  </div>
                )}
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
