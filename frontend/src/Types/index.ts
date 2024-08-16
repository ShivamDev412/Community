import { ButtonProps } from "@mui/base";
import { ButtonHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

// Auth //
export type LoginType = {
  email: string;
  password: string;
};
export type SignupType = {
  email: string;
  password: string;
  image: File | string | null;
  firstName: string;
  lastName: string;
};
export type AuthResponse = {
  data: {
    "auth-token"?: string;
  };
  success: boolean;
  message: string;
};
export type CategoriesType = {
  id: string;
  name: string;
}
export type CategoriesResponse = {
  data: CategoriesType[];
  success: boolean;
};
export type TagsResponse = {
  data: Interest[];
  success: boolean;
  message: string;
}
// Home //
export type HomeEventsResponse = {
  data: {
    data: EventType[];
  };
  success: boolean;
};
export type RSVPEventsResponse = {
  data: EventType[];
  success: boolean;
};

// User //
export type UserResponse = {
  data: UserType;
  success: boolean;
};
export type UserType = {
  id: string;
  name: string;
  email: string;
  location: string;
  joined_on: string;
  image: string | null;
  compressed_image: string | null;
  bio: string | null;
  dob: string | null;
  sex: string | null;
  looking_for?: string[];
  life_state?: string[];
  interests: Interest[];
};
export type PersonalInfoResponse = {
  data: UserType;
  success: boolean;
  message: string;
}
// Groups //
export type GroupResponse = {
  data: Group[];
  success: boolean;
};
export type NewGroupResponse = {
  data: Group;
  success: boolean;
  message: string;
};
export type UpdateGroupBody = {
  groupId:string;
  body: FormData;
}
export type GroupDetailsResponse = {
  data: GroupDetails;
  success: boolean;
}
export type UpdateEventBody = {
  eventId: string;
  body: FormData;
}
// Common //
export interface LocationDropdownProps {
  placePredictions: {
    place_id: string;
    description: string;
  }[];
  isPlacePredictionsLoading: boolean;
  handleLocationSelect: (
    placeIdd: string,
    placeId: string,
    addressType: string
  ) => void;
  className?: string;
  addressType?: string;
}
export interface MenuDataProps {
  menu: string;
  link: string;
  setShowDropdown: Function;
}
export interface WrapperProps {
  children: React.ReactNode;
}


export type Interest = {
  id: string;
  name: string;
};
export type DefaultResponseType = {
  success: boolean;
  message: string;
}
export type ResetPasswordType  = {
  token: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}
export type SectionTitleProps = {
  title: string;
  url: string;
  more: string;
};
export interface ExtendedButtonProps
  extends ButtonProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}
export type NewGroupType = {
  name: string;
  description: string;
  location: string;
  groupType: string;
  image: File | string | null;
};
export type NewEventType = {
  name: string;
  image: any;
  details: string;
  group: string;
  date: any;
  time: any;
  category: string;
  event_end_time: any;
  type: string;
  tags: string[];
  link?: string;
  address?: string;
};

export type InputProps = {
  register: UseFormRegister<any>;
  errors: any;
  id: string;
  disabled?: boolean;
  getValues: Function;
};
export interface SelectFieldProps extends InputProps {
  options: { value: string; label: string }[];
  label: string;
  defaultValue: string;
}
export interface MultiSelectFieldProps extends InputProps {
  options: { value: string; label: string }[];
  label: string;
  setValue: Function;
  defaultValue: Array<string>;
}
export type Group = {
  id: string;
  name: string;
  group_type?: "public" | "private";
  location?: string;
  organized_by: string;
  about?: string;
  image?: string;
  compressed_image?: string;
  created_at?: string;
  updated_at?: string;
};
export interface DateAndTimePickerProps extends InputProps {
  setValue: any;
  setError: Function;
  label: string;
  getValues: any;
}
export type GroupsSliceType = {
  groupDetails: GroupDetails;
  groupEvents: {
    pageNumber: number;
  };
  pageNumberCreated: number;
  pageNumberInMember: number;
};
export type ProfileStatsProps = {
  title: string;
  value: string;
};
export type EditProfileLinkProps = {
  image: string;
  name: string;
};
export type ProfileImageProps = {
  location: string;
  image: string;
  compressedImage: string;
  name: string;
  email: string;
  joined_on_date: string;
};
export type EditProfileType = {
  image: string;
  firstName: string;
  lastName: string;
  address: string;
  bio: string;
};
export type PersonalInfoType = {
  birthday: any;
  gender: string;
  lookingFor: string[];
  lifeStages: string[];
};
export type LookingForType = {
  data: { value: string; active: boolean }[];
  setData: (
    value: string,
    data: { value: string; active: boolean }[],
    cb: string
  ) => void;
  title: string;
  subTitle: string;
  cb: string;
};
export type AccountManagementType = {
  email: string;
};
export type ChangePasswordType = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
export type GroupsProps = {
  title: string;
  data: Group[];
  noDataText: string;
};
export type GroupCardProps = {
  data: Group;
};
export type GroupDetails = {
  about: string;
  created_at: string;
  id: string;
  group_type: string;
  image: string;
  compressed_image: string;
  location: string;
  latitude: number;
  longitude: number;
  membersCount: number;
  members: UserType[];
  name: string;
  organized_by: {
    name: string;
    image: string;
    id: string;
    compressed_image: string;
  };
  updated_at: string;
};
export type PrimaryInfoSectionProps = {
  host: string;
  name: string | undefined;
  location: string | undefined;
  membersCount: number | undefined;
  groupType: string | undefined;
  organizedBy: string | undefined;
};
export type NewEventResponse = {
  data: EventType;
  success: boolean;
  message: string;
}
export interface EventType {
  id: string;
  name: string;
  image: string;
  category_id: string;
  compressed_image: string;
  details: string;
  event_date: string;
  event_time: string;
  event_end_time: string;
  event_type: "online" | "in-person";
  link: string;
  address: string | null;
  tags: string[];
  created_at: string;
  host: {
    name: string;
    image: string;
  };
  members: number;
  group: {
    name: string;
    location: string;
  };
  updated_at: string;
}
export type EventsState = {
  eventDetails: EventDetailType;
  hostingPageNumber: number;
  attendingPageNumber: number;
  pastPageNumber: number;
};
export type ProfileAvatarProps = {
  image: string;
  name: string;
};
export type TabPanelComponentProps = {
  value: string;
  data: EventType[];
};
type EventMembers = {
  id: string;
  name: string;
  email: string;
  image: string;
  type: string;
};
export type EventDetailType = {
  id: string;
  name: string;
  details: string;
  event_date: string;
  event_time: string;
  event_end_time: string;
  category_id: string;
  event_type: "online" | "in-person" | "";
  link: string | null;
  address: string | null;
  tags: { id: string; name: string }[];
  created_at: string;
  image: string;
  compressed_image: string;
  members: EventMembers[];
  host: { name: string; image: string; id: string };
  group: {
    name: string;
    image: string;
    location: string;
    group_type: string;
    group_id: string;
  };
};
export type EventDetailsHeaderSectionProps = {
  eventName: string;
  eventType: string;
  eventDate: string;
  hostProfilePic: string;
  hostName: string;
};
export type EventDetailBannerImageProps = {
  image: string;
  compressedImage: string;
  name: string;
};
export type EventGroupDetailsProp = {
  groupImage: string;
  groupName: string;
  groupType: string;
};
export type EventTimeAndLocationProps = {
  eventDate: string;
  eventTime: string;
  eventEndTime: string;
  eventLink: string | null;
  eventAddress: string | null;
};
export type EventAttendeesProps = {
  members: EventMembers[];
};
export type LazyLoadedImageComponentProps = {
  image: string | undefined;
  compressedImage: string | undefined;
  alt: string;
};
export type CustomHomeSelectType = {
  value: string;
  label: string;
  active: boolean;
};
export type SearchType = {
  keyword: string;
  day: CustomHomeSelectType;
  type: CustomHomeSelectType;
  distance: CustomHomeSelectType;
  category: CustomHomeSelectType;
  sortBy: string;
  lat: number;
  lon: number;
  tab: "events" | "groups";
};
export type HomeDataType = {
  location: {
    city: string;
    state: string;
  };
  filters: {
    distance: CustomHomeSelectType;
    type: CustomHomeSelectType;
  };
};

