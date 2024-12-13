import { Outlet } from "react-router-dom";
import NavbarMain from "./navbars/navbar.main";
import SidebarMain from "./sidebars/sidebar.main";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { error } from "console";

const MainLayout = () => {
  return (
    <div className=" h-screen">
      <Outlet />
    </div>
  );
};

export default MainLayout;
