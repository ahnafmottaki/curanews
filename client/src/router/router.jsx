import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Homepage from "../Pages/Homepage/Homepage";
import Loader from "../components/Loader";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AddArticle from "../Pages/AddArticle/AddArticle";
import PrivateRoute from "../routes/PrivateRoute";
import HydrateFallback from "../components/HydrateFallback";
import DashboardLayout from "../layout/DashboardLayout";
import AdminRoute from "../routes/AdminRoute";
import DashboardHomepage from "../Pages/DashboardHomepage/DashboardHomepage";
import DashboardArticles from "../Pages/DashboardArticles/DashboardArticles";
import DashboardPublisher from "../Pages/DashboardPublisher/DashboardPublisher";
import DashboardUsers from "../Pages/DashboardUsers/DashboardUsers";
import AllArticles from "../Pages/AllArticles/AllArticles";
import ArticleDetails from "../Pages/ArticleDetails/ArticleDetails";
import PremiumArticles from "../Pages/PremiumArticles/PremiumArticles";
import MyArticles from "../Pages/MyArticles/MyArticles";
import MyProfile from "../Pages/MyProfile/Myprofile";
import Subscription from "../Pages/Subscription/Subscription";
import MakePayment from "../Pages/MakePayment/MakePayment";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    hydrateFallbackElement: <HydrateFallback />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Homepage },
      {
        path: "login",
        Component: Login,
      },
      { path: "register", Component: Register },
      { path: "all-articles", Component: AllArticles },
      {
        path: "articleDetail/:articleId",
        element: (
          <PrivateRoute>
            <ArticleDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "add-article",
        element: (
          <PrivateRoute>
            <AddArticle />
          </PrivateRoute>
        ),
      },
      {
        path: "premium-articles",
        element: (
          <PrivateRoute>
            <PremiumArticles />
          </PrivateRoute>
        ),
      },
      {
        path: "my-articles",
        element: (
          <PrivateRoute>
            <MyArticles />
          </PrivateRoute>
        ),
      },
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "subscription",
        element: (
          <PrivateRoute>
            <Subscription />
          </PrivateRoute>
        ),
      },
      {
        path: "make-payment/:subscriptionId",
        element: (
          <PrivateRoute>
            <MakePayment />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: DashboardHomepage },
      { path: "all-articles", Component: DashboardArticles },
      { path: "add-publisher", Component: DashboardPublisher },
      { path: "all-users", Component: DashboardUsers },
    ],
  },
  { path: "*", Component: PageNotFound },
]);

export default router;
