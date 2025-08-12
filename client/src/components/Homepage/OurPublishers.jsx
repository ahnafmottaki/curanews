import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosPublic from "../../utils/axiosPublic";

const OurPublishers = () => {
  const {
    data: publishers = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/publishers");
      return res.data;
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
    <div className=" w-full container p-4 md:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center font-merriweather text-heading">
        Our Publishers
      </h2>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p className="text-red-600">Failed to load publishers</p>
      ) : (
        <Slider {...sliderSettings} className="px-2">
          {publishers.map((publisher) => (
            <div key={publisher._id} className="px-2">
              <div className="h-full flex flex-col justify-between bg-gray-100 rounded-md overflow-hidden shadow-md min-h-[360px]">
                <img
                  src={publisher.img}
                  alt={publisher.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4 flex flex-col justify-center items-center flex-1">
                  <h3 className="text-lg font-semibold text-heading text-center line-clamp-2">
                    {publisher.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default OurPublishers;
