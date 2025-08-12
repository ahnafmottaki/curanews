import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../contexts/Auth/AuthContext";
import { toast } from "react-toastify";
import showUpdateToast from "../../utils/reactToastify";
import { useLocation, useNavigate } from "react-router";
import axiosPublic from "../../utils/axiosPublic";

const SocialLogin = ({ setSubmitting, submitting }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signInViaGoogle } = useAuth();
  const handleGoogleLogin = () => {
    setSubmitting(true);
    const toastId = toast.loading("Signin In...");
    let userTemp;
    signInViaGoogle()
      .then((credentials) => {
        userTemp = credentials;
        return axiosPublic.post("/user", null, {
          headers: {
            Authorization: `Bearer ${credentials.user.accessToken}`,
          },
        });
      })
      .then(() => {
        showUpdateToast(toastId, "success", "Sign In Successful!");
        return axiosPublic.get("/user/isPremiumOver", {
          params: {
            uid: userTemp.user.uid,
          },
          headers: {
            Authorization: `Bearer ${userTemp.user.accessToken}`,
          },
        });
      })
      .then((res) => {
        if (res.data.isSubscriptionOver) {
          toast.info("Subscription over.");
        }
        navigate(location.state?.from || "/");
      })
      .catch(() => {
        showUpdateToast(toastId, "error", "Sign In Failed!");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="pt-2">
      <button
        onClick={handleGoogleLogin}
        disabled={submitting}
        className={`w-full flex items-center justify-center gap-2 border border-border bg-muted py-2 rounded-md hover:bg-gray-200 transition ${
          submitting ? "opacity-30" : ""
        }`}
      >
        <FcGoogle className="text-xl" />
        <span className="text-body font-medium">Continue with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
