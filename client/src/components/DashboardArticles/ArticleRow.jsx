import ActionButton from "./ActionButton.jsx";
import CustomModal from "../CustomModal.jsx";
import { useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
import { useRef, useState } from "react";
import DeclinedReasonForm from "./DeclinedReasonForm";
import { FiTrash2, FiCheck, FiXCircle, FiStar } from "react-icons/fi";
import handleStatusAndDelete from "../../utils/handleStatusAndDelete.js";

const ArticleRow = ({
  _id,
  authorName,
  authorEmail,
  authorImg,
  title,
  publisher,
  createdAt,
  status,
  isPremium,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef(null);
  // approving request
  const handleApprove = async (id) => {
    handleStatusAndDelete({
      setSubmitting,
      loadingMessage: "Approving...",
      axiosSecure,
      method: "put",
      url: "/admin/status",
      params: {
        id,
        status: "approved",
      },
      successMessage: "Approved",
      queryClient,
      queryKey: "all-articles",
      errorMessage: "Failed to update",
    });
  };

  const handleMakePremium = async (id) => {
    handleStatusAndDelete({
      setSubmitting,
      loadingMessage: "Making Premium...",
      axiosSecure,
      method: "put",
      url: "/admin/premium",
      params: {
        id,
      },
      successMessage: "Make Premium Successful",
      queryClient,
      queryKey: "all-articles",
      errorMessage: "Failed to Make Premium",
    });
  };

  const handleDeleteArticle = async (id) => {
    handleStatusAndDelete({
      setSubmitting,
      loadingMessage: "Deleting Article..",
      axiosSecure,
      method: "delete",
      url: "/admin/article",
      params: {
        id,
      },
      successMessage: "Article Deleted",
      queryClient,
      queryKey: "all-articles",
      errorMessage: "Failed to Delete Article",
    });
  };
  return (
    <>
      <CustomModal ref={modalRef}>
        <DeclinedReasonForm
          ref={modalRef}
          name={authorName}
          id={_id}
          axiosSecure={axiosSecure}
          submitting={submitting}
          setSubmitting={setSubmitting}
        />
      </CustomModal>
      <tr
        title={isPremium ? "Premium Article" : null}
        className={` transition ${
          isPremium
            ? " bg-yellow-50 border border-yellow-200 hover:bg-yellow-100 "
            : " hover:bg-muted/50"
        }`}
      >
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img src={authorImg} alt={authorName} />
              </div>
            </div>
            <div>
              <div className="font-bold">{authorName}</div>
              <div className="text-sm opacity-50">{authorEmail}</div>
            </div>
          </div>
        </td>
        <td>
          <p className="line-clamp-2 text-ellipsis">{title}</p>
        </td>
        <td className="truncate">{publisher}</td>
        <td>{new Date(createdAt).toLocaleDateString()}</td>
        <td>
          <span
            className={`px-2 py-1 text-xs  font-semibold ${
              status === "approved"
                ? "bg-green-100 text-green-700"
                : status === "declined"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {status}
          </span>
        </td>
        <td>
          <div
            className={`grid w-[304px] auto-rows-fr ${
              status === "pending" ? "grid-cols-3" : "grid-cols-1"
            } gap-2`}
          >
            {status === "pending" && (
              <>
                <ActionButton
                  Icon={FiCheck}
                  disabled={submitting}
                  classes={` ${
                    submitting ? " opacity-30 " : ""
                  } bg-green-100 text-green-700 hover:bg-green-200 `}
                  onClick={() => handleApprove(_id)}
                >
                  Approve
                </ActionButton>
                <ActionButton
                  disabled={submitting}
                  classes={` bg-red-100 text-red-700  hover:bg-red-200 ${
                    submitting ? " opacity-30 " : ""
                  }`}
                  Icon={FiXCircle}
                  onClick={() => modalRef.current.open()}
                >
                  Decline
                </ActionButton>
              </>
            )}

            <ActionButton
              disabled={submitting}
              Icon={FiTrash2}
              classes={`bg-zinc-500 text-white hover:bg-zinc-700 ${
                submitting ? " opacity-30 " : ""
              }`}
              onClick={() => handleDeleteArticle(_id)}
            >
              Delete
            </ActionButton>

            {status !== "declined" && !isPremium && (
              <ActionButton
                disabled={submitting}
                classes={` bg-primary/10 col-span-full text-primary hover:bg-primary/20 ${
                  submitting ? " opacity-30 " : ""
                }`}
                Icon={FiStar}
                onClick={() => handleMakePremium(_id)}
              >
                Make Premium
              </ActionButton>
            )}
          </div>
        </td>
      </tr>
    </>
  );
};

export default ArticleRow;
