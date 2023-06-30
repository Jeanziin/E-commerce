import React, { useState } from "react";
import styles from "./myCards.module.css";
import api from "../../../Services/Api";
import { useContext } from "react";
import { UserContext } from "../../UseContext/UserContext";
import { Link } from "react-router-dom";
import { Dropdown, IconButton } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import MoreIcon from "@rsuite/icons/More";
import TrashIcon from "@rsuite/icons/Trash";
import EditIcon from "@rsuite/icons/Edit";
import { FaIcon } from "react-icons/fa";
import "../MyAnnunciments/mycard.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const renderIconButton = (props, ref) => {
  return (
    <IconButton
      {...props}
      ref={ref}
      icon={<MoreIcon />}
      circle
      color="blue"
      appearance="primary"
      className="z-3 position-absolute"
    />
  );
};

const MyCards = ({ name, author, price, synopsis, _id, src, createdAt }) => {
  const [userData, setUserData] = useContext(UserContext);
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);
  const MySwal = withReactContent(Swal);

  async function deleteProduct() {
    try {
      await api.delete(`${userData._id}/product/${_id}`, {
        headers: {
          auth: userData._id,
        },
      });
      MySwal.fire({
        title: "Sucesso",
        text: "Produto deletado com sucesso",
        icon: "success",
        confirmButtonText: "Ok",
        didOpen: () => {
          MySwal.stopTimer();
        },
      });
    } catch (err) {
      MySwal.fire({
        title: "Erro ao deletar",
        text: "Verifique sua Rede",
        icon: "error",
        confirmButtonText: "Ok",
        didOpen: () => {
          MySwal.stopTimer();
        },
      });
    }
  }

  // Function to extract only the date part from the createdAt value
  const extractDate = (createdAt) => {
    if (!createdAt) return ""; // Verificar se createdAt está definido

    const dateParts = createdAt.split(" ")[0].split("-");
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    return `${day}/${month}/${year}`;
  };

  const toggleSynopsis = () => {
    setShowFullSynopsis(!showFullSynopsis);
  };

  return (
    <div className="card-anum">
      <img
        src={`${process.env.REACT_APP_API}/${src}`}
        alt="Imagem do livro"
        className="book-image"
      />
      <div className="card-content d-flex flex-wrap">
        <h2 className="book-title">{name}</h2>
        <p className="book-synopsis">
          <span id="sin-edit">Sinopse: </span>
          {showFullSynopsis ? synopsis : `${synopsis.substring(0, 150)}...`}
          <span
            className="read-more"
            onClick={toggleSynopsis}
            style={{ cursor: "pointer" }}
          >
            {showFullSynopsis ? "Voltar" : "Ler Mais"}
          </span>
        </p>
        <div className="info-card-aanum">
          <div className="card-icons">
            <TrashIcon
              id="icon-delete"
              className="card-icon cursor-pointer"
              onClick={deleteProduct}
            />
            <Link to={`/editar_produto/${_id}`}>
              <EditIcon id="icon-edit" className="card-icon" />
            </Link>
          </div>
          <p className="book-sy">Postado na data: {createdAt} </p>
        </div>
      </div>
    </div>
  );
};

export default MyCards;
