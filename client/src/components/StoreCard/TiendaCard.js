import React from "react";
import "./css/Card.css";
import { useNavigate } from "react-router-dom";

export default function TiendaCard({ id, name, logo }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`store/${id}`);
  }

  return (
    <div id="Card" onClick={handleClick}>
      <img id="logo" src={logo} alt="Logo" />
      <h1 id="name">{name}</h1>
    </div>
  );
}
