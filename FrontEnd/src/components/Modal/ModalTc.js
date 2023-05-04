import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Footer/Footer.css'

function ModalTc() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <a href="#" className='text-reset' onClick={() => setShowModal(true)}>
       Termos e Condições
      </a>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Termos e Condições do Swap Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Bem-vindo ao Swap Book. Estes Termos e Condições regem o uso do nosso site e serviços. Ao usar nosso site e serviços, você concorda com estes Termos e Condições. Se você não concorda com estes Termos e Condições, não use nosso site ou serviços.
<br/>
<br/>
1. Uso do site
Você pode usar nosso site apenas para fins legais e de acordo com estes Termos e Condições. Você concorda em não usar nosso site de qualquer forma que viole qualquer lei, regulamento ou direito de terceiros. Você concorda em não usar nosso site de forma fraudulenta, enganosa ou prejudicial.
<br/>
<br/>
2. Conta de usuário
Você pode se registrar para criar uma conta de usuário em nosso site. Ao se registrar, você concorda em fornecer informações precisas, completas e atualizadas sobre si mesmo. Você é responsável por manter a segurança e a confidencialidade de sua conta de usuário e senha, e por todas as atividades que ocorrem em sua conta.
<br/>
<br/>
3. Conteúdo do usuário
Você é o único responsável pelo conteúdo que publica em nosso site, incluindo anúncios de livros e mensagens em fóruns e comentários. Você concorda em não publicar conteúdo que seja ilegal, difamatório, obsceno, ofensivo ou que viole os direitos de terceiros. Você concede ao Swap Book uma licença não exclusiva, livre de royalties, perpétua, irrevogável e mundial para usar, reproduzir, modificar, adaptar, publicar, traduzir, distribuir e exibir qualquer conteúdo que você publique em nosso site.
<br/>
<br/>
4. Vendas e trocas de livros
O Swap Book é um site que facilita vendas e trocas de livros entre usuários. Ao usar nosso site para vender ou trocar livros, você concorda em cumprir todas as leis e regulamentações aplicáveis, incluindo as leis de proteção ao consumidor e direitos autorais. O Swap Book não é responsável pelas transações entre usuários e não oferece garantias sobre os livros vendidos ou trocados em nosso site.
<br/>
<br/>
5. Propriedade intelectual
Todos os direitos autorais, marcas registradas e outros direitos de propriedade intelectual em nosso site e conteúdo pertencem ao Swap Book ou a terceiros. Você concorda em não usar ou reproduzir qualquer conteúdo de nosso site sem a permissão por escrito do proprietário dos direitos autorais.
<br/>
<br/>
6. Limitação de responsabilidade
O Swap Book não se responsabiliza por quaisquer danos diretos, indiretos, incidentais, especiais ou consequenciais decorrentes do uso ou incapacidade de usar nosso site ou serviços. O Swap Book não se responsabiliza por quaisquer perdas de dados, receita ou lucros decorrentes do uso ou incapacidade de usar nosso site ou serviços.
<br/>
<br/>
7. Modificações
O Swap Book reserva-se o direito de modificar estes Termos e Condições a qualquer momento, sem aviso prévio. A versão atualizada dos Termos e Condições será publicada em nosso site e a data da última atualização será indicada no topo da página.
<br/>
<br/>
8. Cancelamento e Suspensão da Conta
O Swap Book se reserva o direito de cancelar ou suspender sua conta, a qualquer momento e por qualquer motivo, incluindo violação destes Termos e Condições ou conduta inadequada. Em caso de cancelamento ou suspensão de sua conta, você não poderá criar uma nova conta no Swap Book sem nossa permissão prévia por escrito.
<br/>
<br/>
9. Links para Sites de Terceiros
Nosso site pode conter links para sites de terceiros. Esses links são fornecidos apenas para sua conveniência e não implicam nosso endosso desses sites. O Swap Book não é responsável pelo conteúdo ou pelas práticas de privacidade de sites de terceiros.
<br/>
<br/>
10. Isenção de Garantias
O Swap Book não faz quaisquer declarações ou garantias quanto à precisão, confiabilidade ou integridade do conteúdo do nosso site ou serviços. Todo o conteúdo e serviços são fornecidos "tal como estão" e "conforme disponível" sem garantia de qualquer tipo, expressa ou implícita.
<br/>
<br/>
11. Indenização
Você concorda em indenizar, defender e manter o Swap Book e seus afiliados, diretores, funcionários e agentes isentos de qualquer responsabilidade, reclamação ou demanda, incluindo honorários advocatícios razoáveis, decorrentes de qualquer violação destes Termos e Condições ou uso indevido de nosso site ou serviços.
<br/>
<br/>
12 Lei Aplicável e Jurisdição
Estes Termos e Condições são regidos e interpretados de acordo com as leis do Brasil, e quaisquer disputas relacionadas a estes Termos e Condições serão resolvidas exclusivamente pelos tribunais brasileiros.
<br/>
<br/>
13. Disposições Gerais
Estes Termos e Condições constituem o acordo completo entre você e o Swap Book e substituem quaisquer acordos anteriores ou contemporâneos. Se qualquer disposição destes Termos e Condições for considerada inválida ou inexequível, as demais disposições permanecerão em pleno vigor e efeito. Qualquer renúncia a qualquer disposição destes Termos e Condições só será efetiva se feita por escrito e assinada pelo Swap Book.

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

export default ModalTc;
