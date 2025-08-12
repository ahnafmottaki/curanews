import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../contexts/Auth/AuthContext";
import Loader from "../../components/Loader";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import showUpdateToast from "../../utils/reactToastify.js";
import useTitle from "../../hooks/useTitle.jsx";

const MyProfile = () => {
  useTitle("CuraNews | My Profile");
  const { user, updateUserProfile, setUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [changingName, setChangingName] = useState(false);
  const [currentName, setCurrentName] = useState(user.displayName);
  const [submitting, setSubmitting] = useState(false);
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-profile", user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiosSecure.get("/user", {
        params: { uid: user.uid },
      });
      return res.data;
    },
  });

  const handleSaveProfile = async () => {
    setSubmitting(true);
    const toastId = toast.loading("Updating Profile...");
    updateUserProfile({
      displayName: currentName,
    })
      .then(() => {
        return axiosSecure.put(
          "/user/updateProfile",
          {
            name: currentName,
          },
          {
            params: {
              uid: user.uid,
            },
          }
        );
      })
      .then(() => {
        setUser((prevUser) => ({ ...prevUser, displayName: currentName }));
        showUpdateToast(toastId, "success", "Profile Updated successfully");
      })
      .catch(() => {
        showUpdateToast(toastId, "error", "Failed to update Profile");
      })
      .finally(() => {
        setSubmitting(false);
        setChangingName(false);
      });
  };
  if (isLoading) return <Loader />;
  if (isError) return <p>{error.message}</p>;

  return (
    <div className="min-h-screen py-10 px-4 font-inter">
      <div className="max-w-3xl mx-auto p-6 sm:p-10 rounded-xl shadow-xl border border-gray-200">
        <div className="flex flex-col items-center text-center gap-4">
          {/* Profile Picture */}
          <div className="relative">
            <img
              src={userData.profileImg}
              alt="Profile"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-primary shadow-md"
            />
          </div>

          {/* User Info */}
          <div className="w-full space-y-6 mt-6">
            {/* Name */}
            <div className="flex justify-between items-center border-b pb-3">
              <div className="text-left">
                <p className="text-sm text-body font-semibold">Name</p>
                {changingName ? (
                  <input
                    type="text"
                    name="change-name"
                    id="change-name"
                    className="border-none outline-none text-gray-500"
                    autoFocus
                    placeholder="Type your name"
                    value={currentName}
                    onChange={(e) => setCurrentName(e.target.value)}
                  />
                ) : (
                  <h2 className="text-xl sm:text-2xl font-bold text-heading">
                    {currentName}
                  </h2>
                )}
              </div>
              <button
                className="text-primary"
                onClick={() => setChangingName(true)}
              >
                <FaEdit className="text-xl" />
              </button>
            </div>

            {/* Email */}
            <div className="flex justify-between items-center border-b pb-3">
              <div className="text-left">
                <p className="text-sm text-body font-semibold">Email</p>
                <p className="text-lg text-heading">{userData.email}</p>
              </div>
            </div>

            {/* Role */}
            <div className="flex justify-between items-center border-b pb-3">
              <div className="text-left">
                <p className="text-sm text-body font-semibold">Role</p>
                <p className="text-lg capitalize text-heading">
                  {userData.role}
                </p>
              </div>
            </div>

            {/* Premium */}
            <div className="flex justify-between items-center border-b pb-3">
              <div className="text-left">
                <p className="text-sm text-body font-semibold">Premium</p>
                <p className="text-lg font-semibold text-heading">
                  {userData.premiumTaken ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>

          {/* Save Button (static for design only) */}
          {changingName && (
            <div className="mt-8">
              <button
                disabled={submitting}
                className={`px-6 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-all shadow ${
                  submitting ? "opacity-30" : ""
                }`}
                onClick={handleSaveProfile}
              >
                Save Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
