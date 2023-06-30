import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../UseContext/UserContext";
import api from "../../../Services/Api";
import Navbar2 from '../../Navbar2/Navbar2';
import MyCards from './MyCards';
import styles from './myCards.module.css';
import { Carousel } from 'react-bootstrap';
import { FcPrevious, FcNext } from 'react-icons/fc';
import { RiEmotionSadLine } from 'react-icons/ri';
import Footer from '../../Footer/Footer';



function MyAnnuncements() {
  const [userData, setUserData] = useContext(UserContext);
  const [productsData, setProductsData] = useState([]);
  const [allmyBooks, setmyAllBooks] = useState([]);

  async function getUsersProduct() {
    const usersProductData = await api.get(`/product/${userData._id}`, {
      headers: {
        auth: userData._id
      }
    });
    const { data } = usersProductData;
    const allmyProducts = data.slice(0, 2);
    setmyAllBooks(allmyProducts);
    setProductsData(data);
  }

  useEffect(() => {
    getUsersProduct();
  }, []);

  return (
    <div>
      <Navbar2 />

      {productsData.length > 0 && (
        <div className="container div-txt">
               <div className="cont-fav-tx">
        <h1 id="tx-fav">Meus anúncios</h1>
        <p id="tx-p-fav">
        Aqui você pode visualizar, editar e gerenciar seus anúncios, incluindo a opção de excluí-los, se desejar.</p>
        </div>
        </div>
      )}  
      <div className="container con-anum">
        {productsData.length > 0 ? (
          <Carousel
            prevIcon={<FcPrevious size={32} />}
            nextIcon={<FcNext size={32} />}
            className="custom-carousel"
            interval={null}
          >
            {productsData.map((product, index) => (
              index % 2 === 0 && (
                <Carousel.Item key={product._id}>
                  <div className="d-flex container edit-cards-my">
                    <MyCards _id={product._id} name={product.name} author={product.author} src={product.src} price={product.price} synopsis={product.synopsis}  createdAt={product.createdAt} />
                    {productsData[index + 1] && (
                      <MyCards _id={productsData[index + 1]._id} name={productsData[index + 1].name} author={productsData[index + 1].author} src={productsData[index + 1].src} price={productsData[index + 1].price} year={productsData[index + 1].year} synopsis={productsData[index + 1].synopsis} />
                    )}
                  </div>
                </Carousel.Item>
              )
            ))}
          </Carousel>
        ) : (
          <div className="col-not-anum">
            <RiEmotionSadLine id='icon-not-anum'/>
            <p>Você não possui anúncios publicados no momento</p></div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default MyAnnuncements;
