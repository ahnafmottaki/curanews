import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosPublic from "../../utils/axiosPublic";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa6";
const TrendingArticles = () => {
  const {
    data: trendingArticles = [],
    isLoading: trendingLoading,
    isError: trendingError,
  } = useQuery({
    queryKey: ["trending-articles"],
    queryFn: async () => {
      const res = await axiosPublic.get("/articles/trending");
      return res.data.data;
    },
  });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className=" w-full container p-4 mt-10 sm:mt-15 md:p-6">
      <h2 className="text-xl sm:text-2xl text-center font-bold mb-6  font-merriweather text-heading">
        Trending Articles
      </h2>
      {trendingLoading ? (
        <Loader />
      ) : trendingError ? (
        <p className="text-red-600">Failed to load trending articles</p>
      ) : (
        <Slider {...sliderSettings} className="px-2">
          {trendingArticles.map((article) => (
            <div key={article._id} className="px-2">
              <div className="h-full flex flex-col justify-between bg-gray-100 rounded-md overflow-hidden shadow-md min-h-[360px]">
                <img
                  src={article.imageURL}
                  alt={article.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4 flex flex-col justify-between flex-1">
                  <h3 className="text-lg font-semibold text-heading line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="mt-2 text-sm text-body">
                    {article.publisher}
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-gray-500">
                    <span>Views: {article.viewCount}</span>
                    <Link
                      to={`/articleDetail/${article._id}`}
                      className="flex items-center gap-1 hover:text-black"
                    >
                      <span> Show Details</span>
                      <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default TrendingArticles;
