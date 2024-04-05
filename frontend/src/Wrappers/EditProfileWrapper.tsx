import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FC } from "react";
import { Settings } from "@/utils/Constant";
import { WrapperProps } from "@/Types";

const EditProfileWrapper: FC<WrapperProps> = ({ children }) => {
  const location = useLocation();
  const routePath = location.pathname.split("/")[1];
  return (
    <section className="h-full flex w-full align-top">
      <aside className="min-h-full w-[15%] sm:w-[50%] md:w-[32%] lg:w-[25%] xl:w-[20%] 2xl:w-[15%] bg-stone-100 overflow-hidden">
        <div className="p-6 mx-auto">
          <h2 className="xs:hidden md:block font-bold text-[1.4rem]">
            Settings
          </h2>
        </div>
        <div className="h-full">
          {Settings.map(({ Logo, id, label, path }) => (
            <div key={id} className="mx-auto">
              <div className="mb-6 relative pl-6">
                {routePath === id && (
                  <div className="bg-cyan-600 h-7 w-1 absolute left-0 top-0"></div>
                )}
                <Link to={path} className="flex items-center gap-2">
                  <Logo
                    className={`h-5 w-5 ${
                      routePath === id ? "fill-cyan-600" : "fill-gray-500"
                    }`}
                  />
                  <p
                    className={`xs:hidden md:block ${
                      routePath === id ? "text-cyan-600" : "text-gray-500"
                    }`}
                  >
                    {label}
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </aside>
      <section className="my-10 xs:ml-5 sm:ml-10 w-full">
        {children}
      </section>
    </section>
  );
};

export default EditProfileWrapper;
