import React from "react";

interface Props {
  children: React.ReactNode;
}
const MainWrapper = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default MainWrapper;
