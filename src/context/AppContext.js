import React, { useState} from 'react';
// import { useNavigate } from 'react-router-dom';

const AppContext = React.createContext();
const { Provider, Consumer } = AppContext;

function AppProvider({children}){

    // const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.token ? localStorage.token : null);

    function login(token){
        localStorage.setItem("token", token);
        setToken(token);
    }
    
    function logout(){
        localStorage.removeItem("token");
        setToken(null);
    }

    return(
        <Provider value={{token, login, logout}}>
            {children}
        </Provider>
    );

}

export { AppProvider, Consumer as AppConsumer, AppContext };