import Cookies from "js-cookie";

const useAuth = () => {
  const token = Cookies.get("community-auth-token");
  if (token) return { isAuth: true };
  else return { isAuth: false };
};

export default useAuth;
