import React, { useEffect, useState, useContext } from "react";
import Navbar2 from "../../Navbar2/Navbar2";
import "../Dashboard/Dashboard.css";
import api from "../../../Services/Api";
import { UserContext } from "../../UseContext/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import FormData from "form-data";
import Footer from "../../Footer/Footer";
import InputMask from "react-input-mask";
import ModalTroca from "../../Modal/ModalTroca";
import ModalMapa from "../../Modal/ModalMapa";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const UpdateBook = () => {
  const [userData, setUserData] = useContext(UserContext);
  const [src, setSrc] = useState("");
  const [form, setForm] = useState({
    name: "",
    author: "",
    year: "",
    price: "",
    synopsis: "",
    state: "",
    category: "",
    allowTrade: false,
    showOnMap: false,
  });
  const navigate = useNavigate();
  const { _id } = useParams();
  const MySwal = withReactContent(Swal);

  async function updateProductHandler(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("author", form.author);
      formData.append("category", form.category);
      formData.append("synopsis", form.synopsis);
      formData.append("year", form.year);
      formData.append("state", form.state);
      formData.append("allowTrade", form.allowTrade);
      formData.append("showOnMap", form.showOnMap);
      formData.append("src", src[0]);

      const response = await api.put(
        `/users/${userData._id}/products/${_id}`,
        formData,
        { headers: { auth: `${userData._id}` } }
      );

      MySwal.fire({
        title: 'Sucesso',
        text: 'Produto Atualizado com sucesso',
        icon: 'success',
        confirmButtonText: 'Ok',
        didOpen: () => {
          MySwal.stopTimer()
        },
      })
      navigate("/meus_anuncios");
    } catch (err) {
      
    }
  }

  async function getProductById() {
    try {
      const response = await api.get(`/product/this/${_id}`);
      const { data } = response;
      setForm({
        name: data.name,
        author: data.author,
        year: data.year,
        price: data.price,
        synopsis: data.synopsis,
        category: data.category,
        state: data.state,
        allowTrade: data.allowTrade,
        showOnMap: data.showOnMap,
      });
    } catch (err) {
      console.log("Erro ao carregar os produtos");
    }
  }

  useEffect(() => {
    getProductById();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar2 />
      <div className="container container01 cont-01">
        <div className="cont-02">
          <form onSubmit={updateProductHandler}>
            <div className="cont-03">
              <h3 className="text-center">Alteração de dados</h3>
              <div className="col-input-check">
                <div className="div-check-edit-1">
                  <div className="checkbox-wrapper-31">
                    <input
                      type="checkbox"
                      value={form.allowTrade}
                      onChange={handleChange}
                    ></input>
                    <svg viewBox="0 0 35.6 35.6">
                      <circle
                        className="background"
                        cx="17.8"
                        cy="17.8"
                        r="17.8"
                      ></circle>
                      <circle
                        className="stroke"
                        cx="17.8"
                        cy="17.8"
                        r="14.37"
                      ></circle>
                      <polyline
                        className="check"
                        points="11.78 18.12 15.55 22.23 25.17 12.87"
                      ></polyline>
                    </svg>
                  </div>
                  <label htmlFor="allowTrade">Permitir Trocas</label>
                  <ModalTroca />
                </div>
                <div className="div-check-edit-2">
                  <div className="checkbox-wrapper-31">
                    <input
                      type="checkbox"
                      value={form.showOnMap}
                      onChange={handleChange}
                    ></input>
                    <svg viewBox="0 0 35.6 35.6">
                      <circle
                        className="background"
                        cx="17.8"
                        cy="17.8"
                        r="17.8"
                      ></circle>
                      <circle
                        className="stroke"
                        cx="17.8"
                        cy="17.8"
                        r="14.37"
                      ></circle>
                      <polyline
                        className="check"
                        points="11.78 18.12 15.55 22.23 25.17 12.87"
                      ></polyline>
                    </svg>
                  </div>
                  <label htmlFor="showOnMap">Mostrar no Mapa</label>
                  <ModalMapa />
                </div>
              </div>
              <div className="col-input-01">
                <input
                  type="text"
                  className="form-control input-edit"
                  placeholder="Nome do Livro"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  className="form-control input-edit"
                  placeholder="Autor"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                />
              </div>
              <div className="col-input-02">
                <textarea
                  className="form-control sino-edit"
                  type="text"
                  placeholder="Sinopse"
                  name="synopsis"
                  value={form.synopsis}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="col-input-03">
                <InputMask
                  mask="9999"
                  maskPlaceholder=""
                  className="form-control input-edit"
                  placeholder="Ano"
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  className="form-control input-edit"
                  placeholder="Preço"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                />
                <select
                  className="form-control edit-select"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option value="Generico">Categorias</option>
                  <option value="Ficção">Ficção</option>
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
                <select
                  className="form-control edit-select"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                >
                  <option>Estado do Livro</option>
                  <option value="Novo">Novo</option>
                  <option value="MuitoBom">Muito Bom</option>
                  <option value="Bom">Bom</option>
                  <option value="Regular">Regular</option>
                  <option value="Ruim">Ruim</option>
                </select>
              </div>
              <div className="col-input-04">
                <div className="input-wrapper">
                  <input
                    type="file"
                    multiple
                    onChange={(e) => setSrc(e.target.files)}
                  />
                  <span className="btn-preview">Escolher Imagem</span>
                </div>
                {src && (
                  <div className="preview-wrapper">
                    {Array.from(src).map((file) => (
                      <img
                        key={file.name}
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                      />
                    ))}
                  </div>
                )}
              </div>
              <button type="submit" className="btn btn-form-edit">
                Confirmar Alteração
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdateBook;
