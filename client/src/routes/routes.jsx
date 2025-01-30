import { createBrowserRouter } from "react-router-dom";

import UserLayout from "../layout/UserLayout";

import ErrorPage from "../components/shared/ErrorPage";

import HomePage from "../components/user/HomePage";
import CartPage from "../components/user/CartPage";
import AboutPage from "../components/shared/AboutPage";
import SignUpPage from "../components/shared/SignUpPage";
import LoginPage from "../components/shared/LoginPage";
import AllRestaurantsPage from "../components/restaurant/AllRestaurantsPage";
import ProfilePage from "../components/user/ProfilePage";
import RestaurantPage from "../components/restaurant/RestaurantPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/all-restaurant",
        element: <AllRestaurantsPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/restaurant",
        element: <RestaurantPage />,
      },
      {
        path: "/restaurant/:restaurantId", // Dynamic route parameter for RestaurantPage
        element: <RestaurantPage />, // Restaurant details page
      },
    ],
  },
]);

export default router;
