import React from "react";
import Navbar2 from "../../Navbar2/Navbar2";
import "./Dashboard.css";
import { useState, useContext } from "react";
import api from "../../../Services/Api";
import { UserContext } from "../../UseContext/UserContext";
import { useNavigate } from "react-router-dom";
import FormData from 'form-data'
import Footer from "../../Footer/Footer";
import { FaBook} from 'react-icons/fa';
import ModalAvs from "../../Modal/ModalAvs";




const Dashboard = () => {

  const [userData, setUserData] = useContext(UserContext);
  const [productName, setProductName] = useState('')
  const [productYear, setProductYear] = useState(0)
  const [categoria, setCategoria] = useState('')
  const [autorProduct, setAutorProduct] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  const [sisnopseProduct, setSinopseProduct] = useState('')
  const [src, setSrc] = useState('')
  const [state, setState] = useState('')
  const navigate = useNavigate()

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
      const response = await api.post(`${userData._id}/product`, formData, { headers: { auth: `${userData._id}` }});
      alert("produto cadastrado com sucesso!")
      navigate('/meus_anuncios')
    }catch(err){
      alert("falha ao adicionar Livro")
    
      

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
            <div className="col-input-00">
            <input type="checkbox" id="cliente-pj" name="cliente" value="pj" />
            <label for="cliente-pj"><p>Cliente PJ</p></label>
            <input type="checkbox" id="cliente-fisico" name="cliente" value="fisico" />
            <label for="cliente-fisico"><p>Cliente Físico</p></label>
            </div>
            <div className="col-input-01">
            <input type="text" className="form-control input-edit" onChange={(e) => setProductName(e.target.value)} placeholder="Nome do Livro" value={productName} />
            <input type="text" className="form-control input-edit" placeholder="Autor" value={autorProduct} onChange={(e) => setAutorProduct(e.target.value)} />
            </div>
            <div className="col-input-02">
            <textarea class="form-control sino-edit" type="text" onChange={(e) => setSinopseProduct(e.target.value)} placeholder="Sinopse" ></textarea>
            </div>
            <div className="col-input-03">
            <input type="number" className="form-control input-edit" placeholder="Ano" onChange={(e) => setProductYear(e.target.value)} />
            <input type="number" className="form-control input-edit" placeholder="Preço" onChange={(e) => setProductPrice(e.target.value)} />
            <select className="form-control edit-select" 
            onChange={(e)=> 
            setCategoria(e.target.value)}
            value={categoria}
             name="Categorias">
              <option value="Romance"selected> Categórias </option>
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
            </select>
            <select className="form-control edit-select" 
            onChange={(e)=> 
            setState(e.target.value)}
            value={state}
             name="Estado">
              <option selected>Estado do Livro</option>
              <option value="Novo" > Novo</option>
              <option value="ComoNovo">Como Novo</option>
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
            <div className="col-input-05">
            <button className="btn btn-form-edit" onClick={newProducthandler}>
          Adicionar Livro
        </button>
            </div>
          </div>
          
          </form>
        </div>
      </div>

      <Footer/>
    </>
  );
};

export default Dashboard;


