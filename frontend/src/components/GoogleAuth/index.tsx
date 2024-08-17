import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
const GoogleAuth = ({ setGoogleData }: { setGoogleData: Function }) => {
  const responseMessage = (response: any) => {
    const {
      email,
      family_name,
      given_name,
      picture,
    }: {
      email: string;
      family_name: string;
      given_name: string;
      picture: string;
    } = jwtDecode(response.credential);
    setGoogleData("email", email);
    setGoogleData("firstName", given_name);
    setGoogleData("lastName", family_name);
    setGoogleData("image", picture);
  };
  const errorMessage: any = (error: any) => {
    throw new Error(error);
  };
  return (
    <GoogleLogin
      onSuccess={responseMessage}
      onError={errorMessage}
      size="large"
      width="500px"
    />
  );
};

export default GoogleAuth;
