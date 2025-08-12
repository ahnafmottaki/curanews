import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../../components/Login/SocialLogin";
import { useAuth } from "../../contexts/Auth/AuthContext";
import { toast } from "react-toastify";
import showUpdateToast from "../../utils/reactToastify";
import axiosPublic from "../../utils/axiosPublic";
import useTitle from "../../hooks/useTitle";

const Login = () => {
  useTitle("CuraNews | Login");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { signInUser } = useAuth();

  const onSubmit = (data) => {
    const { email, password } = data;
    const toastId = toast.loading("Signing user...");
    setSubmitting(true);
    signInUser(email, password)
      .then((result) => {
        showUpdateToast(toastId, "success", "Sign in successful!");
        return axiosPublic.get("/user/isPremiumOver", {
          params: {
            uid: result.user.uid,
          },
          headers: {
            Authorization: `Bearer ${result.user.accessToken}`,
          },
        });
      })
      .then((res) => {
        if (res.data.isSubscriptionOver) {
          toast.info("Subscription over.");
        }
        navigate(location.state?.from || "/");
      })
      .catch((err) => {
        if (err.message.includes("invalid-credential")) {
          return showUpdateToast(
            toastId,
            "error",
            "Invalid username or password"
          );
        }
        showUpdateToast(toastId, "error", "Sign in failed!");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-2 min-[475px]:px-4">
      <div className="bg-white shadow-lg rounded-lg p-4 min-[475px]:p-8 w-full max-w-md space-y-6">
        {/* Heading */}
        <h2 className="text-2xl font-bold font-merriweather text-heading text-center">
          Login to CuraNews
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block mb-1 text-body">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
              className="w-full border border-border px-4 py-2 rounded-md bg-muted focus:outline-primary"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field with Eye Icon */}
          <div>
            <label className="block mb-1 text-body">Password</label>
            <div className="relative">
              <input
                defaultValue={"Ah201408n@f"}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                className="w-full border border-border px-4 py-2 rounded-md bg-muted pr-10 focus:outline-primary"
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-body"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            disabled={submitting}
            type="submit"
            className={`primary-btn w-full ${submitting ? " opacity-30 " : ""}`}
          >
            Login
          </button>
        </form>

        {/* Social Login Component */}
        <SocialLogin submitting={submitting} setSubmitting={setSubmitting} />

        {/* Register Link */}
        <p className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
