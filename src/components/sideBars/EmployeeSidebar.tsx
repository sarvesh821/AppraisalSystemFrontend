import { FaPlus, FaSignOutAlt, FaTh, FaUserAlt, FaTasks } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EmployeeSidebar.css";
import { EmployeeNavBar } from "../Header/EmployeeNavbar";
import { useNavigationGuard } from "../../Routes/UsePreventBack";

interface MenuItem {
  path: string;
  name: string;
  icon: JSX.Element;
}

interface EmployeeSidebarProps {
  children: React.ReactNode;
}

const EmployeeSidebar: React.FC<EmployeeSidebarProps> = ({ children }) => {
 useNavigationGuard()
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    {
      path: "dashboard",
      name: "dashboard",
      icon: <FaTh />,
    },
    {
      path: "addtask",
      name: "addtask",
      icon: <FaPlus />,
    },
    {
      path: "profile",
      name: "profile",
      icon: <FaUserAlt />,
    },
    {
      path: "tasks",
      name: "tasks",
      icon: <FaTasks />,
    },
  ];

  const handleLogout = async () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      console.error("No authToken found");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/logout/",
        {},
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );

      localStorage.removeItem("authToken");
      window.history.replaceState(null, "", "/login");

      navigate("/login", { replace: true });
     

    
      
    } catch (error) {
      console.error("Error during logout:", error);

    }
  };

  return (
    <>
      <EmployeeNavBar />
      <div className="container-flex">
        <div style={{ width: "200px" }} className="sidebar">
          {menuItems.map((item, index) => (
            <NavLink to={item.path} key={index} className="link lead">
              <div className="icon">{item.icon}</div>
              <div style={{ display: "block" }} className="link_text">
                {item.name}
              </div>
            </NavLink>
          ))}
          <div
            onClick={handleLogout}
            className="link lead"
            style={{ cursor: "pointer" }}
          >
            <div className="icon">
              <FaSignOutAlt />
            </div>
            <div style={{ display: "block" }} className="link_text">
              logout
            </div>
          </div>
        </div>
        <main>{children}</main>
      </div>
    </>
  );
};

export default EmployeeSidebar;
