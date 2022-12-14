import React, { useState, useEffect } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";

import "./index.css";
import { NavLink } from "react-router-dom";
import { authActions } from "../../store/redux/authSlice";
import { useSelector } from "react-redux";
import { dispatch } from "../../store/store";

const SideNavigation = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { profileName } = useSelector((state) => state.profileName);

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/payment",
      name: "Dashboard",
      icon: <FaTh />,
      isPrivate: true,
    },
    {
      path: "/profile",
      name: "Profile",
      icon: <FaUserAlt />,
      isPrivate: true,
    },
    {
      path: "/about",
      name: "About",
      icon: <FaRegChartBar />,
      isPrivate: true,
    },
    {
      path: "/contact",
      name: "Contact",
      icon: <FaCommentAlt />,
      isPrivate: true,
    },
    // {
    //   path: "/login",
    //   name: "Logout",
    //   icon: <FaShoppingBag />,
    //   isPrivate: false,
    // },
    // {
    //     path:"/register",
    //     name:"register",
    //     icon:<FaThList/>
    // }
  ];
  return (
    <div className="container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidenav">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            {profileName && profileName}
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink to={item.path} key={index} className="link">
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
        <NavLink to={"/login"} className="link">
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
            onClick={handleLogout}
          >
            Logout
          </div>
        </NavLink>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default SideNavigation;
