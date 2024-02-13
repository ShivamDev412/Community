import Cookies from "js-cookie";
const useAuth = () => {
  const token = Cookies.get("access-token");
  if (token) return { isAuth: false };
  else return { isAuth: false };
};

export default useAuth;
