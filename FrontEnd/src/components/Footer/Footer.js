import React from 'react';
import '../Footer/Footer.css'
import logoFooter from '../img/logo_footer.png'
import '../Modal/Modal'
import ModalPp from '../Modal/Modal';
import ModalTc from '../Modal/ModalTc';

//<div class="col-md-1 col-lg-1 col-xl-1 mx-auto mb-md-0 mb-4">

const Footer = () => {
  return (
 
<footer class="position-relative text-center footer-edit text-lg-start text-muted">

 
  <section class="text-edit-footer">
    <div class="container text-center text-md-start mt-5">
     
      <div class="row mt-3">
       
        <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
        
          <h6 class="text-uppercase  fw-bold mb-4">
            <img alt='logo' className='img_logo_footer' src={logoFooter}></img>

          </h6>
          <p>
          Renove sua estante e compartilhe conhecimento com Swap Book: a plataforma de troca de livros feita para leitores apaixonados!
          </p>
        </div>
    
        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-4">
     
          <h6 class="text-uppercase edit-h6 fw-bold mb-4">
            Categorias mais populares
          </h6>
          <p>
            <a href="#!" class="text-reset">Ação</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Romance</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Drama</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Educação</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Infantil</a>
          </p>
          <p>
            <a href="#!" class="text-reset">História</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Biografia</a>
          </p>
        </div>
     
        <div class="col-md-5 col-lg-4 col-xl-4 mx-auto mb-4">
      
          <h6 class="text-uppercase edit-h6  fw-bold mb-4">
           Atendimento ao Usuário
          </h6>
          <p>
            <a href="#!" class="text-reset">Sobre nós</a>
          </p>
          <p>
            <a href="#!" class="text-reset"><ModalTc/></a>
          </p>
          <p>
            <a href="#!" class="text-reset">Suporte</a>
          </p>
          <p>
            
            <a href="#!" class="text-reset"><ModalPp/> </a>
          </p>
        </div>
      </div>
    
    </div>
  </section>
  <div id='dire-cl' class="text-center p-4" >
    <a  class="text-reset " href="#">© 2023 Swap Book. Todos os direitos reservados. </a>
  </div>
</footer>

  );
};

export default Footer;