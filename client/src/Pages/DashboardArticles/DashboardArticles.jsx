import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";
import Breadcrumb from "../../components/Breadcrumb";
import ArticleRow from "../../components/DashboardArticles/ArticleRow";
import { useState } from "react";
import useTitle from "../../hooks/useTitle";

const DashboardArticles = () => {
  useTitle("Dashboard | Article");
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["all-articles", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/allArticles?page=${page}&limit=${limit}`
      );
      return res.data; // expected to return { articles: [...], total: number }
    },
    keepPreviousData: true,
  });

  if (isLoading) return <Loader />;
  if (isError) return <div>Error fetching Articles, try again later.</div>;

  const { articles, total } = data;
  const totalPages = Math.ceil(total / limit);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumb />

      <div className="overflow-auto w-full">
        <table className="table">
          <thead>
            <tr>
              <th>Author</th>
              <th>Title</th>
              <th>Publisher</th>
              <th>Posted Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <ArticleRow {...article} key={article._id} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Previous
        </button>

        <span className="px-4 py-2 text-sm text-gray-600">
          Page <span className="font-semibold">{page}</span> of{" "}
          <span className="font-semibold">{totalPages}</span>
        </span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next
        </button>
      </div>

      {isFetching && (
        <p className="text-center mt-4 text-sm text-muted">Updating...</p>
      )}
    </section>
  );
};

export default DashboardArticles;
