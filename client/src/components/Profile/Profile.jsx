import { useEffect, useState } from "react";
import Styles from "./Profile.module.css";
import { Link } from "react-router-dom";
import { getUserData } from "../../Utils/useLocalStorage";

export default function Profile() {
  const [user, setUser] = useState("");

  useEffect(() => {
    (async () => {
      if (!user) {
        const data = await getUserData();
        setUser(data);
      }
    })();
  }, [user, user.id]);

  return (
    <>
      <div className={Styles.profileContainer}>
        <div className={Styles.sectionProfile}>
          <div className={Styles.sectionContainer}>
            <div className={Styles.ProfileButtonsDiv}>
              {!user.storeName ? (
                <div>
                  <Link to="/home/editUser">
                    <button
                      id={Styles.EditButton}
                      className={Styles.buttonProfile}
                    >
                      EDITAR
                    </button>
                  </Link>
                  <Link to="/home/createStore">
                    <button className={Styles.buttonProfile}>
                      CREAR TIENDA
                    </button>
                  </Link>
                </div>
              ) : (
                <div>
                  <Link to="/home/editUser">
                    <button
                      id={Styles.EditButton}
                      className={Styles.buttonProfile}
                    >
                      EDITAR
                    </button>
                  </Link>
                  <Link to="/home/createProduct">
                    <button className={Styles.buttonProfile}>
                      CREAR PRODUCTO
                    </button>
                  </Link>
                </div>
              )}
            </div>  
          </div>
          <div className={Styles.pictureProfileDiv}>
              <img
                className={Styles.pictureProfile}
                src={user?.profilePicture}
                alt={user.username}
              />
            </div>
            <h1 className={Styles.titleusername}>{user.username}</h1>
          <div className={Styles.profileInformation}>
            <h1 className={Styles.InformationTittle}>Datos</h1>
            <label className={Styles.InfoProfileLabel}>
              Nombre: {user.name}
            </label>
            {user.storeName ? (
              <label className={Styles.InfoProfileLabel}>
                Tienda: {user.storeName}
              </label>
            ) : null}
            <label className={Styles.InfoProfileLabel}>
              Correo: {user.mail}
            </label>
            <label className={Styles.InfoProfileLabel}>
              Telefono: {user.phone}
            </label>
            <label className={Styles.InfoProfileLabel}>
              Localidad: {user.location}
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
