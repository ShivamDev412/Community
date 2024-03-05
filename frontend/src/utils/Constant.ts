import { IoIosHome } from "react-icons/io";
import { MdOutlineEventNote } from "react-icons/md";
import { MdGroups3 } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";

import { RouteEndpoints } from "./Endpoints";
import { FaUserEdit } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { FaStar } from "react-icons/fa6";

export const ResponsiveMenu = [
  {
    id: "Home",
    title: "Home",
    Logo: IoIosHome,
    path: RouteEndpoints.HOME,
  },
  {
    id: "Your Events",
    title: "Your Events",
    Logo: MdOutlineEventNote,
    path: RouteEndpoints.YOUR_EVENTS,
  },
  {
    id: "Your Groups",
    title: "Your Groups",
    Logo: MdGroups3,
    path: RouteEndpoints.YOUR_GROUPS,
  },
  {
    id: "Notifications",
    title: "Notifications",
    Logo: IoIosNotifications,
    path: RouteEndpoints.NOTIFICATIONS,
  },
  {
    id: "Settings",
    title: "Settings",
    Logo: IoIosSettings,
    path: RouteEndpoints.SETTINGS,
  },
];
export const GroupType = [
  { value: "Public", label: "Public" },
  { value: "Private", label: "Private" },
];
export const EventType = [
  { value: "online", label: "Online" },
  { value: "in-person", label: "In-Person" },
];
export const Settings = [
  {
    id: "edit-profile",
    label: "Edit Profile",
    Logo: FaUserEdit,
    path: RouteEndpoints.PROFILE,
  },
  {
    id: "personal-info",
    label: "Personal Info",
    Logo: CgNotes,
    path: RouteEndpoints.PROFILE,
  },
  {
    id: "account-management",
    label: "Account Management",
    Logo: IoIosSettings,
    path: RouteEndpoints.PROFILE,
  },
  {
    id: "interests",
    label: "Interests",
    Logo: FaStar,
    path: RouteEndpoints.PROFILE,
  },
];
