import Rating from "@mui/material/Rating";
import { useEffect, useState, useRef } from "react";
import Styles from "./CreateReview.module.css";
import { createReviewProduct } from "../../redux/actions";
import { getSession, validateUser } from "../../sessionUtils/jwtSession";
import { useDispatch } from "react-redux";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const CreateReview = ({ id }) => {
  const [rating, setRating] = useState({ value: null, text: "" });
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const textbox = useRef();
  const toast = (text, color = "#32CD32") =>
    Toastify({
      text: text,
      duration: 1500,
      position: "center",
      className: Styles.toast,
      backgroundColor: color,
    }).showToast();

  useEffect(() => {
    (async () => {
      if (!info) {
        const data = await validateUser();
        setInfo(data);
      }
    })();
  }, [info]);

  const errorhandle = (event) => {
    if (rating.value && rating.text) {
      postReview();
    } else {
      setError("Necesita brindar una Puntuacion y un Comentario");
    }
  };

  const handdleChange = (e) => {
    setRating({ ...rating, text: e.target.value });
  };

  const postReview = () => {
    const data = {
      score: rating.value,
      reviews: rating.text,
    };
    dispatch(createReviewProduct(id, data, info)).then(() =>
      toast("Reseña creada con exito")
        .then(window.location.reload())
        .catch(() => toast("Algo salio mal", "red"))
    );
    setRating({ value: null, text: "" });
    textbox.current.value = "";
  };

  return (
    <div>
      <h1 className={Styles.MakeReviewTittle}>Realizar Reseña</h1>
      <div>
        <Rating
          value={rating.value}
          onChange={(event, newvalue) =>
            setRating({ ...rating, value: newvalue })
          }
          sx={{ fontSize: "5rem" }}
        />
      </div>
      {!error ? null : <span>{error}</span>}
      <div className={Styles.ReviewFormsContainer}>
        <form
          className={Styles.ReviewForms}
          onSubmit={(e) => {
            e.preventDefault();
            errorhandle(e);
          }}
        >
          <textarea
            className={Styles.ReviewText}
            ref={textbox}
            name=""
            id=""
            cols="30"
            rows="10"
            onChange={(evento) => handdleChange(evento)}
            placeholder={"Introduzca Reseña..."}
          ></textarea>
          <input
            className={Styles.MakeReviewButton}
            type="submit"
            value="Enviar"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateReview;
