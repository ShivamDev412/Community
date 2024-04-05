import { WrapperProps } from "@/Types";
import { FC } from "react";

const AuthWrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <main className="flex justify-between font-display bg-primary">
      <section className=" xs:w-screen lg:w-1/2 justify-center flex flex-col lg:px-12">
        {children}
      </section>

      <section className="w-1/2 justify-center lg:flex flex-col h-screen p-4 text-white xs:hidden">
        <h1 className="text-[2rem] font-bold ">
          The people platform—Where interests become friendships
        </h1>
        <p className="text-xl my-4">
          Whatever your interest, from hiking and reading to networking and
          skill sharing, there are thousands of people who share it on Meetup.
          Events are happening every day—sign up to join the fun.
        </p>
      </section>
    </main>
  );
};

export default AuthWrapper;
