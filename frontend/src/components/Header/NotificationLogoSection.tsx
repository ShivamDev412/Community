import { Endpoints } from "@/utils/Endpoints";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Link } from "react-router-dom";
const NotificationLogoSection = () => {
  return (
    <Link to={Endpoints.NOTIFICATIONS}>
      <NotificationsNoneIcon className="w-[2rem] h-[2rem] hover:fill-primary fill-slate-500 hover:cursor-pointer" />
    </Link>
  );
};

export default NotificationLogoSection;
