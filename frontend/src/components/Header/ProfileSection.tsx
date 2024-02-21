import { FC } from "react";
import { Link } from "react-router-dom";
import { Avatar, MenuItem } from "@mui/material";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton } from "@mui/base/MenuButton";
import { MenuDataProps } from "@/Types";
import { Endpoints } from "@/utils/Endpoints";

const MenuData: FC<MenuDataProps> = ({ menu, link }) => {
  return (
    <MenuItem className="px-6 hover:bg-white hover:text-primary text-gray-600">
      <Link to={link}>{menu}</Link>
    </MenuItem>
  );
};
const ProfileSection = () => {
  return (
    <div>
      <Dropdown className="relative">
        <MenuButton>
          <Avatar className="bg-primary">SN</Avatar>
        </MenuButton>
        <Menu className="bg-white absolute top-1 right-0 rounded-lg border w-[2in] shadow-md py-3">
          <MenuData menu="Your Groups" link={Endpoints.HOME} />
          <MenuData menu="Your Events" link={Endpoints.HOME} />
          <div className="w-full h-[1px] bg-slate-200 my-2"></div>
          <MenuData menu="Profile" link={Endpoints.HOME} />
          <MenuData menu="Settings" link={Endpoints.HOME} />
          <MenuData menu="Log Out" link={Endpoints.HOME} />
        </Menu>
      </Dropdown>
    </div>
  );
};

export default ProfileSection;
