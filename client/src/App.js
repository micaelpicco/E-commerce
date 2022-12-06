import { Route, Routes } from "react-router-dom";
import CreateStore from "./components/CreateStore/CreateStore";
import CreateUser from "./components/CreateUser/CreateUser";
import Favorites from "./components/Favorites/Favorites";
import axios from "axios";
import { useEffect } from "react";
import Home from "./components/Home/Home";
import LandingHome from "./components/LandingHome/LandingHome";
import Login from "./components/Login/Login";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import Stadistics from "./components/Stadistics/Stadistics";
import Forgot from "./components/Forgot/Forgot";
import Reset from "./components/Reset/Reset";
import Verified from "./components/Verified/verified";
import NotVerified from "./components/NotVerified/NotVerified";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import NotFound from "./components/NotFound/NotFound";
import { validateUser } from "./sessionUtils/jwtSession";
import {
  ProtectedRoute,
  ProtectedRoutes,
} from "./components/ProtectedRoute/ProtectedRoute";
import EditUser from "./components/EditUser/EditUser";
import { useLocalStorage } from "./Utils/useLocalStorage";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import EditProduct from "./components/EditProduct/EditProduct";

function App() {
  const [user, setUser] = useLocalStorage("userData");
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
          console.log(res.data);
          setUser(res.data);
        } catch (err) {
          console.log(err.message);
        }
      }
    })();
  }, [user, setUser]);

  return (
    <Routes>
      <Route index element={<LandingHome />} />
      <Route exact path="/" element={<LandingHome />} />
      <Route exact path="/home" element={<Home />} />
      <Route element={<ProtectedRoutes user={user} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CreateUser />} />
      </Route>
      <Route element={<ProtectedRoute user={user} />}>
        <Route path="/home/Favorites" element={<Favorites />} />
        <Route path="/home/ShoppingCart" element={<ShoppingCart />} />
        <Route path="/home/profile/*" element={<ProfilePage />} />
        <Route path="/home/stadistics" element={<Stadistics />} />
        <Route path="/home/createStore" element={<CreateStore />} />
        <Route path="/home/editUser" element={<EditUser />} />
        <Route path="/home/createProduct" element={<CreateProduct />} />
        <Route path="/home/editProduct/:id" element={<EditProduct />} />
      </Route>
      <Route path="/home/product/:id" element={<ProductDetail />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/verified" element={<Verified />} />
      <Route path="/not-verified" element={<NotVerified />} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
}

export default App;
