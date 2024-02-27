import { ButtonProps } from "@mui/base";
import { ButtonHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

export interface LoginType {
  email: string;
  password: string;
}
export interface SignupType extends LoginType {
  firstName: string;
  lastName: string;
}
export interface LocationDropdownProps {
  placePredictions: {
    place_id: string;
    description: string;
  }[];
  isPlacePredictionsLoading: boolean;
  handleLocationSelect: (placeId: string) => void;
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
    ButtonHTMLAttributes<HTMLButtonElement> {}
export type NewGroupType = {
  name: string;
  description: string;
  location: string;
  groupType: string;
  image: File | string | null;
};
export type InputProps = {
  register: UseFormRegister<any>;
  errors: any;
  id: string;
};
export interface SelectFieldProps extends InputProps {
  options: { value: string; label: string }[];
  label: string;
  defaultValue: string;
}
