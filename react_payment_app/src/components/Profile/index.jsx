import React from "react";
import "./index.css";
import axios from "axios";
import { useState } from "react";
import SideMenu from "../../pages/Dashboard";
import profileicon from '../../assets/profile.png'
import { profileNameActions } from "../../store/redux/userName";
import { dispatch } from "../../store/store";
// import { useEffect } from "react";

export default function Profile() {
  const [value, setUpdatedValue] = useState(false);

  const getUserName = () => {
    let username = JSON.parse(localStorage.getItem("user"));
    return username;
  };

  const user = getUserName();

  const handleChange = (e) => {
    console.log(e.target.value);
    const userName = e.target.value;
    setUpdatedValue(userName);
  };

  const handleSubmitClick = (e) => {
    const response = axios
      .put(`http://localhost:3000/users/${"7D7aUlQ"}`, {
        ...user,
        firstname: value,
      })
      .then((res) => {
        console.log("name", res.data);
      //  const storeName =  localStorage.setItem("user", JSON.stringify(res.data));
      //  console.log(storeName)
       dispatch(profileNameActions.profileName(res.data.firstname))
      })
      .catch((e) => {
        console.log(e);
      });
    return response;
  };

  return (
    <div>
      {/* <SideMenu /> */}
      <div className="profile">
        <div className="input-group">
          <img src={profileicon} alt='profile'/>
          <label>Update User Name :</label>
          <input type="text" onChange={handleChange} />
        </div>
        <div>
          <button className="primary" type="submit" onClick={handleSubmitClick}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
