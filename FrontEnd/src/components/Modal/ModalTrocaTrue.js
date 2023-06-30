import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import { MdOutlineSwapHorizontalCircle } from 'react-icons/md';

const BookExchangeModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>

      <a onClick={handleShow}>
      <MdOutlineSwapHorizontalCircle id='icon-troca'/>
        
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Aberto para negociação de troca</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Este livro está aberto para negociação de troca com outros usuários.
            A troca de livros é uma ótima maneira de expandir sua biblioteca pessoal
            e descobrir novas histórias.
          </p>
          <p>
            Aproveite essa oportunidade para conhecer novas pessoas e explorar diferentes
            gêneros literários. A troca de livros é uma maneira divertida e econômica
            de adquirir novas obras e compartilhar as suas com outras pessoas.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BookExchangeModal;
