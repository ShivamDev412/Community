export interface LoginType {
  email: string;
  password: string;
}
export interface SignupType extends LoginType {
  name: string;
}
export interface LocationDropdownProps {
  placePredictions: {
    place_id: string;
    description: string;
  }[];
  isPlacePredictionsLoading: boolean;
  handleLocationSelect: (placeId: string) => void;
}
export interface MenuDataProps {
  menu: string;
  link: string;
}
