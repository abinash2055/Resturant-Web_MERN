import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/ManLayout";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
import HeroSection from "./components/HeroSection";
import Profile from "./components/Profile";
import SearchPage from "./components/SearchPage";
import ResturantDetail from "./components/ResturantDetails";
import Cart from "./components/Cart";
import Resturant from "./admin/Resturant";
import AddMenu from "./admin/AddMenu";
import Orders from "./admin/Orders";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HeroSection />,
      },

      {
        path: "/profile",
        element: <Profile />,
      },

      {
        path: "/search/:text",
        element: <SearchPage />,
      },

      {
        path: "/resturant/:id",
        element: <ResturantDetail />,
      },

      {
        path: "/cart",
        element: <Cart />,
      },

      // ADMIN PART
      {
        path: "/admin/resturant",
        element: <Resturant />,
      },

      {
        path: "/admin/menu",
        element: <AddMenu />,
      },

      {
        path: "/admin/orders",
        element: <Orders />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },

  {
    path: "/reset-password",
    element: <ResetPassword />,
  },

  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={appRouter}></RouterProvider>
    </main>
  );
}

export default App;
