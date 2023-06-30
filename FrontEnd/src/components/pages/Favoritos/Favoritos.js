import React, { useEffect, useState } from "react";
import api from "../../../Services/Api";
import Cards from "../../Cards/Cards.js";
import "../Favoritos/Favoritos.css";
import Navbar2 from "../../Navbar2/Navbar2";
import Footer from "../../Footer/Footer";
import Carousel from "react-bootstrap/Carousel";
import { RiEmotionSadLine } from "react-icons/ri";
import { FcPrevious, FcNext } from "react-icons/fc";
import Loader from "../../loading/Loader.js";

function Favoritos() {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
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
    fetchFavoriteProducts();
  }, []);

  async function fetchFavoriteProducts() {
    try {
      const userId = localStorage.getItem("id");
      const response = await api.get(`/user/${userId}/favorites`);
      setFavoriteProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Navbar2 />
      <div className="cont-fav container">
        <div className="cont-fav-tx">
          <h1 id="tx-fav">Meus Favoritos</h1>
          <p id="tx-p-fav">Veja os livros favoritados por você.</p>
        </div>
        {favoriteProducts.length === 0 ? (
          <div className="col-not-anum">
            <RiEmotionSadLine id="icon-not-anum" />
            <p>Você não possui livros favoritados no momento</p>
          </div>
        ) : (
          <div className="container">
            <Carousel
              className="my-carousel"
              prevIcon={<FcPrevious />}
              nextIcon={<FcNext />}
            >
              {favoriteProducts
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
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Favoritos;
