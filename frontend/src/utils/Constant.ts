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
  { value: "About", link: "/" },
  { value: "Events", link: "/events" },
  { value: "Members", link: "/members" },
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
    user_id: "",
  },
  group: {
    name: "",
    image: "",
    location: "",
    group_type: "",
  },
};
export const HomeEvents = [
  { value: "", label: "Any Type", active: true },
  { value: "online", label: "Online", active: false },
  { value: "in-person", label: "In-Person", active: false },
];
export const Distances = [
  { value: "", label: "Any Distance", active: true },
  { value: "2", label: "2 miles", active: false },
  { value: "5", label: "5 miles", active: false },
  { value: "10", label: "10 miles", active: false },
  { value: "25", label: "25 miles", active: false },
  { value: "50", label: "50 miles", active: false },
  { value: "100", label: "100 miles", active: false },
];
export const SearchDay = [
  { value: "", label: "Any Day", active: true },
  { value: "today", label: "Today", active: false },
  { value: "tomorrow", label: "Tomorrow", active: false },
  { value: "this-week", label: "This Week", active: false },
  { value: "this-weekend", label: "This Weekend", active: false },
  { value: "next-week", label: "Next Week", active: false },
];
export const SearchCategory = [
  { value: "", label: "Any Category", active: true },
  { value: "art-and-culture", label: "Art & Culture", active: false },
  { value: "career-and-business", label: "Career & Business", active: false },
  {
    value: "community-and-environment",
    label: "Community & Environment",
    active: false,
  },
  {
    value: "dancing",
    label: "Dancing",
    active: false,
  },
  { value: "games", label: "Games", active: false },
];
