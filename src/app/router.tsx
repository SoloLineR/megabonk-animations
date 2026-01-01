import { createBrowserRouter } from "react-router";
import RootLayout from "./RootLayout";
import HomePage from "../page/home-page/home-page";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);
