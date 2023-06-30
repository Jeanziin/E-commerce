import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {BsInfoCircleFill} from 'react-icons/bs';
const LocationMapModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
     <a onClick={handleShow} href="#"><BsInfoCircleFill id="icon-info-dash"/></a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Localização do Livro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Ao permitir o uso da sua localização, o site poderá exibir a região onde
            o livro se encontra em um mapa interativo. Isso facilita para os outros
            usuários visualizarem a proximidade do livro em relação a eles.
          </p>
          <p>
            Com base na sua localização, o mapa mostrará um marcador indicando a região
            aproximada onde o livro está disponível. Isso ajudará a tornar as negociações
            e a logística da entrega mais convenientes para ambas as partes envolvidas.
          </p>
          <p>
            É importante mencionar que a sua localização precisa ser compartilhada com o
            site apenas durante a exibição do mapa e a filtragem de livros próximos. Ela não será armazenada nem utilizada
            para outros fins além da visualização da localização do livro e da filtragem.
          </p>
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

export default LocationMapModal;
