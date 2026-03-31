import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import AuthRequired from "./components/AuthRequired";
import ProfileCompanies from "./components/profile/ProfileCompanies";
import ProfileEvents from "./components/profile/ProfileEvents";
import ProfileNotifications from "./components/profile/ProfileNotifications";
import ProfileSettings from "./components/profile/ProfileSettings";
import ProfileSubscriptions from "./components/profile/ProfileSubscriptions";
import ProfileTickets from "./components/profile/ProfileTickets";
import { EventCreatePage } from "./pages//event/EventCreatePage";
import { AdminPage } from "./pages/AdminPage";
import { AuthPage } from "./pages/auth/AuthPage";
import { CompanyCreatePage } from "./pages/company/CompanyCreatePage";
import { CompanyProfilePage } from "./pages/company/CompanyProfilePage";
import { CompanyTicketManagerPage } from "./pages/company/CompanyTicketManagerPage";
import { EventCheckoutPage } from "./pages/event/EventCheckoutPage";
import { EventDetailPage } from "./pages/event/EventDetailPage";
import { HomePage } from "./pages/HomePage";
import { UserProfilePage } from "./pages/user/UserProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "auth",
        element: <AuthPage />,
      },
      {
        path: "admin",
        element: <AdminPage />,
      },
      {
        path: "company",
        element: <CompanyProfilePage />,
      },
      {
        path: "companies",
        children: [
          {
            path: "new",
            element: <CompanyCreatePage />,
          },
          {
            path: "manage/tickets",
            element: <CompanyTicketManagerPage />,
          },
        ],
      },
      {
        path: "profile/:id",
        element: (
          <AuthRequired>
            <UserProfilePage />
          </AuthRequired>
        ),
        children: [
          {
            index: true,
            element: <Navigate to={"settings"} />,
          },
          {
            path: "settings",
            element: <ProfileSettings />,
          },
          {
            path: "tickets",
            element: <ProfileTickets />,
          },
          {
            path: "subscriptions",
            element: <ProfileSubscriptions />,
          },
          {
            path: "notifications",
            element: <ProfileNotifications />,
          },
          {
            path: "events",
            element: <ProfileEvents />,
          },
          {
            path: "companies",
            element: <ProfileCompanies />,
          },
        ],
      },
      {
        path: "events",
        children: [
          {
            path: "new",
            element: <EventCreatePage />,
          },
          {
            path: ":eventId",
            element: <EventDetailPage />,
          },
          {
            path: ":eventId/checkout",
            element: <EventCheckoutPage />,
          },
        ],
      },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
