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
              <option value="Bibliografia">Bibliografia</option>
              <option value="Terror">Terror</option>
              <option value="Fantasia">Fantasia</option>
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


/* <section className="input-section">
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
</section>*/


/*
   <div class="container full-df">
          
          <section class="panel panel-default">
          <div class="panel-heading"> 
          <h3 class="panel-title">Anuncie seus Livros</h3> 
          </div> 
          <div class="panel-body">
            
          <form action="designer-finish.html" class="form-horizontal" role="form">

          <div class="form-group">
            <label for="name" class="col-sm-3 control-label">Usuario</label>
            <div class="col-sm-9">
              <label class="radio-inline">
              <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"></input> Usuario Comum 
            </label>
            <label class="radio-inline">
              <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"></input> Usuario Pj
            </label>
            </div>
          </div> 

            <div class="form-group">
              <label for="name" class="col-sm-3 control-label">Título do Livro</label>
              <div class="col-sm-12">
                <input type="text" className="form-control" onChange={(e) => setProductName(e.target.value)} placeholder="Nome do Livro" value={productName}></input>
              </div>
            </div>
            <div class="form-group">
              <label for="name" class="col-sm-3 control-label">Autor</label>
              <div class="col-sm-12">
                <input type="text" class="form-control"  placeholder="Autor" value={autorProduct} onChange={(e) => setAutorProduct(e.target.value)}></input>
              </div>
            </div> 
            <div class="form-group">
              <label for="about" class="col-sm-3 control-label">Sinopse</label>
              <div class="col-sm-12">
                <textarea class="form-control" type="text" onChange={(e) => setSinopseProduct(e.target.value)} ></textarea>
              </div>
            </div> 
            
            <div class="form-group col-sm-12 form-edit-gp">
              
              <div class="col-sm-3"> 
              <label class="control-label small" for="date_start">Ano: </label>
              <input  class="form-control" type="number" placeholder="Ano" onChange={(e) => setProductYear(e.target.value)}></input>
              </div>
            <div class="col-sm-3">   
              <label class="control-label small" for="date_finish">Preço:</label>
              <input  class="form-control" type="number"  placeholder="Preço" onChange={(e) => setProductPrice(e.target.value)} ></input>
              </div>
              <div className="col-sm-3 ">
              <select className="form-control" 
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
              <option value="Infantil">Infantil</option>
              <option value="Educação">Educação</option>
            </select>
              </div>
            </div> 
            <div class="form-group">
              <label for="name" class="col-sm-3 control-label">Insira a Imagem do Livro</label>
            
            <div class="col-sm-3">
            <div className="input-wrapper">
                  <input type="file" multiple onChange={(e) => setSrc(e.target.files)} />
                  <span className="btn-preview">Escolher arquivo</span>
                </div>
                {src && (
                  <div className="preview-wrapper">
                    {Array.from(src).map((file) => (
                      <img key={file.name} id="img-preview" src={URL.createObjectURL(file)} alt={file.name} />
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
        </section>
</div> 

*/