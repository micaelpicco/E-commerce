import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Verified = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/home");
    }, 5000);
  }, [navigate]);
  return <h1>Gracias por verificar tu cuenta</h1>;
};

export default Verified;
