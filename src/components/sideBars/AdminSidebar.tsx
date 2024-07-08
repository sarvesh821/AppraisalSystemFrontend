import React from "react";
import { FaSignOutAlt, FaStar, FaTh, FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import './AdminSidebar.css'
import { MdPersonAdd } from "react-icons/md";

interface MenuItem {
  path: string;
  name: string;
  icon: JSX.Element;
}

interface EmployeeSidebarProps {
  children: React.ReactNode;
}

const EmployeeSidebar: React.FC<EmployeeSidebarProps> = ({ children }) => {
   
  const menuItems: MenuItem[] = [
    {
      path: 'dashboard',
      name: "dashboard",
      icon: <FaTh />
    },
    {
      path: 'register',
      name: "register",
      icon: <MdPersonAdd />
    },
    {
        path: 'rating',
        name: "rating",
        icon: <FaStar />
      },
    {
      path: 'employees',
      name: "employees",
      icon: <FaUsers />
    },
    {
      path: 'logout',
      name: "logout",
      icon: <FaSignOutAlt />
    }
  ];

  return (
    <div className="container-flex">
       <div style={{width: "200px" }} className="sidebar">
             
               {
                   menuItems.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link lead  " >
                           <div className="icon">{item.icon}</div>
                           <div style={{display:  "block" }} className="link_text">{item.name}</div>
                           
                       </NavLink>
                      
                   ))
               }
           </div>
           <main>{children}</main>
    </div>
  );
};

export default EmployeeSidebar;
