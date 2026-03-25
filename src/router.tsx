import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { AdminPage } from "./pages/AdminPage";
import { AuthPage } from "./pages/AuthPage";
import { CompanyCreatePage } from "./pages/CompanyCreatePage";
import { CompanyProfilePage } from "./pages/CompanyProfilePage";
import { EventCheckoutPage } from "./pages/EventCheckoutPage";
import { EventCreatePage } from "./pages/EventCreatePage";
import { EventDetailPage } from "./pages/EventDetailPage";
import { HomePage } from "./pages/HomePage";
import { UserProfilePage } from "./pages/UserProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "auth",
        element: <AuthPage />
      },
      {
        path: "admin",
        element: <AdminPage />
      },
      {
        path: "company",
        element: <CompanyProfilePage />
      },
      {
        path: "companies",
        children: [
          {
            path: "new",
            element: <CompanyCreatePage />
          }
        ]
      },
      {
        path: "profile",
        element: <UserProfilePage />
      },
      {
        path: "events",
        children: [
          {
            path: "new",
            element: <EventCreatePage />
          },
          {
            path: ":eventId",
            element: <EventDetailPage />,
          },
          {
            path: ":eventId/checkout",
            element: <EventCheckoutPage />
          }
        ]
      }
    ]
  }
])

export const Router = () => {
  return <RouterProvider router={router} />
}