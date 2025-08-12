import { useAuth } from "../contexts/Auth/AuthContext";
import { useNavigate } from "react-router";

const ArticleMini = ({ article, isPremiumTaken }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div
      key={article._id}
      className={`rounded-md shadow ${
        article.isPremium ? "bg-yellow-50 border border-yellow-200" : "bg-white"
      } overflow-hidden flex flex-col`}
    >
      <img
        src={article.imageURL}
        alt={article.title}
        className="h-48 w-full object-cover"
        loading="lazy"
      />
      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs text-primary font-semibold mb-1">
          {article.publisher}
        </div>
        <h3 className="text-lg font-merriweather font-bold text-heading leading-tight line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-body mt-2 line-clamp-2">
          {article.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {article.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Button */}
        <div className="mt-auto pt-4">
          <button
            onClick={() => navigate(`/articleDetail/` + article._id)}
            disabled={article.isPremium && (!user || !isPremiumTaken)}
            className={`text-sm font-medium text-primary  ${
              article.isPremium && (!user || !isPremiumTaken)
                ? " opacity-20 "
                : " hover:underline "
            }`}
          >
            Read More →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleMini;
