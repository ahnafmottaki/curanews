import { useNavigate } from "react-router";
import useTitle from "../../hooks/useTitle";

const ErrorPage = () => {
  const navigate = useNavigate();
  useTitle("CuraNews | Error");

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
      <div className="max-w-xl text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-red-600 mb-4">
          Something Went Wrong
        </h1>
        <p className="text-gray-700 text-base md:text-lg mb-6">
          We encountered an unexpected error. This might be a server issue, a
          broken link, or something else entirely.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition"
          >
            ← Try Again
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto px-6 py-3 bg-primary text-white hover:bg-primary/90 rounded-lg font-medium transition"
          >
            🏠 Go to Home
          </button>
        </div>

        <p className="text-sm text-gray-400 mt-6">
          If the issue persists, please contact support or try again later.
        </p>
      </div>
    </section>
  );
};

export default ErrorPage;
