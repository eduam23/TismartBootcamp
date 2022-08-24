
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { getAuthToken } from "../../services/authService";
// import { Link } from "react-router-dom";
import "./LoginPage.css";
import swal from "sweetalert";

function LoginPage() {

  const navigate = useNavigate();
  const { login } = useContext(AppContext);
  const [credenciales, setCredenciales] = useState({username:"",password:""});

  const handleChangeCredencial = (e) => {
    let { name, value } = e.target;
    let nDato = {...credenciales, [name]: value};
    setCredenciales(nDato);
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await getAuthToken(credenciales);
      login(data.token, 4);
      swal({
        title: "Ingresaste correctamente",
        text: "Clikea en siguiente para continuar",
        icon: "success",
        button: "Siguiente",
      });
      navigate("/producto");
    } catch (error) {
      swal({
        title: "Usuario o contraseña incorrectos",
        text: "Clikea en siguiente para continuar",
        icon: "error",
        button: "Siguiente",
      });
  }
}

  return (
  <div className="loginPage">
    <div className="loginPage_form">
      <h1>.Omni</h1>
      <form className="loginPage_formContent" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" autoComplete="off" placeholder="Username *" name="username" onChange={handleChangeCredencial} required/>
        {
          credenciales.username.length<=7
          ? <span><i>e.g. "mor_2314"</i></span>
          : null
        }
        <label htmlFor="password">Password</label>
        <input type="password" id="password" autoComplete="off" placeholder="Password *" name="password" onChange={handleChangeCredencial} required/>
        {
          credenciales.password.length<=5
          ? <span><i>e.g. "83r5^_"</i></span>
          : null
        }
        <button type="submit" disabled={ !credenciales.username | !credenciales.password ? true : false }>Login</button>
      </form>
      {/* <button><Link to="/producto">Ir a producto</Link></button> */}
    </div>
  </div>
  )
}

export default LoginPage;
