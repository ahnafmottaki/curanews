import { useQuery } from "@tanstack/react-query";
import Breadcrumb from "../../components/Breadcrumb";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";
import UserRow from "../../components/DashboardUsers/UserRow";
import { useState } from "react";
import useTitle from "../../hooks/useTitle";

const DashboardUsers = () => {
  useTitle("Dashboard | Users");
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/admin/users?page=${page}&limit=${limit}`
      );
      return response.data; // should return { users: [], total: 42 }
    },
    keepPreviousData: true,
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>{error.message}</p>;

  const totalPages = Math.ceil(data.total / limit);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumb />

      <div className="overflow-auto w-full">
        <table className="table">
          <thead>
            <tr>
              <th>User Info</th>
              <th>Status</th>
              <th>End of Premium</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.users.map((user) => (
              <UserRow
                {...user}
                key={user._id}
                axiosSecure={axiosSecure}
                refetch={refetch} // optional if you handle updates in-place
              />
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
    </section>
  );
};

export default DashboardUsers;

// import { useQuery } from "@tanstack/react-query";
// import Breadcrumb from "../../components/Breadcrumb";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import Loader from "../../components/Loader";
// import { GrUserAdmin } from "react-icons/gr";
// import ActionButton from "../../components/DashboardArticles/ActionButton";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import UserRow from "../../components/DashboardUsers/UserRow";

// const DashboardUsers = () => {
//   const axiosSecure = useAxiosSecure();
//   const {
//     data: users,
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const usersResponse = await axiosSecure.get("/admin/users");
//       return usersResponse.data;
//     },
//   });

//   if (isLoading) {
//     return <Loader />;
//   }

//   if (isError) {
//     return <p>{error.message}</p>;
//   }

//   return (
//     <section className=" w-full  px-4 sm:px-6 lg:px-8 py-6 ">
//       <Breadcrumb />
//       {/* cha */}
//       <div className="overflow-auto  w-full">
//         <table className="table  ">
//           <thead>
//             <tr>
//               <th>User Info</th>
//               <th>Status</th>
//               <th>End of Premium</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => {
//               return (
//                 <UserRow
//                   {...user}
//                   key={user._id}
//                   axiosSecure={axiosSecure}
//                   refetch={refetch}
//                 />
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// };

// export default DashboardUsers;
