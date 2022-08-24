import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';

const AppContext = React.createContext();
const { Provider, Consumer } = AppContext;

function AppProvider({ children }) {
//   const navigate = useNavigate();
  const [token, setToken] = useState(
    localStorage.token ? localStorage.token : null
  );

  function login(token, expiry) {

    if (!localStorage.token) {
      const now = new Date();
      const item = {
        token,
        expiry: now.getTime() + expiry,
      };
      localStorage.setItem("token", JSON.stringify(item));
      setToken(JSON.stringify(item));
    } else {
        if (getWithExpiry()) {
            return null
        } 
        logout();
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setTimeout(() => {
        window.location.reload();
    }, 1100);
    
  }

  function getWithExpiry() {
    const tokenStorage = localStorage.getItem("token");
    if (!tokenStorage) {
      return false;
    }
    const item = JSON.parse(tokenStorage);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      logout();
      return false;
    }
    return true;
  }

  return <Provider value={{ token, login, logout }}>{children}</Provider>;
}

export { AppProvider, Consumer as AppConsumer, AppContext };
