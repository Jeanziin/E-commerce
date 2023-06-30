import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Modal/Modal.css';
function ModalSecurity() {
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    handleClose();
  };
  return (
    <>
      <a href="#" className='btn-SeP' onClick={() => setShowModal(true)}>
      Saiba como se protejer
      </a>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className='modal-title'>Dicas de Segurança - Venda de Livros</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body'>
          <h5>1. Encontre-se em um local público</h5>
          <p>
            Sempre que possível, encontre-se com o comprador ou vendedor em um local público, como uma cafeteria, livraria ou shopping center. Evite locais isolados ou desconhecidos.
          </p>
          <h5>2. Verifique a reputação do usuário</h5>
          <p>
            Antes de concluir uma transação, verifique a reputação do usuário com quem você está negociando. Verifique as avaliações de outros usuários e leia os comentários deixados por eles.
          </p>
          <h5>3. Comunique-se por meio do site</h5>
          <p>
            Utilize o sistema de mensagens do site para se comunicar com o comprador ou vendedor. Evite fornecer informações pessoais, como números de telefone ou endereços de e-mail, antes de ter certeza da confiabilidade da outra pessoa.
          </p>
          <h5>4. Desconfie de ofertas muito boas</h5>
          <p>
            Se uma oferta parecer boa demais para ser verdade, desconfie. Golpistas podem tentar atrair vendedores com propostas irresistíveis para roubar seus produtos ou obter informações pessoais.
          </p>
          <h5>5. Utilize métodos seguros de pagamento</h5>
          <p>
            Prefira utilizar métodos de pagamento seguros, como cartões de crédito, transferências bancárias ou serviços de pagamento online reconhecidos. Evite enviar dinheiro em espécie ou utilizar serviços não confiáveis.
          </p>
          <h5>6. Confira o produto antes de finalizar a transação</h5>
          <p>
            Antes de finalizar a transação, verifique o estado do livro pessoalmente. Certifique-se de que o livro corresponde à descrição do anúncio e está em condições adequadas.
          </p>
          <h5>7. Confirme os detalhes da transação</h5>
          <p>
            Antes de efetuar o pagamento ou enviar o livro, confirme todos os detalhes da transação, incluindo o preço acordado, a forma de entrega e quaisquer outros termos ou condições.
          </p>
          <h5>8. Mantenha registros da transação</h5>
          <p>
          Guarde todas as informações relacionadas à transação, como comprovantes de pagamento, mensagens trocadas com o vendedor e detalhes do produto. Esses registros podem ser úteis caso haja algum problema ou disputa futura.
          </p>
          <h4>O Swap Book Informa</h4>
          <p>
          O Swap Book não se responsabiliza por quaisquer transações realizadas entre usuários. Recomendamos que os usuários ajam com cautela e tomem todas as precauções necessárias ao comprar, vender ou trocar livros. O site não garante a qualidade, autenticidade, condição ou legalidade dos livros anunciados, nem a veracidade das informações fornecidas pelos usuários. Os usuários são responsáveis por verificar e confirmar todas as informações relevantes antes de concluir qualquer transação. O Swap Book não assume responsabilidade por perdas, danos ou disputas decorrentes de transações realizadas através do site.
          </p>

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

export default ModalSecurity;