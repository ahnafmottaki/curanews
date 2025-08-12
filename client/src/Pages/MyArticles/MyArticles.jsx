import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../contexts/Auth/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import handleStatusAndDelete from "../../utils/handleStatusAndDelete";
import { useLocation, useNavigate } from "react-router";
import DeclineReasonModal from "../../components/MyArticles/DeclineReasonModal";
import useTitle from "../../hooks/useTitle";

const MyArticles = () => {
  useTitle("CuraNews | My Articles");
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [reason, setReason] = useState(null);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    data: myArticles,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-articles", user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiosSecure.get(`/articles/user?uid=${user.uid}`);
      return res.data;
    },
  });

  const handleDetails = (id) => {
    navigate("/articleDetail/" + id);
  };

  const handleOpenModal = ({ reason, articleTitle }) => {
    setReason({ reason, articleTitle });
  };

  const handleUpdate = (id) => {
    navigate(`/add-article?articleId=${id}`);
  };

  const handleDelete = async (id) => {
    handleStatusAndDelete({
      setSubmitting,
      loadingMessage: "Deleting Article...",
      axiosSecure,
      method: "delete",
      url: "/article",
      params: {
        id,
        uid: user.uid,
      },
      successMessage: "Article Deleted",
      queryClient,
      queryKey: "my-articles",
      errorMessage: "Failed to delete Article",
    });
  };

  if (isLoading) return <Loader />;
  if (isError) return <p>{error.message}</p>;

  return (
    <>
      {reason && (
        <DeclineReasonModal
          articleTitle={reason.articleTitle}
          reason={reason.reason}
          onClose={() => setReason(null)}
        />
      )}
      <section className="container px-4 py-6">
        <h2 className="text-2xl font-bold font-merriweather mb-4 text-heading">
          My Articles ({myArticles.length})
        </h2>

        <div className="overflow-x-auto bg-white shadow min-h-screen rounded-lg">
          <table className="min-w-[800px] w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-gray-100 text-sm text-gray-600">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Details</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Premium</th>
                <th className="py-3 px-4">Update</th>
                <th className="py-3 px-4">Delete</th>
              </tr>
            </thead>
            <tbody>
              {myArticles.map((article, index) => (
                <tr
                  key={article._id}
                  className="bg-white hover:bg-gray-50 text-sm"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-semibold">{article.title}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDetails(article._id)}
                      className="text-primary hover:underline"
                    >
                      Details
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    {article.status === "approved" && (
                      <span className="text-green-600 font-medium">
                        Approved
                      </span>
                    )}
                    {article.status === "pending" && (
                      <span className="text-yellow-600 font-medium">
                        Pending
                      </span>
                    )}
                    {article.status === "declined" && (
                      <div className="flex items-center gap-2">
                        <span className="text-red-600 font-medium">
                          Declined
                        </span>
                        <button
                          onClick={() =>
                            handleOpenModal({
                              reason: article.declinedReason,
                              articleTitle: article.title,
                            })
                          }
                          className="text-sm px-2 py-1 bg-red-100 text-red-700 rounded"
                        >
                          Reason
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {article.isPremium ? "Yes" : "No"}
                  </td>
                  <td className="py-3 px-4">
                    {article.status === "declined" ? (
                      <span className="text-red-600 font-medium">Declined</span>
                    ) : (
                      <button
                        disabled={submitting}
                        onClick={() => {
                          handleUpdate(article._id);
                        }}
                        className={`text-blue-600 hover:underline ${
                          submitting ? "opacity-30" : ""
                        }`}
                      >
                        Update
                      </button>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      disabled={submitting}
                      onClick={() => handleDelete(article._id)}
                      className={`text-red-600 hover:underline ${
                        submitting ? "opacity-30" : ""
                      }`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {myArticles.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    You haven't posted any articles yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default MyArticles;
