import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import CircleIcon from "@mui/icons-material/Circle";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import swal from "sweetalert";

function NavBar({ handleRowsFilter, handleRowsFilterClick, products }) {
  const navigate = useNavigate();
  const { logout } = useContext(AppContext);

  const handleLogout = () => {
    swal({
      title: "¿Estás seguro que quiere salir?",
      text: "Puede que se pierdan algunos datos",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Te has desconectado correctamente", {
          icon: "success",
        });
        logout();
        navigate("/");
      }
    });
  };

  return (
    <div className="navbar">
      <div className="navbar_searchInput">
        <label htmlFor="searchInput">
          <SearchIcon className="navbar_searchInput_searchIcon" />
        </label>
        {
          !products
        ? (
          <input
            type="text"
            placeholder="search product..."
            id="searchInput"
            onChange={handleRowsFilter}
          ></input>
        ) 
        : 
        (
          <Autocomplete
            freeSolo
            disableClearable
            onInputChange={handleRowsFilter}
            onChange={handleRowsFilterClick}
            style={{ width: 350 }}
            options={products.map((product) => product.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        )
        }
      </div>

      <div className="navbar_icons">
        <div className="navbar_icons_newMessage">
          <span className="navbar_icons_newMessage_flag">
            <CircleIcon />
          </span>
          <ChatOutlinedIcon />
        </div>

        <div className="navbar_icons_alarm">
          <span className="navbar_icons_alarm_flag">
            <CircleIcon />
          </span>
          <NotificationsNoneIcon />
        </div>

        <img
          src="https://cooperacion.uni.edu.pe/antes/assetsfrom/dist/images/users/11.jpg"
          alt="profileimage"
        />

        <div className="navbar_icons_alarm">
          <LogoutOutlinedIcon onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
