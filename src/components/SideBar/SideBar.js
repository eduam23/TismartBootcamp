import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SmsIcon from "@mui/icons-material/Sms";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import "./SideBar.css";
import referYourFriend from '../../assets/img/referFriend.png';

function SideBar() {
  return (
    <div className="sidebar">
        <div className="sidebar_logo">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTADDGq_9UVKO6lwml1MTjMRpff7NSj0X3u7NRkTRK0Mz-AYJLYTXKe2IwhV2SrLJu6r1I&usqp=CAU"
            alt="logo"
          />
        </div>

        <div className="sidebar_menu">
          <h4>Menu</h4>
          <div className="sidebar_menu_buttongroup">
            <button>
              <HomeIcon className="sidebar_menu_buttongroup_buttonicon" />
              Overview
            </button>
            <button>
              <MenuBookIcon className="sidebar_menu_buttongroup_buttonicon" />
              Courses
            </button>
            <button>
              <DataUsageIcon className="sidebar_menu_buttongroup_buttonicon" />
              Planning
            </button>
            <button>
              <AssessmentIcon className="sidebar_menu_buttongroup_buttonicon" />
              Statistics
            </button>
          </div>
        </div>

        <hr />

        <div className="sidebar_menu">
          <h4>Account</h4>
          <div className="sidebar_menu_buttongroup">
            <button className="sidebar_menu_messageButton">
              <SmsIcon className="sidebar_menu_buttongroup_buttonicon" />
              Messages
              <span> 5 </span>
            </button>
            <button className="sidebar_menu_settingsButton">
              <SettingsOutlinedIcon className="sidebar_menu_buttongroup_buttonicon" />
              Settings
            </button>
          </div>
        </div>

        <div className="sidebar_refer">
          <img src={referYourFriend} alt="referYourFriend" />
          <p>Invite a Friend</p>
          <button type="button">Get the Link</button>
        </div>
    </div>
  );
}

export default SideBar;
