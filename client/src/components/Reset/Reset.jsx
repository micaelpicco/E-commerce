import { useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

import Styles from "./Reset.module.css";

const Reset = () => {
    const [showPwd, setShowPwd] = useState(false);
    const search = useLocation().search;
    const id = new URLSearchParams(search).get('user');
    const navigate = useNavigate();
    const toastPass = (text) =>
    Toastify({
      text: text,
      duration: 2000,
      position: "center",
      className: Styles.toast,
      backgroundColor: "#32CD32",
    }).showToast();
    const handleSubmit = (values) => {
        console.log(values);
        axios.put(`${process.env.REACT_APP_API || "http://localhost:3001"}/auth/reset-password`,
        {
            password:values.newPassword,
            id:id,
        }).then(res => {
            console.log(res.data);
            toastPass(res.data);
            navigate('/login');
        },err => console.log(err));
    }
    return(
        <div className={Styles.container}>
        <div className={Styles.subtitle}>
          <h2>Crear nueva password</h2>
        </div>
        <Formik
          initialValues={{
            newPassword: "",
            confirm: "",
          }}
          validate={(value) => {
            let errors = {};

            if (!value.newPassword.length) {
              errors.newPassword = "Ingrese contraseña";
            } else if (value.newPassword !== value.confirm || !value.confirm) {
              errors.passwords = "La contraseña no coincide, inténtalo de nuevo";
            }

            return errors;
          }}
          onSubmit={(values, { resetForm }) => {
            resetForm();
            handleSubmit(values);
          }}
        >
          {({
            handleSubmit,
            errors,
            values,
            touched,
            handleChange,
            handleBlur,
          }) => (
            <form className={Styles.formulario} onSubmit={handleSubmit}>
              <div className={Styles.eye2} onClick={() => setShowPwd(!showPwd)}>
                {showPwd ? (
                  <svg
                    className={Styles.pwdicon}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#595959"
                    width="24"
                    height="24"
                  >
                    <path d="M 19.815 16.34 c 0.28 0.27 0.707 0.288 0.987 0 a 0.686 0.686 0 0 0 0 -0.987 L 5.989 0.549 a 0.704 0.704 0 0 0 -0.995 0 a 0.707 0.707 0 0 0 0 0.979 l 14.82 14.812 Z M 12.933 1.047 c -1.529 0 -2.909 0.262 -4.193 0.69 l 1.415 1.415 c 0.882 -0.244 1.79 -0.393 2.778 -0.393 c 5.554 0 9.965 4.83 9.965 5.852 c 0 0.69 -1.398 2.462 -3.625 3.86 l 1.31 1.319 c 2.743 -1.8 4.34 -4.149 4.34 -5.18 c 0 -1.79 -4.82 -7.563 -11.99 -7.563 Z m 0 15.136 c 1.607 0 3.082 -0.28 4.419 -0.743 l -1.415 -1.415 c -0.943 0.28 -1.939 0.446 -3.004 0.446 c -5.572 0 -9.983 -4.638 -9.983 -5.86 c 0 -0.586 1.476 -2.463 3.843 -3.93 L 5.457 3.343 C 2.609 5.161 0.924 7.571 0.924 8.611 c 0 1.79 4.926 7.572 12.009 7.572 Z m 4.34 -5.904 c 0.227 -0.507 0.35 -1.083 0.35 -1.668 a 4.661 4.661 0 0 0 -4.69 -4.682 c -0.603 0 -1.162 0.123 -1.677 0.332 l 6.017 6.018 Z m -4.34 3.022 c 0.663 0 1.292 -0.158 1.86 -0.428 l -6.14 -6.14 a 4.245 4.245 0 0 0 -0.428 1.886 c 0.009 2.542 2.088 4.682 4.708 4.682 Z" />
                    <path d="M 19.815 16.34 c 0.28 0.27 0.707 0.288 0.987 0 a 0.686 0.686 0 0 0 0 -0.987 L 5.989 0.549 a 0.704 0.704 0 0 0 -0.995 0 a 0.707 0.707 0 0 0 0 0.979 l 14.82 14.812 Z M 12.933 1.047 c -1.529 0 -2.909 0.262 -4.193 0.69 l 1.415 1.415 c 0.882 -0.244 1.79 -0.393 2.778 -0.393 c 5.554 0 9.965 4.83 9.965 5.852 c 0 0.69 -1.398 2.462 -3.625 3.86 l 1.31 1.319 c 2.743 -1.8 4.34 -4.149 4.34 -5.18 c 0 -1.79 -4.82 -7.563 -11.99 -7.563 Z m 0 15.136 c 1.607 0 3.082 -0.28 4.419 -0.743 l -1.415 -1.415 c -0.943 0.28 -1.939 0.446 -3.004 0.446 c -5.572 0 -9.983 -4.638 -9.983 -5.86 c 0 -0.586 1.476 -2.463 3.843 -3.93 L 5.457 3.343 C 2.609 5.161 0.924 7.571 0.924 8.611 c 0 1.79 4.926 7.572 12.009 7.572 Z m 4.34 -5.904 c 0.227 -0.507 0.35 -1.083 0.35 -1.668 a 4.661 4.661 0 0 0 -4.69 -4.682 c -0.603 0 -1.162 0.123 -1.677 0.332 l 6.017 6.018 Z m -4.34 3.022 c 0.663 0 1.292 -0.158 1.86 -0.428 l -6.14 -6.14 a 4.245 4.245 0 0 0 -0.428 1.886 c 0.009 2.542 2.088 4.682 4.708 4.682 Z" />
                    <path d="M 19.815 16.34 c 0.28 0.27 0.707 0.288 0.987 0 a 0.686 0.686 0 0 0 0 -0.987 L 5.989 0.549 a 0.704 0.704 0 0 0 -0.995 0 a 0.707 0.707 0 0 0 0 0.979 l 14.82 14.812 Z M 12.933 1.047 c -1.529 0 -2.909 0.262 -4.193 0.69 l 1.415 1.415 c 0.882 -0.244 1.79 -0.393 2.778 -0.393 c 5.554 0 9.965 4.83 9.965 5.852 c 0 0.69 -1.398 2.462 -3.625 3.86 l 1.31 1.319 c 2.743 -1.8 4.34 -4.149 4.34 -5.18 c 0 -1.79 -4.82 -7.563 -11.99 -7.563 Z m 0 15.136 c 1.607 0 3.082 -0.28 4.419 -0.743 l -1.415 -1.415 c -0.943 0.28 -1.939 0.446 -3.004 0.446 c -5.572 0 -9.983 -4.638 -9.983 -5.86 c 0 -0.586 1.476 -2.463 3.843 -3.93 L 5.457 3.343 C 2.609 5.161 0.924 7.571 0.924 8.611 c 0 1.79 4.926 7.572 12.009 7.572 Z m 4.34 -5.904 c 0.227 -0.507 0.35 -1.083 0.35 -1.668 a 4.661 4.661 0 0 0 -4.69 -4.682 c -0.603 0 -1.162 0.123 -1.677 0.332 l 6.017 6.018 Z m -4.34 3.022 c 0.663 0 1.292 -0.158 1.86 -0.428 l -6.14 -6.14 a 4.245 4.245 0 0 0 -0.428 1.886 c 0.009 2.542 2.088 4.682 4.708 4.682 Z" />
                  </svg>
                ) : (
                  <svg
                    className={Styles.pwdicon}
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#595959"
                  >
                    <path
                      fillRule="evenodd"
                      d="M 12.933 15.187 c 7.17 0 11.99 -5.782 11.99 -7.572 S 20.086 0.052 12.934 0.052 C 5.867 0.052 0.923 5.825 0.923 7.615 s 4.927 7.572 12.01 7.572 Z m 0 -1.712 c -5.572 0 -9.983 -4.637 -9.983 -5.86 c 0 -1.022 4.41 -5.851 9.983 -5.851 c 5.545 0 9.965 4.83 9.965 5.851 c 0 1.223 -4.42 5.86 -9.965 5.86 Z m 0 -1.17 c 2.602 0 4.69 -2.14 4.69 -4.69 a 4.661 4.661 0 0 0 -4.69 -4.681 c -2.62 0 -4.717 2.07 -4.708 4.681 c 0.018 2.55 2.088 4.69 4.708 4.69 Z m -0.01 -3.179 c -0.838 0 -1.519 -0.681 -1.519 -1.51 c 0 -0.83 0.681 -1.512 1.52 -1.512 c 0.838 0 1.52 0.681 1.52 1.511 c 0 0.83 -0.682 1.511 -1.52 1.511 Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div className={Styles.entry}>
                <input
                  type={showPwd ? "text" : "password"}
                  id="newPassword"
                  placeholder="Nuevo Password"
                  name="newPassword"
                  className={Styles.form1}
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  autoComplete="off"
                />

                {touched.newPassword && errors.newPassword && (
                  <div className={Styles.errors}>
                    {" "}
                    <span>{errors.newPassword}</span>{" "}
                  </div>
                )}

                <div>
                  <div>
                    <input
                      type={showPwd ? "text" : "password"}
                      placeholder="Contraseña"
                      className={Styles.form2}
                      name="confirm"
                      value={values.confirm}
                      onChange={handleChange}
                      onKeyUp={handleBlur}
                      onBlur={handleBlur}
                    />
                    {touched.confirm && errors.confirm && (
                      <div className={Styles.errors}>
                        <span>{errors.confirm}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* VALIDATIONS */}
              {!values.newPassword ||
                  values.confirm !== values.newPassword ? (
                <button className={Styles.btnDisabled} disabled>
                  Cambiar password
                </button>
              ) : (
                <button type="submit" className={Styles.submit}>
                  Cambiar password
                </button>
              )}
            </form>
          )}
        </Formik>
      </div>
    );
}

export default Reset;