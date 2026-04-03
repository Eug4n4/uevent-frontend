import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { OptionalAuth } from "./components/auth/context/OptionalAuth";
import AuthRequired from "./components/AuthRequired";
import { CheckCompanyOwner } from "./components/CheckCompanyOwner";
import { CompanyContacts } from "./components/company/CompanyContacts";
import { CompanyNews } from "./components/company/CompanyNews";
import { CompanySettings } from "./components/company/CompanySettings";
import { OptionalCompanyOwner } from "./components/company/context/OptionalCompanyOwner";
import ProfileCompanies from "./components/profile/ProfileCompanies";
import ProfileEvents from "./components/profile/ProfileEvents";
import ProfileNotifications from "./components/profile/ProfileNotifications";
import ProfileSettings from "./components/profile/ProfileSettings";
import ProfileSubscriptions from "./components/profile/ProfileSubscriptions";
import ProfileTickets from "./components/profile/ProfileTickets";
import { CompanyService } from "./lib/services/CompanyService";
import { EventService } from "./lib/services/EventService";
import { EventCreatePage } from "./pages//event/EventCreatePage";
import { AdminPage } from "./pages/AdminPage";
import { AuthPage } from "./pages/auth/AuthPage";
import { CompanyCreatePage } from "./pages/company/CompanyCreatePage";
import { CompanyProfilePage } from "./pages/company/CompanyProfilePage";
import { CompanyTicketManagerPage } from "./pages/company/CompanyTicketManagerPage";
import { NewsCreatePage } from "./pages/company/news/NewsCreatePage";
import { CompletePageWrapper } from "./pages/CompletePage";
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
        id: "company-profile",
        path: "company/:id",
        element: <CompanyProfilePage />,
        loader: async ({ params }) => {
          return await CompanyService.getById(params.id as string);
        },
        children: [
          {
            index: true,
            element: <Navigate to={"contacts"} />,
          },
          {
            path: "contacts",
            element: <CompanyContacts />,
          },
          {
            path: "news",
            element: (
              <OptionalAuth>
                <OptionalCompanyOwner>
                  <CompanyNews />,
                </OptionalCompanyOwner>
              </OptionalAuth>
            ),
          },
          {
            path: "settings",
            element: (
              <AuthRequired>
                <CheckCompanyOwner>
                  <CompanySettings />
                </CheckCompanyOwner>
              </AuthRequired>
            ),
          },
        ],
      },
      {
        path: "company/:id/news/create",
        element: (
          <AuthRequired>
            <CheckCompanyOwner>
              <NewsCreatePage />,
            </CheckCompanyOwner>
          </AuthRequired>
        ),
      },
      {
        path: "company/:id/tickets/create",
        element: (
          <AuthRequired>
            <CheckCompanyOwner>
              <CompanyTicketManagerPage />,
            </CheckCompanyOwner>
          </AuthRequired>
        ),
      },
      {
        path: "companies/new",
        element: (
          <AuthRequired>
            <CompanyCreatePage />,
          </AuthRequired>
        ),
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
            loader: async ({ params }) => {
              return await EventService.getById(params.eventId as string);
            },
          },
          {
            path: ":eventId/:ticketId/checkout",
            element: (
              <AuthRequired>
                <EventCheckoutPage />,
              </AuthRequired>
            ),
          },
          {
            path: ":eventId/:ticketId/checkout/complete",
            element: (
              <AuthRequired>
                <CompletePageWrapper />
              </AuthRequired>
            ),
          },
        ],
      },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
