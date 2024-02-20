import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastConfig: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  toastId: Math.random().toString(36).substring(2, 10),
  style: {
    padding: "1rem",
    borderRadius: "0.5rem",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
  },
};

const Toast = (
  message: string,
  type: "success" | "error" | "info" = "info"
) => {
  switch (type) {
    case "success":
      toast.success(message, toastConfig);
      break;
    case "error":
      toast.error(message, toastConfig);
      break;
    case "info":
      toast.info(message, toastConfig);
      break;
    default:
      toast.info(message, toastConfig);
      break;
  }
};

export default Toast;
