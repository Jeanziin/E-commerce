import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "../components/pages/Home/Home";
import Dashboard from "../components/pages/Dashboard/Dashboard";
import LoginPage from "../components/Login/Login";
import ChatPage from "../components/Tela/TelaIndex";
import RegisterPage from "../components/Login/Register";
import BookDetails from "../components/pages/BooksDetails/BooksDetails";
import { useContext } from "react";
import { UserContext } from "../components/UseContext/UserContext";
import MyAnnuncements from "../components/pages/MyAnnunciments/MyAnnuncements";
import MapGL from "../components/MapGL/MapGL";
import UpdateBook from "../components/pages/UpdateBook/UpdateBook";
import UserShow from "../components/pages/UserShow/UserShow";
import UpdateUser from "../components/pages/UpdateUser/UpdateUser";
import Favoritos from "../components/pages/Favoritos/Favoritos";
import NewPassword from "../components/Login/NewPassword";
import Categories from "../components/pages/categories/Categories";
import Sustainability from "../components/pages/Sustainability/Sustainability";
import BookModal from "../components/BookModal/BookModal";
import BookFilter from "../components/pages/Filter/Filter";
import { useEffect } from "react";
import ChatNotify from "../components/pages/ChatNotify/ChatNotify";

function ToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
const Rotas = () => {
  const [userData, setUserData] = useContext(UserContext);
  return (
    <Router>
      <ToTop />
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route
          path="/meus_anuncios"
          element={userData.isLogged ? <MyAnnuncements /> : <Navigate to="/" />}
        />
        <Route exact path="/details/:_id" Component={BookDetails} />
        <Route
          path="/dashboard"
          element={userData.isLogged ? <Dashboard /> : <Navigate to="/" />}
        />

        <Route
          path="/updateUser"
          element={userData.isLogged ? <UpdateUser /> : <Navigate to="/" />}
        />

        <Route exact path="/login" Component={LoginPage} />

        <Route exact path="/user_presentation/:_id" Component={UserShow} />
        <Route exact path="/favoritos" Component={Favoritos} />
        <Route exact path="/chat/:id" Component={ChatPage} />
        <Route exact path="/registrar" Component={RegisterPage} />
        <Route exact path="/sustainability" Component={Sustainability} />
        <Route exact path="/newpassword" Component={NewPassword} />
        <Route path="/map_products" Component={MapGL} />
        <Route
          path="/editar_produto/:_id"
          element={userData.isLogged ? <UpdateBook /> : <Navigate to="/" />}
        />
        <Route exact path="/categorias" Component={Categories} />
        <Route exact path="/filter" Component={BookFilter} />
        <Route
          path="/chatNotifications"
          element={userData.isLogged ? <ChatNotify /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default Rotas;
