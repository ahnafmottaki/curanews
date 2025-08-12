import { useQuery } from "@tanstack/react-query";
import { Chart } from "react-google-charts";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";
import useTitle from "../../hooks/useTitle";

const DashboardHomepage = () => {
  const axiosSecure = useAxiosSecure();
  useTitle("Dashboard | Homepage");
  const { data: publisherStats = [], isLoading: loadingPublisher } = useQuery({
    queryKey: ["publisher-article-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/publisher-article-stats");
      return res.data.data;
    },
  });

  const {
    data: breakdown = {},
    isLoading: loadingBreakdown,
    isError,
    error,
  } = useQuery({
    queryKey: ["premium-status-breakdown"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/premium-status-stats");
      return res.data.data;
    },
  });

  if (loadingPublisher || loadingBreakdown) return <Loader />;
  if (isError) return <p className="text-red-600">{error.message}</p>;

  const publisherChartData = [
    ["Publisher", "Articles"],
    ...publisherStats.map((stat) => [stat._id, stat.count]),
  ];

  const premiumChartData = [
    ["Type", "Count"],
    ...breakdown.premiumStats.map((s) => [s._id ? "Premium" : "Free", s.count]),
  ];

  const statusChartData = [
    ["Status", "Articles"],
    ...breakdown.statusStats.map((s) => [s._id, s.count]),
  ];

  return (
    <div className="p-4 md:p-8 bg-white rounded-lg  w-full space-y-10 overflow-hidden">
      {/* Pie Chart */}
      <div className="w-full ">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center font-merriweather text-heading">
          Publisher Article Statistics
        </h2>
        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={publisherChartData}
          options={{
            pieHole: 0.4,
            legend: { position: "bottom" },
            chartArea: { width: "90%", height: "80%" },
            backgroundColor: "transparent",
            colors: [
              "#6366f1",
              "#f59e0b",
              "#10b981",
              "#ef4444",
              "#3b82f6",
              "#8b5cf6",
            ],
          }}
        />
      </div>

      {/* Bar Chart */}
      <div className="w-full ">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center font-merriweather text-heading">
          Premium vs Free Articles
        </h2>
        <Chart
          chartType="BarChart"
          width="100%"
          height="300px"
          data={premiumChartData}
          options={{
            chartArea: { width: "80%" },
            legend: { position: "none" },
            backgroundColor: "transparent",
            colors: ["#10b981", "#f59e0b"],
          }}
        />
      </div>

      {/* Line Chart */}
      <div className="w-full">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center font-merriweather text-heading">
          Article Status Overview
        </h2>
        <Chart
          chartType="LineChart"
          width="100%"
          height="300px"
          data={statusChartData}
          options={{
            chartArea: { width: "80%" },
            legend: { position: "bottom" },
            backgroundColor: "transparent",
            colors: ["#6366f1"],
          }}
        />
      </div>
    </div>
  );
};

export default DashboardHomepage;
