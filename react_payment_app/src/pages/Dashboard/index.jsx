import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";
import { useState } from "react";
import { useEffect } from "react";

function SideMenu() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(JSON.parse(localStorage.getItem("user")));
  }, [username]);
  return (
    <div>
      <div>
        <ul className="topnav">
          {/* <div className="header">
            <li>{username.firstname && username.firstname}</li>
          </div> */}
        </ul>
      </div>
      <ul className="sidebar">
        <li>
          <NavLink active to={"/payment"}> Home </NavLink>
        </li>
        <li>
          <NavLink to={"/about"}> about us </NavLink>
        </li>
        <li>
          <NavLink to={"/contact"}> contact us </NavLink>
        </li>
        <li>
          <NavLink to={"/profile"}> my profile </NavLink>
        </li>
        {/* <li> {username.firstname && username.firstname}</li> */}
        <li>
          <NavLink to={"/login"}> Logout </NavLink>
        </li>
      </ul>
      <div className="content"></div>
    </div>
  );
}

export default SideMenu;
