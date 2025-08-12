import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../contexts/Auth/AuthContext";
import Loader from "../../components/Loader";
import ArticleMini from "../../components/ArticleMini";
import useTitle from "../../hooks/useTitle";

const PremiumArticles = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  useTitle("CuraNews | Premium Articles");

  const {
    data: premiumArticles,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["premium-articles"],
    enabled: !!user && !!user.uid,
    queryFn: async () => {
      const res = await axiosSecure.get("/premiumArticles", {
        params: {
          uid: user.uid,
        },
      });
      return res.data;
    },
  });

  const { data: isPremiumTaken = false } = useQuery({
    queryKey: ["isPremiumTaken", user?.uid],
    enabled: !!user && !!user.uid,
    queryFn: async () => {
      const res = await axiosSecure.get("/user/premiumTaken");
      return res.data.isPremiumTaken;
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-800">{error.message}</p>;
  return (
    <section className="container mx-auto px-4 py-6">
      {/* Heading */}
      <h2 className="text-2xl font-merriweather font-bold text-heading ">
        Premium Articles
      </h2>
      <p className="text-sm mb-5">
        Only User with Subscription can see premium articles
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {premiumArticles.map((article) => (
          <ArticleMini
            key={article._id}
            article={article}
            isPremiumTaken={isPremiumTaken}
          />
        ))}
      </div>
    </section>
  );
};

export default PremiumArticles;
