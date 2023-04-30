import React, { useContext, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import logo from '../img/logo.png';
import { Link } from "react-router-dom";
import { UserContext } from "../UseContext/UserContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


import './Nav.css'



function Navbar2({setSearchProducts}) {
  const [userData, setUserData] = useContext(UserContext);

  const navigate = useNavigate();

  async function logoutHandler(e) {
    localStorage.setItem('email', '')
    localStorage.setItem('name', '')
    localStorage.setItem('id', '')
    localStorage.removeItem('IsLogged')
    await navigate('/')
    window.location.reload(true)
    e.preventDefault()
  }

  async function navigacao() {
    navigate('/')
    await navigate('/')
    window.location.reload(true)
  }

  return (
    <>
    <Navbar bg="light" expand="lg">
      <Container >
        <Navbar.Brand to="/"  onClick={function(e) {navigacao()}} href="#">
          <img
            src={logo}
            id="img-logo"
            height="60"
            alt="Logo"
            //onChange={(e) => setSearchProducts(e.target.value)}  placeholder="Pesquisar Livro"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
        <div class="container-input">
  <input type="text" onChange={(e) => setSearchProducts(e.target.value)}  placeholder="Pesquisar Livro" name="text" class="input-pesquisa"></input>
  <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
    <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" fill-rule="evenodd"></path>
</svg>
</div>

          <Nav className="align-icons">
                <Link to="/chat" className="icon">  <BsChatDots className="icon-size"/> </Link>
                <Link className="icon"><AiOutlineUser className="icon-size" /></Link>
                <Link   className="icon"><AiOutlineShoppingCart className="icon-size" /></Link>
                {userData.isLogged ? (
                <Link  to="/dashboard"><Button className="btn_nav" >Anunciar</Button></Link>
                ) : null}
                 {userData.isLogged ? null : (  
                <Link to="/login"><Button className="btn_nav" >Entrar</Button></Link>
                )}
                {userData.isLogged ? (
                <Link  to="/meus_anuncios"><Button className="btn_nav" >Meus Anuncios</Button></Link>
                ) : null}  
                {userData.isLogged ? (
                  <Link ><AiOutlineLogout className="icon-size" id="logout" onClick={logoutHandler}/> </Link>
                  ) : null}
</Nav>  
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default Navbar2;
