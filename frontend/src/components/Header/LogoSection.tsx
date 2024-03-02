import { RouteEndpoints } from "@/utils/Endpoints";
import Logo from "../../assets/brand_logo.svg";
import { Link } from "react-router-dom";
const LogoSection = () => {
    return (
      <div className="h-[2.5rem] w-auto">
        <Link to={RouteEndpoints.HOME}>
          {" "}
          <img src={Logo} alt="community_brand_logo" className="h-full w-full" />
        </Link>
      </div>
    );
  };
  export default LogoSection;