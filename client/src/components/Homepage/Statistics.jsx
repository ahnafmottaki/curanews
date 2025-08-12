import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import axiosPublic from "../../utils/axiosPublic";

const fetchUserStats = async () => {
  const res = await axiosPublic.get("/users/statistics");
  return res.data;
};

const StatCard = ({ title, count, color }) => (
  <div className="bg-white shadow-md rounded-xl p-6 text-center border">
    <h3 className={`text-xl font-semibold font-merriweather mb-2 ${color}`}>
      {title}
    </h3>
    <p className="text-4xl font-bold">
      <CountUp end={count} duration={2} />
    </p>
  </div>
);

const Statistics = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userStats"],
    queryFn: fetchUserStats,
  });

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500">Failed to load statistics.</div>
    );

  const { totalUsers, premiumUsers, normalUsers } = data;

  return (
    <div className="px-4 py-10 sm:py-20 max-w-5xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-merriweather font-bold text-center mb-8">
        User Statistics
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          count={totalUsers}
          color="text-blue-600"
        />
        <StatCard
          title="Premium Users"
          count={premiumUsers}
          color="text-green-600"
        />
        <StatCard
          title="Normal Users"
          count={normalUsers}
          color="text-gray-700"
        />
      </div>
    </div>
  );
};

export default Statistics;
