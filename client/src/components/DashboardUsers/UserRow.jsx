import { useState } from "react";
import ActionButton from "../DashboardArticles/ActionButton";
import { toast } from "react-toastify";
import showUpdateToast from "../../utils/reactToastify";
import { GrUserAdmin } from "react-icons/gr";

const UserRow = ({
  _id,
  name,
  email,
  profileImg,
  role,
  premiumTaken,
  axiosSecure,
  refetch,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const handleMakeAdmin = async () => {
    setSubmitting(true);
    const toastId = toast.loading("Making " + name + "Admin...");
    try {
      await axiosSecure.put("/admin/makeAdmin", null, {
        params: {
          id: _id,
        },
      });

      showUpdateToast(toastId, "success", name + " is Now Admin");
      refetch();
    } catch (err) {
      showUpdateToast(toastId, "error", "Failed to Make " + name + " Admin");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={profileImg} alt={name} />
            </div>
          </div>
          <div>
            <div className="font-bold">{name}</div>
            <div className="text-sm opacity-50">{email}</div>
          </div>
        </div>
      </td>
      <td>{premiumTaken ? "Premium " : "Normal"}</td>
      <td>
        {premiumTaken ? new Date(premiumTaken).toLocaleString() : "Normal"}
      </td>
      <td>
        {role === "user" ? (
          <ActionButton
            disabled={submitting}
            classes={`truncate bg-primary/10 w-full text-primary hover:bg-primary/20 ${
              submitting ? " opacity-30 " : ""
            }`}
            Icon={GrUserAdmin}
            onClick={handleMakeAdmin}
          >
            Make Admin
          </ActionButton>
        ) : (
          <span className="px-3 py-1 text-sm rounded flex items-center  gap-1 justify-center bg-primary/10  text-primary">
            Admin
          </span>
        )}
      </td>
    </tr>
  );
};

export default UserRow;
