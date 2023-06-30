import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {BsInfoCircleFill} from 'react-icons/bs';

const BookExchangeModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <a onClick={handleShow} href="#"><BsInfoCircleFill id="icon-info-dash"/></a>
    

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Trocas de Livros</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
          A opção de troca de livros permite que outros usuários entrem em contato
            com você para negociar a troca do livro anunciado. Essa é uma ótima
            oportunidade de expandir sua biblioteca pessoal e descobrir novas histórias.
          </p>
          <p>
          Ao permitir trocas do seu livro, você estará aberto a receber propostas de
            outros usuários interessados em trocar livros com você. Vocês podem discutir
            detalhes como o estado dos livros, formas de entrega e quaisquer outras
            preferências relacionadas à troca.
          </p>
          <p>  Aproveite essa experiência para conhecer novas pessoas e explorar diferentes
            gêneros literários. A troca de livros é uma maneira divertida e econômica de
            adquirir novas obras e compartilhar as suas com outras pessoas.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BookExchangeModal;
