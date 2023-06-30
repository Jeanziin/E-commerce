import React, { useEffect, useState } from "react";
import Navbar2 from "../../Navbar2/Navbar2";
import styles from "../categories/Categorias.module.css";
import Cards from "../../Cards/Cards";
import api from "../../../Services/Api";
import Loader from "../../loading/Loader";
import { RiEmotionSadLine } from "react-icons/ri";
import '../categories/Categorias.css'

const Categories = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [dependencies, setDependencies] = useState();
  const [sliderValue, setSliderValue] = useState(0);
  const [ priceFilter, setPriceFilter] = useState([]);
  const [ state, setState] = useState([]);
  

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

    const checkboxes = document.querySelectorAll('.ui-checkbox');
    checkboxes.forEach((checkbox) => {
      if (checkbox.value !== name) {
        checkbox.checked = false;
      }
    });
  }
  
  function getPriceProducts(price) {
    
    const filteredProducts = products.filter((product) =>
    parseFloat(product.price) <= parseFloat(price)
    );
    setPriceFilter(filteredProducts);
  }

  function getState(name) {
    
    const filteredProducts = products.filter((product) =>
      product.state.toLowerCase().includes(name.toLowerCase())
    );
    setState(filteredProducts);
    
  }
  console.log(state)
  return (
    <div>
      <Navbar2 />
    <div className="container-fluid">
      <div className="container-fluid">
      <div className={styles.container}>
        <div className={`${styles.filters} fs-5`}>
          <div className={`${styles.generes} select-Categories pb-10`}>
            <div  clasName="">
              <h5>Filtro por Gêneros</h5>
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
          </div>

          <div className="SliderContainer">
            <h5>Filtre pelo preço</h5>
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
          <div className="select-Categories pb-10">
            <div className={`${styles.generes} fs-1 small-tittle `}>
              <h5>Filtro por Estado</h5>
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

        <div className="cont-product">
        <div className="col-card-filter">
  {loading ? <Loader /> : null}
  {state.length === 0 && !dependencies && priceFilter.length === 0 ? (
    products.map((product) => (
      <div className="col-card-filter">
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
    ))
  ) : (
    priceFilter.length > 0 ? (
      priceFilter.map((product) => (
        <div className="col-card-filter">
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
      ))
    ) : (
      dependencies ? (
        filteredData.map((product) => (
          <div className="col-card-filter">
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
        ))
      ) : (
        state.length > 0 ? (
          state.map((product) => (
            <div className="col-card-filter">
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
          ))
        ) : (
          <div className="col-card-filter">
            <RiEmotionSadLine id="icon-not-anum" />
            <p>Você não possui livros favoritados no momento</p>
          </div>
        )
      )
    )
  )}


          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Categories;
