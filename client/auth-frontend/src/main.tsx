import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./routes/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./routes/ErrorPage";
import App from "./routes/App";
import Profile from "./routes/Profile";
import { AuthProvider } from "./auth/ContextProvider";
import UpdateProfile from "./routes/UpdateProfile";
import ProfileError from "./components/ProfileError";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "profile/:userId",
        element: <Profile />,
        errorElement: <ProfileError />,
      },
      {
        path: "profile/:userId/update",
        element: <UpdateProfile />,
        errorElement: <ProfileError />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
