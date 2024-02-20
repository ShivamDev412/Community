import Header from "@/components/Header";
import React from "react";

interface Props {
  children: React.ReactNode;
}
const MainWrapper = ({ children }: Props) => {
  return <div>
    <Header />
    {children}</div>;
};

export default MainWrapper;
