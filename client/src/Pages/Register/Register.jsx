import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate, useNavigation } from "react-router";
import SocialLogin from "../../components/Login/SocialLogin";
import { useMutation } from "@tanstack/react-query";
import uploadImageToImgBB from "../../utils/uploadImageToImgBB";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/Auth/AuthContext";
import showUpdateToast from "../../utils/reactToastify";
import axiosPublic from "../../utils/axiosPublic";
import useTitle from "../../hooks/useTitle";

const Register = () => {
  useTitle("CuraNews | Register");
  // package states
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  // component states
  const [showPassword, setShowPassword] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  // context hooks
  const { createUser, updateUserProfile, setUser, firebaseRefresh } = useAuth();
  const { mutateAsync } = useMutation({
    mutationFn: uploadImageToImgBB,
  });

  const onSubmit = async (data) => {
    if (!imageFile) {
      setImageError("Profile picture is required");
      return;
    }
    setImageError("");
    setSubmitting(true);
    const toastId = toast.loading("Registering User....");
    try {
      const [credentials, imageBBUrl] = await Promise.all([
        createUser(data.email, data.password),
        mutateAsync(imageFile),
      ]);

      await updateUserProfile({
        displayName: data.name,
        photoURL: imageBBUrl,
      });

      await firebaseRefresh();

      await axiosPublic.post("/user", null, {
        headers: {
          Authorization: `Bearer ${credentials.user.accessToken}`,
        },
      });

      setUser((preCredentials) => ({
        ...preCredentials,
        displayName: data.name,
        photoURL: imageBBUrl,
      }));

      showUpdateToast(toastId, "success", "Registration successful!");
      navigate(location.state?.from || "/");
    } catch (err) {
      if (err.message.includes("email-already-in-use")) {
        return showUpdateToast(toastId, "error", "User Already Exists");
      }
      showUpdateToast(toastId, "error", "Registration Failed!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-2 min-[475px]:px-4">
      <div className="bg-white shadow-lg rounded-lg p-4 min-[475px]:p-8 w-full max-w-md space-y-6">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-heading text-center font-merriweather">
          Create an Account
        </h2>

        {/* Register Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 font-inter"
        >
          {/* Name */}
          <div>
            <label className="block mb-1 text-body">Full Name</label>
            <input
              type="text"
              placeholder="Your Name"
              {...register("name", { required: "Name is required" })}
              className="w-full border border-border px-4 py-2 rounded-md bg-muted focus:outline-primary"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
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

          {/* Password */}
          <div>
            <label className="block mb-1 text-body">Password</label>
            <div className="relative">
              <input
                defaultValue={"Ah201408n@f"}
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  validate: {
                    hasCapital: (value) =>
                      /[A-Z]/.test(value) || "Must include a capital letter",
                    hasSpecial: (value) =>
                      /[!@#$%^&*()_+\-=[\]{};':\"\\|,.<>/?]+/.test(value) ||
                      "Must include a special character",
                    hasNumber: (value) =>
                      /\d/.test(value) || "Must include a numeric character",
                  },
                })}
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

          {/* Profile Image */}
          <div>
            <label className="block mb-1 text-body">Profile Pic</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setImageFile(file);
                if (file) setImageError("");
              }}
              className="w-full border border-border px-3 py-2 rounded-md bg-muted file:mr-3 file:border-0  file:text-primary"
            />
            {imageError && (
              <p className="text-red-600 text-sm mt-1">{imageError}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            disabled={submitting}
            type="submit"
            className={`primary-btn w-full ${submitting ? " opacity-30 " : ""}`}
          >
            Register
          </button>
        </form>

        {/* Social Login */}
        <SocialLogin submitting={submitting} setSubmitting={setSubmitting} />

        {/* Login Link */}
        <p className="text-sm text-center text-muted-foreground font-inter">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
