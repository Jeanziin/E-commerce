import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Footer/Footer.css";

function ModalSobreNos() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <a href="#" className="text-reset" onClick={() => setShowModal(true)}>
        Sobre Nós
      </a>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Swap Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bem-vindo ao Swap Book, o seu destino online para facilitar a venda e
          troca de livros entre os amantes da leitura! Aqui, oferecemos uma
          plataforma única inspirada na conhecida plataforma OLX, onde os
          usuários podem se conectar, compartilhar suas leituras e interagir uns
          com os outros.
          <br />
          <br />
          Nosso objetivo é proporcionar uma experiência agradável e prática para
          os apaixonados por livros. Acreditamos que a troca e venda de livros
          usados não apenas promove a circulação de conhecimento, mas também
          oferece uma oportunidade de economia para os leitores. Queremos ajudar
          a construir uma comunidade vibrante e engajada, onde todos possam
          encontrar os livros que desejam e, ao mesmo tempo, compartilhar os
          livros que já não precisam mais.
          <br />
          <br />
          Recursos Principais:
          <br />
          <br />
          Geolocalização: Nossa plataforma utiliza recursos de geolocalização
          para conectar usuários com outros leitores próximos. Isso facilita a
          organização de encontros e trocas locais, tornando a experiência mais
          conveniente e econômica.
          <br />
          <br />
          Chat Online: Para facilitar a comunicação entre os usuários,
          oferecemos um chat online integrado. Assim, os leitores podem discutir
          detalhes das transações, fazer perguntas sobre os livros e negociar de
          forma rápida e eficiente.
          <br />
          <br />
          Filtros Avançados: Os usuários podem filtrar a busca de livros por
          gênero, faixa de preço, estado de conservação e outros critérios. Isso
          ajuda a encontrar rapidamente os livros desejados e torna a
          experiência de navegação mais personalizada.
          <br />
          <br />
          Perfis de Usuário: Cada usuário possui um perfil pessoal onde pode
          adicionar informações sobre si mesmo, suas preferências de leitura e
          listar os livros disponíveis para venda ou troca. Isso facilita a
          conexão entre os leitores e promove um ambiente de confiança na
          comunidade.
          <br />
          <br />
          Estamos empenhados em proporcionar uma experiência segura e confiável
          para todos os usuários. Tomamos medidas para garantir a qualidade dos
          anúncios e promover boas práticas de negociação. No entanto, lembramos
          aos usuários que é importante tomar precauções ao realizar transações
          online e verificar os detalhes das negociações antes de finalizá-las.
          <br />
          <br />
          Agradecemos por fazer parte da comunidade Swap Book! Estamos animados
          para ver a comunidade crescer e esperamos que você desfrute de uma
          experiência enriquecedora e gratificante em nosso site.
          <br />
          <br />
          Troque, venda e compartilhe sua paixão pelos livros com o Swap Book!
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

export default ModalSobreNos;
