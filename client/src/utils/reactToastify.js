import { Bounce, toast } from "react-toastify";
import { IoCloseCircle } from "react-icons/io5";

function showUpdateToast(toastId, type, message) {
  toast.update(toastId, {
    render: message,
    type,
    isLoading: false,
    autoClose: 1000,
    hideProgressBar: true,
  });
}

function showStaticToast(toastId, type, message) {
  toast.update(toastId, {
    render: message,
    type,
    isLoading: false,
    autoClose: false,
    closeOnClick: true,
    // closeButton: IoCloseCircle,

    hideProgressBar: true,
  });
}

export default showUpdateToast;
export { showStaticToast };
