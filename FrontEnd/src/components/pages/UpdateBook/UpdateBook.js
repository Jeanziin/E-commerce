import React, { useEffect } from "react";
import Navbar2 from "../../Navbar2/Navbar2";
import "../Dashboard/Dashboard.css";
import { useState, useContext } from "react";
import api from "../../../Services/Api";
import { UserContext } from "../../UseContext/UserContext";
import { useNavigate } from "react-router-dom";
import FormData from "form-data";
import { useParams } from "react-router-dom";
import Footer from "../../Footer/Footer";


const UpdateBook = () => {
  const [userData, setUserData] = useContext(UserContext);
  const [src, setSrc] = useState("");
  const [form, setForm] = useState({
    name: "",
    author: "",
    year: "",
    price: "",
    synopsis: "",
    category: "",
  });
  const navigate = useNavigate();
  const { _id } = useParams();

  async function updateProducthandler(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("author", form.author);
      formData.append("category", form.category);
      formData.append("synopsis", form.synopsis);
      formData.append("year", form.year);
      formData.append("src", src[0]);
      const response = await api.put(
        `/users/${userData._id}/products/${_id}`,
        formData,
        { headers: { auth: `${userData._id}` } }
      );
      alert("produto atualizado com sucesso!");
      navigate("/meus_anuncios");
    } catch (err) {
      alert("falha ao atualizar Livro");
    }
  }

  async function getProductsId() {
    try {
      const Products = await api.get(`/product/this/${_id}`);
      const { data } = Products;
      setForm({
        name: data.name,
        author: data.author,
        year: data.year,
        price: data.price,
        synopsis: data.synopsis,
        category: data.category,
      });
      console.log(form)

    } catch (err) {
      console.log("Erro ao carregar os produtos");
    }
  }

  useEffect(() => {
    getProductsId();
  }, [setForm]);

  return (
    <>
      <Navbar2 />
      <section className="input-section">
        <form className="">
          <h1 className="text-center"> Editar um Produto</h1>
          <div className="col-12 container">
            <div className="row ">
              <div className="col-6 edit-col">
                <label className="text-img">Insira uma Imagem:</label>
                <div className="input-wrapper">
                  <input
                    type="file"
                    multiple
                    onChange={(e) => setSrc(e.target.files)}
                  />
                  <span className="btn-preview">Escolher arquivo</span>
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

              <div className="col-md-6 products-inputs">
                <input
                  type="text"
                  className="input-edit"
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  value={form.name}
                  placeholder="Nome do Livro"
                  
                />

                <input
                  type="number"
                  className="input-edit"
                  placeholder="Ano"
                  onChange={(event) =>
                    setForm({ ...form, year: event.target.value })
                  }
                  value={form.year}
                />

                <input
                  type="text"
                  className="input-edit"
                  placeholder="Autor"
                  onChange={(event) =>
                    setForm({ ...form, author: event.target.value })
                  }
                  value={form.author}
                />

                <select
                  className="mb-3 edit-select"
                  onChange={(event) =>
                    setForm({ ...form, category: event.target.value })
                  }
                  value={form.category}
                  name="Categorias"
                >
                  <option value="Romance" selected>
                    {" "}
                    Categória{" "}
                  </option>
                  <option value="Ficção"> Ficção</option>
                  <option value="Ação">Ação</option>
                  <option value="Suspense">Suspense</option>
                  <option value="Historia">História</option>
                  <option value="Bibliografia">Bibliografia</option>
                  <option value="Terror">Terror</option>
                  <option value="Fantasia">Fantasia</option>
                </select>

                <input
                  type="number"
                  className="input-edit"
                  placeholder="Preço"
                  onChange={(event) =>
                    setForm({ ...form, price: event.target.value })
                  }
                  value={form.price}
                />

                <input
                  type="text"
                  className="input-edit"
                  placeholder="Sinopse"
                  onChange={(event) =>
                    setForm({ ...form, synopsis: event.target.value })
                  }
                  value={form.synopsis}
                />

                <button
                  className="btn btn-form-edit"
                  onClick={updateProducthandler}
                >
                  Editar Livro
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

export default UpdateBook;
