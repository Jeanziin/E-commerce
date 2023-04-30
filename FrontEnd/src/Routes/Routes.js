import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../components/pages/Home/Home";
import Dashboard from "../components/pages/Dashboard/Dashboard";
import LoginPage from "../components/Login/Login";
import ChatPage from "../components/Tela/TelaIndex"
import RegisterPage from "../components/Login/Register";
import BookDetails from "../components/pages/BooksDetails/BooksDetails";
import { useContext } from "react";
import { UserContext } from "../components/UseContext/UserContext";
import MyAnnuncements from "../components/pages/MyAnnunciments/MyAnnuncements";
import MapGL from "../components/MapGL/MapGL";
import UpdateBook from "../components/pages/UpdateBook/UpdateBook";

const Rotas = () => {
    const [userData, setUserData] = useContext(UserContext)
  return (
      <Router>
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
          <Route exact path="/login" Component={LoginPage} />
          <Route exact path="/chat" Component={ChatPage} />
          <Route exact path="/registrar" Component={RegisterPage} />
          <Route
            path="/map_products"
            element={userData.isLogged ? <MapGL/> : <Navigate to="/" />}
          />
          <Route
            path="/editar_produto/:_id"
            element={userData.isLogged ? <UpdateBook/> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
  );
};

export default Rotas;
