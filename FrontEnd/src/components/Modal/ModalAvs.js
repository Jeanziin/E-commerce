import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import imginfo1 from '../img/imginfo1.jpeg'
import imginfo2 from '../img/imginfo2.jpeg'
import imginfo3 from '../img/imginfo3.jpeg'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Modal/Modal.css'
import { AiOutlineCheck, AiOutlineClose
} from 'react-icons/ai';

function ModalAvs() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []); // a dependência vazia faz com que o useEffect seja executado apenas uma vez, na montagem do componente

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Melhore seus Anuncios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Para aumentar as chances de sucesso na venda ou troca do seu livro, é recomendado enviar imagens de boa qualidade e em uma angulação adequada. Certifique-se de que a capa e as páginas estejam visíveis e sem sombras ou reflexos, para que os interessados possam ter uma boa noção do estado do livro.
            <br/>
            Logo abaixo você poderá visualizar algums exemplos positivos e negativos para o envio da Imagem. Desde já agradecemos a compreensão.
          </p>
          <div className="container-info">
      <div className="image-container">
        <img
          src={imginfo1}
          alt="Imagem 1"
        />
        <div className="icon-container">
          <i className="fas fa-thumbs-up"><AiOutlineCheck/> </i>
        </div>
      </div>
      <div className="image-container">
        <img
            src={imginfo2}
          alt="Imagem 2"
        />
        <div className="icon-container">
          <i className="fas fa-thumbs-down"><AiOutlineClose/></i>
        </div>
      </div>
      <div className="image-container">
        <img
           src={imginfo3}
          alt="Imagem 3"
        />
        <div className="icon-container">
          <i className="fas fa-thumbs-up"><AiOutlineClose/></i>
        </div>
      </div>
    </div>
    <br/>
    <h6>Estado de conservação do Livro</h6>
    <p>Novo:</p> um livro novo é aquele que nunca foi lido ou utilizado, e está em perfeito estado de conservação.
    <br/>
    <p>Como novo:</p> um livro como novo é aquele que parece ter sido pouco utilizado, mas pode apresentar leves sinais de desgaste ou envelhecimento, como pequenas manchas na capa ou nas páginas.
    <br/>
    <p>Muito bom:</p> um livro em muito bom estado de conservação pode apresentar alguns sinais de uso, como marcas de dobras na capa ou pequenas manchas nas bordas das páginas, mas geralmente está em boas condições.
    <br/>
    <p>Bom:</p> um livro em bom estado de conservação pode apresentar sinais mais evidentes de uso, como rasgos ou manchas na capa, e pode estar um pouco desgastado, mas ainda é legível e pode ser utilizado.
    <br/>
    <p>Regular:</p> um livro em estado regular de conservação pode apresentar vários sinais de desgaste, como manchas, rasgos, dobras ou páginas soltas, mas ainda é legível e pode ser utilizado.
    <br/>
    <p>Ruim:</p> um livro em estado ruim de conservação apresenta graves sinais de desgaste, como páginas faltando, rasgos grandes ou manchas que afetam a legibilidade, e pode precisar de reparos ou restauração para ser utilizado novamente.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAvs;