import { IoIosHome } from "react-icons/io";
import { MdOutlineEventNote } from "react-icons/md";
import { MdGroups3 } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";

import { Endpoints } from "./Endpoints";
export const ResponsiveMenu = [
  {
    id: "Home",
    title: "Home",
    Logo: IoIosHome,
    path:Endpoints.HOME,
  },
  {
    id: "Your Events",
    title: "Your Events",
    Logo: MdOutlineEventNote,
    path:Endpoints.YOUR_EVENTS,
  },
  {
    id: "Your Groups",
    title: "Your Groups",
    Logo: MdGroups3,
    path:Endpoints.YOUR_GROUPS,
  },
  {
    id:"Notifications",
    title:"Notifications",
    Logo:IoIosNotifications,
    path:Endpoints.NOTIFICATIONS,
  },
   {
    id:"Settings",
    title:"Settings",
    Logo:IoIosSettings,
    path:Endpoints.SETTINGS,
   }
];
export const GroupType = [
  { value: "Public", label: "Public" },
  { value: "Private", label: "Private" },
]
