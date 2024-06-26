import { IoIosHome } from "react-icons/io";
import { MdOutlineEventNote } from "react-icons/md";
import { MdGroups3 } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";

import { RouteEndpoints } from "./Endpoints";
import { FaUserEdit } from "react-icons/fa";
import { IoDocument } from "react-icons/io5";

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
    path: RouteEndpoints.EDIT_PROFILE,
  },
  {
    id: "personal-info",
    label: "Personal Info",
    Logo: IoDocument,
    path: RouteEndpoints.PROFILE_INFO,
  },
  {
    id: "account-management",
    label: "Account Management",
    Logo: IoIosSettings,
    path: RouteEndpoints.ACCOUNT_MANAGEMENT,
  },
  {
    id: "interests",
    label: "Interests",
    Logo: FaStar,
    path: RouteEndpoints.INTERESTS,
  },
];
export const GenderType = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-Binary" },
  { value: "others", label: "Others" },
];
export const LookingFor = [
  { value: "Practice Hobbies", active: false },
  { value: "Socialize", active: false },
  { value: "Make Friend", active: false },
  { value: "Professionally Network", active: false },
];
export const LifeStages = [
  { value: "Recent Graduate", active: false },
  { value: "Student", active: false },
  { value: "New In Town", active: false },
  { value: "Newly Retired", active: false },
  { value: "New Parent", active: false },
  { value: "Career Change", active: false },
];
export const GroupTabSection = [
  { value: "About", link:"/" },
  { value: "Events", link:"/events" },
  { value: "Members", link:"/members" },
];
export const EventDetailsInitialState = {
  event_id: "",
  name: "",
  details: "",
  event_date: "",
  event_time: "",
  event_end_time: "",
  event_type: "",
  link: null,
  address: null,
  tags: [],
  created_at: "",
  image: "",
  members: [],
  host: {
    name: "",
    image: "",
    user_id: ""
  },
  group: {
    name: "",
    image: "",
    location: "",
    group_type: ""
  }
}