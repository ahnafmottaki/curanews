import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router";
import { useAuth } from "../../contexts/Auth/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";
import { FaEye } from "react-icons/fa";
import { LuBadgeCheck } from "react-icons/lu";
import useTitle from "../../hooks/useTitle";

const ArticleDetails = () => {
  useTitle("CuraNews | Article Detail");
  const { articleId } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: isPremiumTaken = false,
    isLoading: isPremiumLoading,
    isError: isPremiumError,
  } = useQuery({
    queryKey: ["isPremiumTaken", user?.uid],
    enabled: !!user && !!user.uid,
    queryFn: async () => {
      const res = await axiosSecure.get("/user/premiumTaken");
      return res.data.isPremiumTaken;
    },
  });

  const {
    data: article,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["article-details", articleId],
    enabled: !!articleId && !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/articleDetail/${articleId}`, {
        params: {
          uid: user.uid,
        },
      });
      return res.data;
    },
  });
  if (isLoading || isPremiumLoading) return <Loader />;
  if (isError || isPremiumError) {
    return <p className="text-red-600">{error.message}</p>;
  }

  if (article.isPremium && (!user || !isPremiumTaken)) {
    return (
      <Navigate
        to={"/all-articles"}
        state={{
          message: "Subscription isn't taken",
        }}
      ></Navigate>
    );
  }

  return (
    <section
      className={`container mx-auto px-4 py-10 sm:py-20 ${
        article.isPremium ? "bg-yellow-50" : "bg-white"
      }`}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Article Header */}
        <div>
          <div className="mb-2 flex flex-wrap gap-3 items-center">
            <span className="text-xs text-white bg-primary px-2 py-1 rounded">
              {article.publisher}
            </span>
            {article.isPremium && (
              <span className="flex items-center gap-1 text-yellow-700 font-semibold bg-yellow-100 border border-yellow-300 px-2 py-1 text-xs rounded">
                <LuBadgeCheck /> Premium Article
              </span>
            )}
          </div>
          <h1 className=" text-2xl sm:text-3xl font-merriweather font-bold text-heading leading-tight">
            {article.title}
          </h1>
          <div className="text-sm text-body mt-1 flex items-center gap-1 sm:gap-3">
            <img
              src={article.authorImg}
              alt={article.authorName}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span>{article.authorName}</span>
            <span className="text-gray-400">|</span>
            <span>
              {new Date(article.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="text-gray-400">|</span>
            <span className="flex items-center gap-1">
              <FaEye size={14} /> {article.viewCount} views
            </span>
          </div>
        </div>

        {/* Article Image */}
        <div>
          <img
            src={article.imageURL}
            alt={article.title}
            className="w-full rounded-md object-cover max-h-[450px]"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Article Body */}
        <article className="prose max-w-none text-body">
          <p>{article.description}</p>
          {/* If you want to simulate a longer body, you can add more paragraphs or markdown */}
        </article>

        {/* Declined Reason (if any) */}
        {article.status === "declined" && article.declinedReason && (
          <div className="bg-red-50 border border-red-200 p-4 rounded">
            <h4 className="text-red-700 font-semibold">Declined Reason</h4>
            <p className="text-sm text-red-600 mt-1">
              {article.declinedReason}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticleDetails;
