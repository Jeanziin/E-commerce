import React from "react";
import Navbar2 from "../../Navbar2/Navbar2";
import "./Dashboard.css";
import { useState, useContext } from "react";
import api from "../../../Services/Api";
import { UserContext } from "../../UseContext/UserContext";
import { useNavigate } from "react-router-dom";
import FormData from 'form-data'
import Footer from "../../Footer/Footer";
import {BsInfoCircleFill} from 'react-icons/bs';
import ModalAvs from "../../Modal/ModalAvs";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import InputMask from 'react-input-mask';
import ModalTroca from "../../Modal/ModalTroca";
import ModalMapa from "../../Modal/ModalMapa";
const Dashboard = () => {
  const [userData, setUserData] = useContext(UserContext);
  const [productName, setProductName] = useState('')
  const [productYear, setProductYear] = useState('')
  const [categoria, setCategoria] = useState('')
  const [autorProduct, setAutorProduct] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [sisnopseProduct, setSinopseProduct] = useState('')
  const [src, setSrc] = useState('')
  const [state, setState] = useState('')
  const [allowTrade, setAllowTrade] = useState(false)
  const [showOnMap, setShowOnMap] = useState(false)
  const navigate = useNavigate()
  const MySwal = withReactContent(Swal)

  const handlePriceChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^\d]/g, '');
    if (numericValue.length === 4 || numericValue.length === 5) {
      const formattedValue = numericValue.slice(0, -2) + '.' + numericValue.slice(-2);
      setProductPrice(formattedValue);
    } else {
      setProductPrice(numericValue);
    }
  };
  async function newProducthandler(e){
    e.preventDefault();
    try{
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('price', productPrice);
      formData.append('author', autorProduct);
      formData.append('category', categoria);
      formData.append('synopsis', sisnopseProduct);
      formData.append('year', productYear);
      formData.append('src', src[0]);
      formData.append('state', state);
      formData.append('allowTrade', allowTrade);
      formData.append('showOnMap', showOnMap);
      const response = await api.post(`${userData._id}/product`, formData, 
      { headers: { auth: `${userData._id}` }});
      MySwal.fire({
        title: 'Sucesso',
        text: 'Produto Cadastrado com sucesso',
        icon: 'success',
        confirmButtonText: 'Ok',
        didOpen: () => {
          MySwal.stopTimer()
        },
      })
      navigate('/meus_anuncios')
    }catch(err){
      MySwal.fire({
        title: 'Erro ao anunciar',
        text: 'verifique se todos os campos estão preeenchidos',
        icon: 'error',
        confirmButtonText: 'Ok',
        didOpen: () => {
         
          MySwal.stopTimer()
        },
      })
    }
  }
  return (
    <>
      <Navbar2 />
      <ModalAvs/>
      <div className="container container01 cont-01">
        <div className="cont-02">
          <form>
          <div className="cont-03">
            <h3 className="text-center">Adicione seus Livros</h3>
            <div className="col-input-check">
              <div className="div-check-edit-1">
              <div class="checkbox-wrapper-31">
                   <input checked={allowTrade} onChange={(e) => setAllowTrade(e.target.checked)} type="checkbox"></input>
                      <svg viewBox="0 0 35.6 35.6">
                        <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                        <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                        <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                      </svg>
                </div>
                <label for="allowTrade">Permitir Trocas</label><ModalTroca/>
              </div>
              <div className="div-check-edit-2">
              <div class="checkbox-wrapper-31">
                   <input checked={showOnMap} onChange={(e) => setShowOnMap(e.target.checked)} type="checkbox"></input>
                      <svg viewBox="0 0 35.6 35.6">
                        <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                        <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                        <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                      </svg>
                </div>
                  <label for="showOnMap">Mostrar no Mapa</label><ModalMapa/>
              </div>
            </div>
            <div className="col-input-01">
            <input type="text" className="form-control input-edit" onChange={(e) => setProductName(e.target.value)} placeholder="Nome do Livro" value={productName} />
            <input type="text" className="form-control input-edit" placeholder="Autor" value={autorProduct} onChange={(e) => setAutorProduct(e.target.value)} />
            </div>
            <div className="col-input-02">
            <textarea class="form-control sino-edit" type="text" onChange={(e) => setSinopseProduct(e.target.value)} placeholder="Sinopse" ></textarea>
            </div>
            <div className="col-input-03">
            <InputMask mask="9999" maskPlaceholder="" className="form-control input-edit" placeholder="Ano" value={productYear} onChange={(e) => setProductYear(e.target.value)} />
            <input
        type="text"
        className="form-control input-edit"
        placeholder="Preço"
        value={productPrice}
        onChange={handlePriceChange}
      />
            <select className="form-control edit-select" 
            onChange={(e)=> 
            setCategoria(e.target.value)}
            value={categoria}
             name="Categorias">
              <option value="Generico"selected> Categórias </option>
              <option value="Ficção" > Ficção</option>
              <option value="Ação">Ação</option>
              <option value="Suspense">Suspense</option>
              <option value="Historia">História</option>
              <option value="Biografia">Biografia</option>
              <option value="Terror">Terror</option>
              <option value="Fantasia">Fantasia</option>
              <option value="Escolar">Escolar</option>
              <option value="Estudos">Estudos</option>
              <option value="Infantil">Infantil</option>
              <option value="Drama">Drama</option>
              <option value="AutoAjuda">Auto Ajuda</option>
              <option value="AutoBiografia">Auto Biografia</option>
              <option value="Romance">Romance</option>
            </select>
            <select className="form-control edit-select" 
            onChange={(e)=> 
            setState(e.target.value)}
            value={state}
             name="Estado">
              <option selected>Estado do Livro</option>
              <option value="Novo" > Novo</option>
              <option value="MuitoBom">Muito Bom</option>
              <option value="Bom">Bom</option>
              <option value="Regular">Regular</option>
              <option value="Ruim">Ruim</option>
            </select>
            </div>
        
        <div className="col-input-04">
                 <div className="input-wrapper">
                  <input  type="file" multiple onChange={(e) => setSrc(e.target.files)} />
                  <span className="btn-preview">Escolher Imagem</span>
                 </div>
                 {src && (
                 <div className="preview-wrapper">
                    {Array.from(src).map((file) => (
                      <img key={file.name} src={URL.createObjectURL(file)} alt={file.name} />
                    ))}
             </div>
             )}
            </div>
         
            <button className="btn btn-form-edit" onClick={newProducthandler}>
          Adicionar Livro
        </button>
           
          </div>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Dashboard;
