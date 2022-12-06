import { Formik } from "formik";
import Styles from './Forgot.module.css';
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const Forgot = () => {
    const toastEmail = (text) =>
    Toastify({
      text: text,
      duration: 2000,
      position: "center",
      className: Styles.toast,
      backgroundColor: "#32CD32",
    }).showToast()
    const handleSubmit = ({email}) => {
        console.log(email);
        axios.post(`${process.env.REACT_APP_API || "http://localhost:3001"}/auth/forgot-password`,{email})
        .then(res => {
            console.log(res);
            toastEmail(res.data);
        },err => console.log(err));
    }
    return(
        <div>
             <div className={Styles.container}>
            <div className={Styles.header}></div>
            <div className={Styles.subtitle}>
            <h2>Olvido de password</h2>
            </div>
            <Formik
            initialValues={{
                email: "",
            }}
            validate={(value) => {
                let errors = {};

                if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value.email)) {
                errors.email = "Ingrese un email valido";
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
                <div className={Styles.entry}>
                    <input
                    type="text"
                    id="email"
                    placeholder="Email"
                    name="email"
                    className={Styles.form1}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    autoComplete="off"
                    />

                    {touched.email && errors.email && (
                    <div className={Styles.errors}>
                        {" "}
                        <span>{errors.username}</span>{" "}
                    </div>
                    )}
                </div>
                {/* VALIDATIONS */}
                {!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email) ? (
                    <button className={Styles.btnDisabled} disabled>
                    Enviar email
                    </button>
                ) : (
                    <button type="submit" className={Styles.submit}>
                    Enviar Email
                    </button>
                )}
                </form>
            )}
            </Formik>
        </div>
    </div>
    );
}

export default Forgot;