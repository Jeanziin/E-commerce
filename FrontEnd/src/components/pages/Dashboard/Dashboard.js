import React from "react";
import Navbar2 from "../../Navbar2/Navbar2";
import "./Dashboard.css";
import { useState, useContext } from "react";
import api from "../../../Services/Api";
import { UserContext } from "../../UseContext/UserContext";
import { useNavigate } from "react-router-dom";
import FormData from 'form-data'
import Footer from "../../Footer/Footer";



const Dashboard = () => {

  const [userData, setUserData] = useContext(UserContext);
  const [productName, setProductName] = useState('')
  const [productYear, setProductYear] = useState(0)
  const [categoria, setCategoria] = useState('')
  const [autorProduct, setAutorProduct] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  const [sisnopseProduct, setSinopseProduct] = useState('')
  const [src, setSrc] = useState('')
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
      <section className="input-section">
  <form className="">
    <h1 className="text-center"> Adicionar um Produto</h1>
    <div className="col-12 container">
    <div className="row ">
    <div className="col-6 edit-col">
  <label className="text-img">Insira uma Imagem:</label>
  <div className="input-wrapper">
    <input type="file" multiple onChange={(e) => setSrc(e.target.files)} />
    <span className="btn-preview">Escolher arquivo</span>
  </div>
  {src && (
    <div className="preview-wrapper">
      {Array.from(src).map((file) => (
        <img key={file.name} src={URL.createObjectURL(file)} alt={file.name} />
      ))}
    </div>
  )}
</div>


      <div className="col-md-6 products-inputs">
        <input type="text" className="input-edit" onChange={(e) => setProductName(e.target.value)} placeholder="Nome do Livro" value={productName} />

        <input type="number" className="input-edit" placeholder="Ano" onChange={(e) => setProductYear(e.target.value)} />

        <input type="text" className="input-edit" placeholder="Autor" value={autorProduct} onChange={(e) => setAutorProduct(e.target.value)} />

        <select className="mb-3 edit-select" 
            onChange={(e)=> 
            setCategoria(e.target.value)}
            value={categoria}
             name="Categorias">
              <option value="Romance"selected> Categória </option>
              <option value="Ficção" > Ficção</option>
              <option value="Ação">Ação</option>
              <option value="Suspense">Suspense</option>
              <option value="Historia">História</option>
              <option value="Bibliografia">Bibliografia</option>
              <option value="Terror">Terror</option>
              <option value="Fantasia">Fantasia</option>
            </select>

        <input type="number" className="input-edit" placeholder="Preço" onChange={(e) => setProductPrice(e.target.value)} />

        <input type="text" className="input-edit" placeholder="Sinopse" onChange={(e) => setSinopseProduct(e.target.value)} />

        <button className="btn btn-form-edit" onClick={newProducthandler}>
          Adicionar Livro
        </button>
      </div>
    </div>
    </div>
  </form>
</section>
<Footer/>
    </>
  );
};

export default Dashboard;
