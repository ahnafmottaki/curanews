import { useNavigate } from "react-router";
import useTitle from "../../hooks/useTitle";

const NotFound = () => {
  useTitle("CuraNews | Not Found");
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
      <div className="max-w-xl text-center">
        <h1 className="text-6xl md:text-8xl font-extrabold text-primary mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">
          Oops! Page not found
        </h2>
        <p className="text-gray-600 text-base md:text-lg mb-8">
          The page you are looking for might have been removed, renamed, or
          temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition"
          >
            ← Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto px-6 py-3 bg-primary text-white hover:bg-primary/90 rounded-lg font-medium transition"
          >
            🏠 Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
