import { ButtonProps } from "@mui/base";
import { ButtonHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";
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
export interface LocationDropdownProps {
  placePredictions: {
    place_id: string;
    description: string;
  }[];
  isPlacePredictionsLoading: boolean;
  handleLocationSelect: (placeId: string, addressType: string) => void;
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

export type UserType = {
  user_id: string;
  name: string;
  email: string;
  location: {
    city: string;
    state: string;
  };
  age: number | null;
  joined_on: string;
  image: string | null;
  bio: string | null;
  dob: string | null;
  sex: string | null;
};
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
  group_id: string;
  name: string;
  group_type?: "public" | "private"; // optional field with enum for group_type
  location?: string;
  organized_by: string;
  about?: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
};
export interface DateAndTimePickerProps extends InputProps {
  setValue: any;
  setError: Function;
  label: string;
  getValues?: any;
}
export type GroupsSliceType = {
  groupsCreated: Array<Group>;
  groupsInMember: Array<Group>;
  groupDetails: GroupDetails;
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
  group_id: string;
  group_type: string;
  image: string;
  location: string;
  members: UserType[];
  name: string;
  organized_by: {
    name: string;
  };
  updated_at: string;
};
export type PrimaryInfoSectionProps = {
  name: string | undefined;
  location: string | undefined;
  membersCount: number | undefined;
  groupType: string | undefined;
  organizedBy: string | undefined;
};
