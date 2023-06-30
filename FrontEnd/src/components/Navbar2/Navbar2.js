import React, { useContext, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiMenu3Line } from "react-icons/ri";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { UserContext } from "../UseContext/UserContext";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { MdFavoriteBorder } from "react-icons/md";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";

import "./Nav.css";

function Navbar2({ setSearchProducts }) {
  const [userData, setUserData] = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [AlertMsm, setAlertMsm] = useState("");

  const navigate = useNavigate();

  async function logoutHandler(e) {
    localStorage.setItem("email", "");
    localStorage.setItem("name", "");
    localStorage.setItem("id", "");
    localStorage.removeItem("IsLogged");
    localStorage.removeItem("favorites");
    await navigate("/");
    window.location.reload(true);
    e.preventDefault();
  }

  async function navigacao() {
    navigate("/");
  }

  const handleChatClick = () => {
    if (userData.isLogged) {
      // Redirecionar para a página do chat
      navigate("/ChatNotifications");
    } else {
      // Mostrar o modal informando que é necessário estar logado
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navbar className="fixed-top edit-nav-pr navbar" bg="light" expand="lg">
        <Container>
          <Navbar.Brand
            to="/"
            onClick={function (e) {
              navigacao();
            }}
            href="#"
          >
            <img src={logo} id="img-logo" height="60" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"> <RiMenu3Line id="icon-nav-edit"/></Navbar.Toggle>
         
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <div class="container-input">
              <input
                type="text"
                onChange={(e) => setSearchProducts(e.target.value)}
                placeholder="Pesquisar Livro"
                name="text"
                class="input-pesquisa"
              ></input>
              <svg
                fill="#00a8ff"
                width="20px"
                height="20px"
                viewBox="0 0 1920 1920"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </div>

            <Nav className="align-icons">
              {userData.isLogged ? (
                <Link to="/chatNotifications" className="icon">
                  <BsChatDots className="icon-size" />
                </Link>
              ) : (
                <Link className="icon" onClick={handleChatClick} onChange={(e => setAlertMsm('Chat'))}>
                  <BsChatDots className="icon-size" />
                </Link>
              )}

              {userData.isLogged ? (
                <Link to="/favoritos" className="icon">
                <MdFavoriteBorder className="icon-size" />
              </Link>
              ) : (
                <Link className="icon" onClick={handleChatClick}>
                  <MdFavoriteBorder className="icon-size" />
                </Link>
              )}
              
              {userData.isLogged ? (
                <Link to="/dashboard">
                  <Button className="btn_nav">Anunciar</Button>
                </Link>
              ) : null}
              {userData.isLogged ? null : (
                <Link to="/login">
                  <Button className="btn_nav">Entrar</Button>
                </Link>
              )}
              {userData.isLogged ? (
                <Link to="/meus_anuncios">
                  <Button className="btn_nav">Meus Anuncios</Button>
                </Link>
              ) : null}
              {userData.isLogged ? (
                <Link className="icon">
                  <AiOutlineUser className="icon-size-drop" />{" "}
                  <Dropdown as={ButtonGroup}>
                    <Button id="btn-drop">
                      Olá, 
                      {userData.isLogged ? (
                        <p className="edit-user-name">
                          {`${userData.name.split(" ")[0]}`}
                        </p>
                      ) : null}{" "}
                    </Button>

                    <Dropdown.Toggle split id="dropdown-split-basic" />

                    <Dropdown.Menu>
                      <Link id="sua-conta-edit" to="/updateUser">
                        <Dropdown.Item
                          id="edit-tx-dr"
                          href="#/action-2"
                          to="/updateUser"
                        >
                          Sua Conta
                        </Dropdown.Item>
                      </Link>
                      {userData.isLogged ? (
                        <Link id="link-edit-tx" onClick={logoutHandler}>
                          <Dropdown.Item id="edit-tx-dr" href="#/action-3">
                            Sair
                          </Dropdown.Item>
                        </Link>
                      ) : null}
                    </Dropdown.Menu>
                  </Dropdown>
                </Link>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ferramenta indisponível</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          É necessário estar logado para utilizar essa ferramenta. Por favor, faça o
          login ou crie uma conta.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Fechar
          </Button>
          <Link to="/login">
            <Button variant="primary">Entrar</Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Navbar2;