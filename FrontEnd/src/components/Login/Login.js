import { useState, useContext } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../Services/Api.js";
import { UserContext } from "../UseContext/UserContext";
import "../Login/StyleLogin.css";
import banner07 from "../img/banner_02.png";
import logos from "../img/logoFullWhite.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const LoginPage = () => {
  const [userData, setUserData] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  async function loginHandle(e) {
    e.preventDefault();

    try {
      const userData = await api.post("session", {
        email,
        password,
      });
      const User = userData.data;
      const userGuard = JSON.stringify(User.email).replace(/["]/g, "");
      const nameGuard = JSON.stringify(User.name).replace(/["]/g, "");
      const idGuard = JSON.stringify(User._id).replace(/["]/g, "");
      localStorage.setItem("email", userGuard);
      localStorage.setItem("name", nameGuard);
      localStorage.setItem("id", idGuard);
      localStorage.setItem("IsLogged", true);
      const userInfo = userData.data;
      setUserData((prevState) => ({
        ...prevState,
        isLogged: true,
        email: userInfo.email,
        name: userInfo.name,
        _id: userInfo._id,
      }));
      navigate("/");
    } catch (err) {
      MySwal.fire({
        title: "Erro!",
        text: "Erro no Login, tente novamente",
        icon: "error",
        confirmButtonText: "Ok",
        didOpen: () => {
          MySwal.stopTimer();
        },
      });
    }
  }

  return (
    <div className="cont-centrer">
      <div className="col-login1 container">
        <div className="col-login2">
          <div className="col-login3">
            <img alt="" id="logo-lg" src={logos}></img>
            <form>
              <div class="inputbox">
                <input
                  required="required"
                  value={email}
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                ></input>
                <span>Email</span>
                <i></i>
              </div>

              <div class="inputbox">
                <input
                  required="required"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                ></input>
                <span>Senha</span>
                <i></i>
              </div>

              <button
                onClick={loginHandle}
                type="submit"
                class="w-full button-name rounded-3xl text-black "
              >
                Login
              </button>
              <div className="edit-p">
                <p class="mt-4 ">
                  Não Possui uma conta?{" "}
                  <Link className="isis" to="/registrar">
                    {" "}
                    Registre-se Aqui
                  </Link>
                </p>
              </div>
            </form>
          </div>
          <div className="col-login4">
            <img alt="img" id="img-lg-mb" src={banner07}></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
