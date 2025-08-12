import { toast } from "react-toastify";
import showUpdateToast from "./reactToastify";

const handleStatusAndDelete = async ({
  setSubmitting,
  loadingMessage,
  axiosSecure,
  method,
  url,
  params,
  successMessage,
  queryClient,
  queryKey,
  errorMessage,
}) => {
  setSubmitting(true);
  const toastId = toast.loading(loadingMessage);
  try {
    let settings = [url, null, { params }];
    if (method === "delete" || method === "get") {
      settings = [url, { params }];
    }
    await axiosSecure[method](...settings);

    showUpdateToast(toastId, "success", successMessage);
    queryClient.invalidateQueries(queryKey);
  } catch (err) {
    showUpdateToast(toastId, "error", errorMessage);
  } finally {
    setSubmitting(false);
  }
};

export default handleStatusAndDelete;
