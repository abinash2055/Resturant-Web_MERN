import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";

const ManLayout = () => {
  return (
    <div className="flex flex-col min-h-screen m-2 md:m-0">
      {/* Navbar  */}
      <header>
        <Navbar />
      </header>
      {/* Main Content  */}
      <div className="flex-1">
        <Outlet />
      </div>
      {/* Footer  */}
      <Footer />
    </div>
  );
};

export default ManLayout;
