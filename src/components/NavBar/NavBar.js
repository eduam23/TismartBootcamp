import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import CircleIcon from '@mui/icons-material/Circle';
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="navbar">
      <div className="navbar_searchInput">
        <label for="searchInput">
          <SearchIcon className="navbar_searchInput_searchIcon"/>
        </label>
        <input type="text" placeholder="search type..." id="searchInput"></input>
      </div>
      <div className="navbar_icons">
        <div className="navbar_icons_newMessage">
        <span className="navbar_icons_newMessage_flag">
            <CircleIcon/>
          </span>
          <ChatOutlinedIcon />
        </div>

        <div className="navbar_icons_alarm">
        <span className="navbar_icons_alarm_flag">
            <CircleIcon/>
          </span>
          <NotificationsNoneIcon />
        </div>

        <img
          src="https://cooperacion.uni.edu.pe/antes/assetsfrom/dist/images/users/11.jpg"
          alt="profileimage"
        />
      </div>
    </div>
  );
}

export default NavBar;
