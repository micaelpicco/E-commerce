import { React, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Styles from "./NavBar.module.css";
import Logo from "../images/bitmap2.png";
import Cart from "../images/cart.svg";
import ButtonFav from "../images/buttonFavNav.svg";
import Profile from "../images/profile.svg";
import { validateUser } from "../../sessionUtils/jwtSession";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import axios from "axios";
import { useLocalStorage } from "../../Utils/useLocalStorage";
//import { FaWindows } from "react-icons/fa";

const NavBar = () => {
  const [user, setUser] = useLocalStorage("userData");
  const navigate = useNavigate();
  const toast = (text) =>
    Toastify({
      text: text,
      duration: 2000,
      position: "center",
      className: Styles.toast,
      backgroundColor: "black",
    }).showToast();

  useEffect(() => {
    (async () => {
      if (!user) {
        const token = validateUser();
        try {
          const res = await axios.get(
            `${
              process.env.REACT_APP_API || "http://localhost:3001"
            }/user/get?secret_token=${token}`
          );
          setUser(res.data);
        } catch (err) {
          console.log(err.message);
        }
      }
    })();
  }, [user, setUser]);

  const handleLogout = (e) => {
    setUser("");
    document.cookie = "token=;max-age=0";
    window.localStorage.clear();
    toast("Sesión cerrada");
    navigate("/home");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <nav className={Styles.NavbarHome}>
      <div className={Styles.NavbarHomeContainer}>
        <Link to="/">
          <img className={Styles.NavbarHomeLogo} src={Logo} alt="logo" />
        </Link>
        {/* si el usuario no esta logueado mostrar login y signup
                en caso contrario mostrar el usuario logueado y boton de 
            cerrar sesion */}
        {!user ? (
          <div className={Styles.NavbarHomeFormsButtonsContainer}>
            <Link to="/login">
              <button className={Styles.NavbarHomeButtons}>
                Iniciar Sesión
              </button>
            </Link>
            <Link to="/register">
              <button className={Styles.NavbarHomeButtons}>Registrarse</button>
            </Link>
          </div>
        ) : (
          <>
            <Link className={Styles.NavBarLinks} to="/home">Inicio</Link>
            <Link to="/home/ShoppingCart">
              <img
                className={Styles.CartIcon}
                src={Cart}
                alt="img not found"
              ></img>
            </Link>
            <Link to="/home/Favorites">
              <img
                className={Styles.FavIcon}
                src={ButtonFav}
                alt="img not found"
              />
            </Link>
            <Link to="/home/profile">
              <img
                className={Styles.ProfileFav}
                src={Profile}
                alt="img not found"
              ></img>
            </Link>
            {/* <Link className={Styles.NavBarLinks} to="/home/stadistics">Estadísticas</Link> */}

            <div className={Styles.Session}>

              {/* username */}
              <label className={Styles.Username}>{user?.username}</label>
              <button
                className={Styles.NavbarHomeButtons2}
                onClick={(e) => {
                  handleLogout(e);
                }}
              >
                Cerrar Sesión
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
