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
            element: (
              <AuthRequired>
                <CompanyCreatePage />,
              </AuthRequired>
            ),
          },
          {
            path: "manage/tickets",
            element: <CompanyTicketManagerPage />,
          },
        ],
      },
      {
        path: "profile/:id",
        element: <UserProfilePage />,
        children: [
          {
            index: true,
            element: <Navigate to={"settings"} />,
          },
          {
            path: "settings",
            element: (
              <AuthRequired>
                <ProfileSettings />,
              </AuthRequired>
            ),
          },
          {
            path: "tickets",
            element: (
              <AuthRequired>
                <ProfileTickets />,
              </AuthRequired>
            ),
          },
          {
            path: "subscriptions",
            element: (
              <AuthRequired>
                <ProfileSubscriptions />,
              </AuthRequired>
            ),
          },
          {
            path: "notifications",
            element: (
              <AuthRequired>
                <ProfileNotifications />,
              </AuthRequired>
            ),
          },
          {
            path: "events",
            element: (
              <AuthRequired>
                <ProfileEvents />,
              </AuthRequired>
            ),
          },
          {
            path: "companies",
            element: (
              <AuthRequired>
                <ProfileCompanies />,
              </AuthRequired>
            ),
          },
        ],
      },
      {
        path: "events",
        children: [
          {
            path: "new",
            element: (
              <AuthRequired>
                <EventCreatePage />,
              </AuthRequired>
            ),
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
