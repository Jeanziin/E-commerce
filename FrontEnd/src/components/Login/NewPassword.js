import React, { useState, useContext } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { UserContext } from '../UseContext/UserContext';
import api from '../../Services/Api.js';
import "../Login/NewPassword.css";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const NewPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate()
  const [userData] = useContext(UserContext);
  const MySwal = withReactContent(Swal)

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (currentPassword && newPassword) {
      try {
        const response = await api.put(
          `/user/password/${userData._id}`,
          { password: newPassword, currentPassword },
          { headers: { auth: `${userData._id}` } }
        );
        MySwal.fire({
          title: 'Sucesso!',
          text: 'Senha alterada com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok',
          didOpen: () => {
            MySwal.stopTimer()
          },
        })
        navigate('/')
      } catch (err) {
        if (err.response && err.response.status === 400 && err.response.data.message === 'Senha atual incorreta') {
          MySwal.fire({
            title: 'Erro!',
            text: 'Senha atual incorreta. Por favor, tente novamente.',
            icon: 'error',
            confirmButtonText: 'Ok',
            didOpen: () => {
              MySwal.stopTimer()
            },
          })
        } else {
          alert(`Falha ao alterar a senha do usuário`);
        }
      }
    } else {
      alert("Por favor, preencha todos os campos");
    }
  };
  
  return (
    <div className="container-senha">
      <div className="form-wrapper-senha">
        <div className="img-div-sen">
          <img alt="" id="img-logo-senha" src={logo} />
        </div>
        <div className="tx-senha">
          <h4>Altere sua senha</h4>
          <p>
            Crie uma senha longa e complexa, com letras maiúsculas, minúsculas,
            números e símbolos.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group-senha">
            <label id="lab-senha" htmlFor="currentPassword">
              Senha atual
            </label>
            <div className="input-wrapper">
              <input
                className="inp-senha"
                type={showCurrentPassword ? "text" : "password"}
                id="currentPassword"
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
              />
              <button
                className="show-password"
                type="button"
                onClick={handleShowCurrentPassword}
              >
                {showCurrentPassword ? (
                  <AiOutlineEyeInvisible id="icon-senha" />
                ) : (
                  <AiOutlineEye id="icon-senha" />
                )}
              </button>
            </div>
          </div>
          <div className="form-group-senha">
            <label id="lab-senha" htmlFor="newPassword">
              Nova senha <span id="sp-tx-sen">Use letras, números e caracteres especiais.</span>
            </label>
            <div className="input-wrapper">
              <input
                className="inp-senha"
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
              <button
                className="show-password"
                type="button"
                onClick={handleShowNewPassword}
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible id="icon-senha" />
                ) : (
                  <AiOutlineEye id="icon-senha" />
                )}
              </button>
            </div>
          </div>
          <div className="form-btn">
            <button className="btn-donate" type="submit" disabled={!currentPassword || !newPassword}>
              Alterar senha
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
