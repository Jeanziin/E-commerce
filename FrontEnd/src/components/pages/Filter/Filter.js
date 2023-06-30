import "../Filter/Filter.css";
import React, { useEffect, useState } from "react";
import Navbar2 from "../../Navbar2/Navbar2";
import Cards from "../../Cards/Cards";
import api from "../../../Services/Api";
import Loader from "../../loading/Loader";
import { RiEmotionSadLine } from "react-icons/ri";

const BookFilter = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [dependencies, setDependencies] = useState();
  const [sliderValue, setSliderValue] = useState(0);
  const [priceFilter, setPriceFilter] = useState([]);
  const [state, setState] = useState([]);

  async function getProducts() {
    try {
      const Products = await api.get(`/product/`);
      const { data } = Products;
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.log("Erro ao carregar os produtos");
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  function getSearchProducts(name) {
    const filteredProducts = products.filter((product) =>
      product.category.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredData(filteredProducts);
    setDependencies(true);

    const checkboxes = document.querySelectorAll(".ui-checkbox");
    checkboxes.forEach((checkbox) => {
      if (checkbox.value !== name) {
        checkbox.checked = false;
      }
    });
  }

  function getPriceProducts(price) {
    const filteredProducts = products.filter(
      (product) => parseFloat(product.price) <= parseFloat(price)
    );
    setPriceFilter(filteredProducts);
  }

  function getState(name) {
    const filteredProducts = products.filter((product) =>
      product.state.toLowerCase().includes(name.toLowerCase())
    );
    setState(filteredProducts);
  }

  return (
    <>
      <Navbar2 />
      <div className="container cont-filter">
        <div className="row">
          <div className="col-12 col-md-4 col-xl-3">
            {/* Coluna dos inputs de filtragem */}
            <div className="filters-container">
         
            <div clasName="filter-genero">
              <h5 className="tx-filter">Filtro por Gêneros</h5>
              <label  class="container">
              <input  class="ui-checkbox" id="check-edit" type="checkbox" value="" onClick={(e)=>{setDependencies(false)}}/>
              Todos
              <span class="checkmark"></span>
            </label>
            <label  class="container ">
              <input class="ui-checkbox" id="check-edit" type="checkbox" value="Historia" onClick={(e)=>{getSearchProducts(e.target.value)}}/>
              Historia
              <span class="checkmark"></span>
            </label>
            <label class="container">
              <input class="ui-checkbox" id="check-edit" type="checkbox" value="Terror" onClick={(e)=>{getSearchProducts(e.target.value)}} />
              Terror
              <span class="checkmark"></span>
            </label>
            <label class="container">
              <input class="ui-checkbox" id="check-edit" type="checkbox" value="Romance" onClick={(e)=>{getSearchProducts(e.target.value)}}/>
            Romance
              <span class="checkmark"></span>
            </label>
            <label class="container">
              <input class="ui-checkbox" id="check-edit" type="checkbox" value="Ficção" onClick={(e)=>{getSearchProducts(e.target.value)}}/>
            Ficção
              <span class="checkmark"></span>
            </label>
            <label class="container">
              <input class="ui-checkbox" id="check-edit" type="checkbox" value="Biografia" onClick={(e)=>{getSearchProducts(e.target.value)}} />
              Biografia
              <span class="checkmark"></span>
            </label>
            <label class="container">
              <input class="ui-checkbox" id="check-edit" type="checkbox" value="Estudos" onClick={(e)=>{getSearchProducts(e.target.value)}} />
                Estudos             
              <span class="checkmark"></span>
            </label>
            </div>
            
            <div className="filter-slide">
            <h5 className="tx-filter">Filtre pelo preço</h5>
            <div className="Slider">
              <input
                className="Slider_input mt-3"
                type="range"
                id="volume"
                name="volume"
                min="0"
                max="1000"
                onChange={(e)=>{setSliderValue(e.target.value)}} 
                onClick={(e)=>getPriceProducts(e.target.value)}
                />
                <div className=" mb-5"> 0 - {sliderValue}</div>
            </div>
          </div>
          <div className="filter-estado">
            <div>
              <h5 className="tx-filter">Filtro por Estado</h5>
            </div>
            <label class="container">
              <input class="ui-checkbox" id="check-edit" type="checkbox" value="Novo" onClick={(e)=>{getState(e.target.value)}}/>
              Novo
              <span class="checkmark"></span>
            </label>
            <label class="container">
              <input class="ui-checkbox" id="check-edit" type="checkbox" value="Muito bom" onClick={(e)=>{getState(e.target.value)}}/>
              Muito Bom
              <span class="checkmark"></span>
            </label>
            <label class="container">
              <input class="ui-checkbox" id="check-edit" type="checkbox" value="Bom" onClick={(e)=>{getState(e.target.value)}}/>
              Bom
              <span class="checkmark"></span>
            </label>
            <label class="container">
              <input class="ui-checkbox" id="check-edit" type="checkbox" value="Regular" onClick={(e)=>{getState(e.target.value)}}/>
              Regular
              <span class="checkmark"></span>
            </label>
            <label class="container">
              <input class="ui-checkbox" id="check-edit" type="checkbox" value="Ruim" onClick={(e)=>{getState(e.target.value)}}/>
              Ruim
              <span class="checkmark"></span>
            </label>
          </div>
   




                 
            </div>
            
          </div>
          <div className="col-12 col-md-8 col-xl-9">
            {/* Coluna maior para exibir os cards */}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
              {loading ? (
                <Loader />
              ) : (
                <>
                  {state.length === 0 && !dependencies && priceFilter.length === 0 ? (
                    products.map((product) => (
                      <div className="col mb-4">
                        <div className="card-filter">
                          <Cards
                            key={product._id}
                            name={product.name}
                            _id={product._id}
                            price={product.price}
                            author={product.author}
                            synopsis={product.synopsis}
                            src={product.src}
                            obj={product}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      {priceFilter.length > 0 ? (
                        priceFilter.map((product) => (
                          <div className="col mb-4">
                            <div className="card-filter">
                              <Cards
                                key={product._id}
                                name={product.name}
                                _id={product._id}
                                price={product.price}
                                author={product.author}
                                synopsis={product.synopsis}
                                src={product.src}
                                obj={product}
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <>
                          {dependencies ? (
                            filteredData.map((product) => (
                              <div className="col mb-4">
                                <div className="card-filter">
                                  <Cards
                                    key={product._id}
                                    name={product.name}
                                    _id={product._id}
                                    price={product.price}
                                    author={product.author}
                                    synopsis={product.synopsis}
                                    src={product.src}
                                    obj={product}
                                  />
                                </div>
                              </div>
                            ))
                          ) : (
                            <>
                              {state.length > 0 ? (
                                state.map((product) => (
                                  <div className="col mb-4">
                                    <div className="card-filter">
                                      <Cards
                                        key={product._id}
                                        name={product.name}
                                        _id={product._id}
                                        price={product.price}
                                        author={product.author}
                                        synopsis={product.synopsis}
                                        src={product.src}
                                        obj={product}
                                      />
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="col mb-4">
                                  <div className="card-filter">
                                    <RiEmotionSadLine id="icon-not-anum" />
                                    <p>Você não possui livros favoritados no momento</p>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookFilter;
