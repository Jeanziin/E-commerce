import React from "react";
import Cards from "../../Cards/Cards.js";
import CarouselFadeExample from "../../Carousel/Carousel.js";
import Categorias from "../../Categorias/Categorias.js";
import Navbar2 from "../../Navbar2/Navbar2.js";
import Trotes from "../../Trotes/Trotes.js";
import Footer from "../../Footer/Footer.js";
import api from "../../../Services/Api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../UseContext/UserContext.js";
import { GoLocation } from "react-icons/go";
import { BsBook, BsArrowRightShort } from "react-icons/bs";
import "../Home/Home.css";
import Carousel from "react-bootstrap/Carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FcPrevious, FcNext } from "react-icons/fc";
import Loader from "../../loading/Loader.js";
import { MdLocationOn } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const [index, setIndex] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [productsData, setProductsData] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [searchProducts, setSearchProducts] = useState("");
  const [intProducts, setIntProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [category, setCategory] = useState("");
  const [CategoredProducts, setCategoredProducts] = useState([]);
  const [userData, setUserData] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [usedBooks, setUsedBooks] = useState([]);

  useEffect(() => {
    AOS.init(); // Inicialize o AOS
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    getUserLocation();
  }, []);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  async function getUserLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      { timeout: 10000 }
    );
  }

  useEffect(() => {
    getNearProducts();
  }, [latitude, longitude]);

  async function getNearProducts() {
    try {
      const nearProducts = await api.get(
        `/product/cords?latitude=${latitude}&longitude=${longitude}`
      );
      const { data } = nearProducts;
      const limitedItens = data.slice(0, 100);
      setProductsData(limitedItens);
    } catch (err) {
      console.log("Erro ao carregar os produtos");
    }
  }

  async function getProducts() {
    try {
      const Products = await api.get(`/product/`);
      const { data } = Products;
      const allProducts = data.slice(0, 100);
      setAllBooks(allProducts);
      setIntProducts(data);
      setLoading(true);
    } catch (err) {
      console.log("Erro ao carregar os produtos");
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  function getSearchProducts() {
    const filteredProducts = intProducts.filter((product) =>
      product.name.toLowerCase().includes(searchProducts.toLowerCase())
    );
    setFilteredData(filteredProducts);
  }

  useEffect(() => {
    getSearchProducts();
  }, [searchProducts, allBooks, intProducts]);

  function getCategoryBooks() {
    const CategoredProducts = intProducts.filter((product) =>
      product.category.toLowerCase().includes(category.toLowerCase())
    );
    const categories = CategoredProducts;
    setCategoredProducts(categories);
  }

  useEffect(() => {
    getCategoryBooks();
  }, [allBooks, category, intProducts]);

  return (
    <div>
      <Navbar2 setSearchProducts={setSearchProducts} />
      <div className="">
        {searchProducts ? (
          filteredData ? (
            <div className="container cards d-flex flex-wrap cards-search">
              {filteredData.map((product) => (
                <Cards
                  key={product._id}
                  name={product.name}
                  _id={product._id}
                  price={product.price}
                  author={product.author}
                  synopsis={product.synopsis}
                  src={product.src}
                  obj={product}
                  allowTrade={product.allowTrade}
                  showOnMap={product.showOnMap}
                />
              ))}
            </div>
          ) : (
            "Produto não Encontrado"
          )
        ) : (
          <div>
            <CarouselFadeExample />
            <Categorias setCategory={setCategory} />
            <div className="container">
              {category && (
                <>
                  <h2 data-aos="fade-right" id="edit-h2">
                    {category}
                  </h2>

                  <Carousel
                    className="my-carousel"
                    prevIcon={<FcPrevious />}
                    nextIcon={<FcNext />}
                  >
                    {!loading ? <Loader /> : null}
                    {CategoredProducts.reduce((rows, product, index) => {
                      if (index % (isMobile ? 2 : 5) === 0) rows.push([]);
                      rows[rows.length - 1].push(product);
                      return rows;
                    }, []).map((row, rowIndex) => (
                      <Carousel.Item key={rowIndex}>
                        <div
                          data-aos="fade-up"
                          className="cards text-center d-flex"
                        >
                          {row.map((product) => (
                            <Cards
                              key={product._id}
                              _id={product._id}
                              name={product.name}
                              src={product.src}
                              author={product.author}
                              price={product.price}
                              synopsis={product.synopsis}
                              obj={product}
                              allowTrade={product.allowTrade}
                            />
                          ))}
                        </div>
                      </Carousel.Item>
                    ))}
                  </Carousel>

                  <div className="container btn-run-filter">
                    <Link id="link-filter" to="/filter">
                      <div className="btn-run-filter2">
                        <p>Veja mais</p>
                        <BsArrowRightShort id="icon-filter" />
                      </div>
                    </Link>
                  </div>
                </>
              )}
            </div>

            <div className="container">
              <h2 data-aos="fade-right" id="edit-h2">
                Livros <span>Usados</span>
              </h2>
              <Carousel
                className="my-carousel"
                prevIcon={<FcPrevious />}
                nextIcon={<FcNext />}
              >
                {!loading ? <Loader /> : null}
                {intProducts
                  .reduce((rows, product, index) => {
                    if (index % (isMobile ? 2 : 5) === 0) rows.push([]);
                    rows[rows.length - 1].push(product);
                    return rows;
                  }, [])
                  .map((row, rowIndex) => (
                    <Carousel.Item key={rowIndex}>
                      <div
                        data-aos="fade-up"
                        className="cards text-center d-flex"
                      >
                        {row.map((product) => (
                          <Cards
                            key={product._id}
                            _id={product._id}
                            name={product.name}
                            src={product.src}
                            author={product.author}
                            price={product.price}
                            synopsis={product.synopsis}
                            obj={product}
                            allowTrade={product.allowTrade}
                          />
                        ))}
                      </div>
                    </Carousel.Item>
                  ))}
              </Carousel>

              <div className="container btn-run-filter">
                <Link id="link-filter" to="/filter">
                  <div className="btn-run-filter2">
                    <p>Veja mais</p>
                    <BsArrowRightShort id="icon-filter" />
                  </div>
                </Link>
              </div>
            </div>

            <Trotes />
            <div className="container">
              <h2 data-aos="fade-right" id="edit-h2">
                Veja os Livros Próximos a <span>Você</span>
              </h2>
              {!loading ? <Loader /> : null}
              <Carousel
                className="my-carousel"
                prevIcon={<FcPrevious />}
                nextIcon={<FcNext />}
              >
                {productsData.length === 0 ? (
                  <div className="col-not-location">
                    <MdLocationOn id="icon-not-location" />
                    <p>
                      Habilite a localização para ver os livros próximos a você
                    </p>
                  </div>
                ) : (
                  productsData
                    .reduce((rows, product, index) => {
                      if (index % (isMobile ? 2 : 5) === 0) rows.push([]);
                      rows[rows.length - 1].push(product);
                      return rows;
                    }, [])
                    .map((row, rowIndex) => (
                      <Carousel.Item key={rowIndex}>
                        <div
                          data-aos="fade-right"
                          className="cards text-center d-flex"
                        >
                          {row.map((product) => (
                            <Cards
                              key={product._id}
                              _id={product._id}
                              name={product.name}
                              src={product.src}
                              author={product.author}
                              price={product.price}
                              synopsis={product.synopsis}
                              obj={product}
                              allowTrade={product.allowTrade}
                            />
                          ))}
                        </div>
                      </Carousel.Item>
                    ))
                )}
              </Carousel>
              <div className="container btn-run-filter">
                <Link id="link-filter" to="/filter">
                  <div className="btn-run-filter2">
                    <p>Veja mais</p>
                    <BsArrowRightShort id="icon-filter" />
                  </div>
                </Link>
              </div>
              <div className=" link_map">

                  <Link id="link-tx" to="/map_products">
                    <button className="btn_map link_map">
                      Veja no Mapa <GoLocation id="icon-map" />
                    </button>
                  </Link>
              </div>
            </div>
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
