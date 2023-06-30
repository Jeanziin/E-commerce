import React, { useState, useContext, useEffect } from 'react';
import { hash } from 'bcryptjs';
import '../UpdateUser/UpdateUser.css';
import Navbar2 from '../../Navbar2/Navbar2';
import Footer from '../../Footer/Footer';
import { BsShieldLock } from 'react-icons/bs';
import { RiFileUserLine } from 'react-icons/ri';
import { BsShieldFillCheck } from 'react-icons/bs';
import { MdHighlightOff } from 'react-icons/md';
import { GoAlert } from 'react-icons/go';
import { BsCreditCard2Front } from 'react-icons/bs';
import { UserContext } from '../../UseContext/UserContext';
import ModalSecurity from '../../Modal/ModalSecurity';
import api from '../../../Services/Api';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AOS from 'aos';

function UpdateUser() {
  const [divExibida, setDivExibida] = useState('informacoesPessoais');
  const [userData, setUserData] = useContext(UserContext);
  const [userInformations, setUserInformations] = useState([]);
  const [dependencies, setDependencies] = useState(false);
  const MySwal = withReactContent(Swal)
  const [forms, setForms] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    dateBirth: '',
    gender: '',
  });

  async function getUser() {
    const response = await api.get(`user/${userData._id}`);
    const { data } = response;
    setUserInformations(data);
    setDependencies(true);
    setForms({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      dateBirth: data.dateBirth,
      gender: data.gender,
    });
  }
  useEffect(() => {
    AOS.init(); // Inicialize o AOS
  }, []);
  useEffect(() => {
    getUser();
  }, [dependencies]);

  async function updateUserHandler(e) {
    e.preventDefault();
    try {
      const response = await api.put(`/user/${userData._id}`, forms, {
        headers: { auth: `${userData._id}` },
      });
      MySwal.fire({
        title: 'Sucesso!',
        text: 'Dados alterados com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok',
        didOpen: () => {
          MySwal.stopTimer()
        },
      })
    } catch (err) {
      
    }
  }

  async function deleteUserHandler(e) {
    e.preventDefault();
    try {
      const response = await api.delete(`/user/${userData._id}`, {
        headers: { auth: `${userData._id}` },
      });
      
    } catch (err) {
      
    }
  }

  const exibirDiv = (div) => {
    setDivExibida(div);
  };

  return (
    <div className="" style={{ backgroundColor: '#f2f2f2' }}>
      <Navbar2 />
      <div className="container ">
        <div className="container-Up">
          <div className="botoes-Up">
            <button
              id="btn-Up"
              className={divExibida === 'informacoesPessoais' ? 'botaoAtivo' : ''}
              onClick={() => exibirDiv('informacoesPessoais')}
            >
              <RiFileUserLine id="icon-up" /> Informações Pessoais
            </button>
            <button
              id="btn-Up"
              className={divExibida === 'segurancaPrivacidade' ? 'botaoAtivo' : ''}
              onClick={() => exibirDiv('segurancaPrivacidade')}
            >
              <BsShieldLock id="icon-up" /> Segurança e Privacidade
            </button>
            <button
              id="btn-Up"
              className={divExibida === 'assinaturas' ? 'botaoAtivo' : ''}
              onClick={() => exibirDiv('assinaturas')}
            >
              <BsCreditCard2Front id="icon-up" /> Assinaturas
            </button>
          </div>

          <div className="conteudo-Up">
            {divExibida === 'informacoesPessoais' && (
              <div data-aos="flip-up" className="container itens-cont-up">
                <div className="itens-up">
                  <h5 className="tx-up">Meu Cadastro</h5>
                  <p className="tx-p-up">Configure seu Cadastro.</p>
                  <div className="itens-dados-up">
                    <h6>Dados da conta</h6>
                    <p id="pr-up">Nome de Usuário</p>
                    <input
                      className="input-up"
                      onChange={(event) =>
                        setForms({ ...forms, name: event.target.value })
                      }
                      value={forms.name}
                    />
                    <p id="pr-up">Gênero</p>
                    <form>
                      <div className="radio-div">
                        <label id="tm-lb">
                          <input
                            type="radio"
                            className="radio-up"
                            name="gender"
                            onChange={(event) =>
                              setForms({ ...forms, gender: event.target.value })
                            }
                            value="masculino"
                            checked={forms.gender === 'masculino'}
                          />
                          Masculino
                        </label>
                        <label id="tm-lb">
                          <input
                            type="radio"
                            className="radio-up"
                            name="gender"
                            onChange={(event) =>
                              setForms({ ...forms, gender: event.target.value })
                            }
                            value="feminino"
                            checked={forms.gender === 'feminino'}
                          />
                          Feminino
                        </label>
                        <label id="tm-lb">
                          <input
                            type="radio"
                            className="radio-up"
                            onChange={(event) =>
                              setForms({ ...forms, gender: event.target.value })
                            }
                            name="gender"
                            value="outro"
                            checked={forms.gender === 'outro'}
                          />
                          Outro
                        </label>
                      </div>
                    </form>
                    <div className="itens2-up">
                      <p id="pr-up">Email</p>
                      <input
                        className="input-up"
                        onChange={(event) =>
                          setForms({ ...forms, email: event.target.value })
                        }
                        value={forms.email}
                      />
                    </div>
                    <div className="">
                      <p id="pr-up">Telefone</p>
                      <input
                        className="input-up"
                        onChange={(event) =>
                          setForms({ ...forms, phone: event.target.value })
                        }
                        value={forms.phone}
                      />
                    </div>
                    <p id="tp-up">
                      Tipo de Conta:<span id="sp-up">Particular</span>
                    </p>
                    <button className="btn-up" onClick={updateUserHandler}>
                      Salvar Alterações
                    </button>
                  </div>
                  <div className="container container-up-2">
                    <div className="cont-itens-2">
                      <div className="text-icon-cont">
                        <GoAlert id="icon-Def" />
                        <h6>Excluir sua conta</h6>
                      </div>
                      <button className="btn-def" onClick={deleteUserHandler}>
                        Excluir
                      </button>
                    </div>
                    <p id="tx-def">
                      Dados da sua conta, anúncios e perfil serão excluídos definitivamente
                      <br />
                      Não será possível recuperar sua conta.
                    </p>
                  </div>
                </div>
              </div>
            )}
            {divExibida === 'segurancaPrivacidade' && (
              <div>
                <div data-aos="flip-up" className="container itens-cont-up">
                  <div className="itens-up">
                    <h5 className="tx-up">Segurança e Privacidade</h5>
                    <p className="tx-p-up">Aumente a segurança e tenha o controle da sua conta</p>
                    <div className="itens-dados-up-2">
                      <div className="cont-PeS">
                        <BsShieldFillCheck id="icon-PeS" />
                        <div className="container cont-tx-PeS">
                          <p className="tx-PeS">
                            Entenda como o Swap Book cuida da sua segurança e veja dicas de como
                            <br /> fazer uma negociação segura.
                          </p>
                          <a className="btn-SeP">
                            <ModalSecurity />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="itens-dados-up-2">
                      <h5>Alteração de senha</h5>
                      <p className="tx-p-up">
                        Escolha uma senha forte que você não esteja usando em nenhum outro lugar.
                        <br />
                        Troque sua senha a cada 6 meses para aumentar a segurança da sua conta.
                      </p>
                      <div className="itens-dados-sen">
                        <a id="btn-new-senha" href="">
                          <Link id="btn-new-senha-link" to="/newpassword">
                            Alterar Senha
                          </Link>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {divExibida === 'assinaturas' && (
              <div>
                <div data-aos="flip-up" className="container itens-cont-up">
                  <div className="itens-up">
                    <h5 className="tx-up">Assinaturas</h5>
                    <p className="tx-p-up">Gerencie as suas assinaturas</p>
                    <div className="itens-dados-up-2">
                      <div className='assim-edit'>
                      <div> < MdHighlightOff id='icon-assim'/></div>
                      <p>Sua conta ainda não possui nenhuma assinatura. Para você conhecer os nossos planos clique em <span><a href='#'>Saber Mais</a></span> </p>
                      </div>
                  </div>
                 </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UpdateUser;
