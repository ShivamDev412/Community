import { IoMdHome } from "react-icons/io";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useState } from "react";
import { RouteEndpoints } from "@/utils/Endpoints";
import { useNavigate } from "react-router-dom";

const BackToHome = () => {
  const [hovered, setHovered] = useState(false);
  const navigation = useNavigate()
  return (
    <div
      className="flex items-center gap-2"
      onClick={() => navigation(RouteEndpoints.HOME)}
    >
      <IoMdHome
        className={`h-7 w-7 transition-all hidden sm:block ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      />{" "}
      <KeyboardBackspaceIcon
        className="h-7 w-7 translate-x-0 hover:-translate-x-3 transition-all hover:cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
    </div>
  );
};

export default BackToHome;
