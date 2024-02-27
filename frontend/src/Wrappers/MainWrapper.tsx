import { WrapperProps } from "@/Types";
import Header from "@/components/Header";
import { FC } from "react";

const MainWrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <div className="flex flex-col justify-between h-screen overflow-x-hidden">
      <Header />
      <main className="font-display flex-1 overflow-y-auto">
        <section className="w-8/12 mx-auto overflow-x-hidden">{children}</section>
      </main>
    </div>
  );
};

export default MainWrapper;
