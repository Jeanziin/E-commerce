import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsWhatsapp } from "react-icons/bs";
import "../BookModal/BookModal.css";

const BookModal = ({ book, onClose, show }) => {
  const [number, setNumber] = useState("");
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);
  const message = `Olá, vi seu anúncio do Livro ${book.name} no Swap Book, e gostaria de saber se ainda está disponível`;

  function removePhoneFormatting(numberTel) {
    return numberTel.replace(/\D/g, "");
  }

  const handleWhatsAppClick = () => {
    setNumber(removePhoneFormatting(book.user.phone));
    const whatsappUrl = `https://wa.me/${number}?text=${message}`;
    window.open(whatsappUrl);
  };

  const toggleSynopsis = () => {
    setShowFullSynopsis(!showFullSynopsis);
  };

  const synopsisText = showFullSynopsis
    ? book.synopsis
    : book.synopsis.slice(0, 150) + "...";

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Body className="card-modal">
          <div className="image">
            <img
              src={`${process.env.REACT_APP_API}/${book.src}`}
              alt={book.name}
            />
          </div>
          <div className="content">
            <h5>{book.name}</h5>
            <p className="author">
              <span id="tx-modal">Autor:</span> {book.author}
            </p>
            <p className="price">
              <span id="tx-modal">Preço:</span> R$ {book.price}
            </p>
            <p className="synopsis">
              <span id="tx-modal">Sinopse:</span> {synopsisText}
              {!showFullSynopsis && (
            <Link to={`/details/${book._id}`}>
                <button className="read-more" onClick={toggleSynopsis}>
                  Ler mais
                </button>
                </Link>
              )}
            </p>
            <p className="posted-by">
              <span id="tx-modal">Postado por:</span>{" "}
              <Link to={`/user_presentation/${book.user._id}`}>
                {book.user.name}
              </Link>
            </p>
            <div className="whatsapp">
              <BsWhatsapp />
              <p className="whatsClick" onClick={handleWhatsAppClick}>
                Telefone: {book.user.phone}
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="footer">
          <Button variant="primary" onClick={onClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BookModal;
