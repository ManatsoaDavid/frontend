import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./navbar";

const Visitor: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("visitorToken");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mx-auto ">
        <Outlet />
      </div>
    </div>
  )
}

export default Visitor
