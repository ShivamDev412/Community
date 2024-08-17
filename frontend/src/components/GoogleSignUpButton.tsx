import { FaGoogle } from "react-icons/fa";

const GoogleSignUpButton = () => {
  const handleGoogleSignIn = async () => {
    window.location.href = "http://localhost:4000/api/auth/login/google";
  };

  return (
    <button
      className="bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded shadow flex justify-center items-center"
      onClick={handleGoogleSignIn}
    >
      <span className="mr-2">
        <FaGoogle />
      </span>
      Sign in with Google
    </button>
  );
};

export default GoogleSignUpButton;
