import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Footer/Footer.css'

function ModalPp() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <a href="#" className='text-reset' onClick={() => setShowModal(true)}>
        Políticas de privacidade
      </a>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>  Política de Privacidade do Swap Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>

Esta Política de Privacidade descreve como o Swap Book coleta, usa, compartilha e protege as informações pessoais dos usuários em nosso site.
<br/>
<br/>
1. Informações coletadas
Nós coletamos informações pessoais quando você se cadastra no nosso site, se comunica conosco ou usa nossos serviços. As informações coletadas podem incluir seu nome, endereço de e-mail, endereço postal, número de telefone, informações de pagamento e outras informações necessárias para fornecer nossos serviços.
<br/>
<br/>
2. Uso das informações
Usamos as informações pessoais que coletamos para fornecer e melhorar nossos serviços, personalizar sua experiência no site, processar transações, fornecer suporte ao cliente, enviar comunicações importantes e promocionais e realizar pesquisas e análises.
<br/>
<br/>
3. Compartilhamento de informações
Não compartilhamos suas informações pessoais com terceiros para fins de marketing sem seu consentimento. Podemos compartilhar suas informações com prestadores de serviços terceirizados que usamos para operar nosso site e fornecer nossos serviços, como processadores de pagamento, provedores de hospedagem, provedores de análise e provedores de suporte ao cliente. Esses prestadores de serviços terceirizados têm acesso limitado às suas informações pessoais apenas para executar tarefas em nosso nome e são obrigados a proteger suas informações de acordo com as leis aplicáveis.
<br/>
<br/>
4. Segurança
Tomamos medidas razoáveis para proteger as informações pessoais que coletamos e armazenamos contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de transmissão de informações pela internet ou armazenamento eletrônico é totalmente seguro, e não podemos garantir a segurança absoluta das informações pessoais que coletamos.
<br/>
<br/>
5. Cookies
Nós usamos cookies e tecnologias semelhantes para coletar informações sobre como você usa nosso site e para fornecer anúncios personalizados. Você pode desativar os cookies em seu navegador, mas isso pode limitar sua capacidade de usar nosso site.
<br/>
<br/>
6. Alterações nesta política
Podemos atualizar esta Política de Privacidade de tempos em tempos para refletir alterações em nossas práticas de privacidade. A versão atualizada será postada em nosso site e a data da última atualização será indicada no topo da página.
<br/>
<br/>
7. Contato
Se você tiver alguma dúvida ou preocupação sobre esta Política de Privacidade ou sobre como usamos suas informações pessoais, entre em contato conosco através do nosso formulário de contato no site.
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

export default ModalPp;
