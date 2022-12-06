import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Profile from "../Profile/Profile";
import SellPage from "../SellPage/SellPage";
import BuyPage from "../BuyPage/BuyPage";
import NavBar from "../NavBar/NavBar";
import Stadistics from "../Stadistics/Stadistics";
import { Link } from "react-router-dom";
import Styles from "./ProfilePage.module.css"

const ProfilePage = () => {  
    const location = useLocation();

    console.log(location.pathname)

    return (
        <div className={Styles.ProfilePage}>
            <NavBar />
            <div className={Styles.profileLinksDiv}>
                <Link id={location.pathname === "/home/profile" ? Styles.Selected : Styles.NotSelected} 
                    className={Styles.profileLinks} to="/home/profile">PERFIL
                </Link>
                <Link id={location.pathname === "/home/profile/buys" ? Styles.Selected : Styles.NotSelected} 
                    className={Styles.profileLinks} to="/home/profile/buys">COMPRAS
                </Link>
                <Link id={location.pathname === "/home/profile/sells" || location.pathname === "/home/profile/sells/products" ? Styles.Selected : Styles.NotSelected} 
                    className={Styles.profileLinks} to="/home/profile/sells">VENTAS
                </Link>
                <Link id={location.pathname === "/home/profile/stadistics" ? Styles.Selected : Styles.NotSelected} 
                    className={Styles.profileLinks} to="/home/profile/stadistics">ESTADISTICAS
                </Link>
            </div>
            <div className={Styles.profileRoutes}>
                <Routes>
                    <Route index element = {<Profile/>} />
                    <Route path="/buys" element={<BuyPage/>} />
                    <Route path="/sells/*" element={<SellPage/>} /> 
                    <Route path="/stadistics" element={<Stadistics/>} />
                </Routes>
            </div>
        </div>
    );
}

export default ProfilePage