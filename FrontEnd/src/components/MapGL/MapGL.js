import React from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { useState, useEffect } from "react";
import api from "../../Services/Api";
import Cards from "../Cards/Cards";
import Navbar2 from "../Navbar2/Navbar2";
import Footer from "../Footer/Footer";
import ReactMapGL from "react-map-gl";
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it
import "./MapGL.css"
import BookModal from "../BookModal/BookModal";
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;



function App() {
  const [intProducts, setIntProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [searchProducts, setSearchProducts] = useState("");
  const [brincadeira, setsetBrincadeira] = useState([]);
    const closeShow = () => {
      setSelectedProduct(null);
    };

  const handleShow = true;



  async function getProducts() {
    
    try {
      
      const Products = await api.get(`/product/`);
      const { data } = Products;
      setsetBrincadeira(data)
      const filteredProducts = brincadeira.filter((product) =>
      product.name.toLowerCase().includes(searchProducts.toLocaleLowerCase())
    )
      if(searchProducts.length == 0){
        setIntProducts(data)
        }else{
          setIntProducts(filteredProducts)
        }
    } catch (err) {
    }
  }

  useEffect(() => {
    getProducts();
  }, [brincadeira]);


  return (<>
    <Navbar2 setSearchProducts={setSearchProducts}/>
    <Map
      initialViewState={{
        latitude: -12.255232,
        longitude: -38.9513216,
        zoom: 12,
      }}
      style={{ width: window.innerWidth, height: window.innerHeight}}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      mapboxAccessToken="pk.eyJ1Ijoic2lsYXNtYXRvcyIsImEiOiJjbGc3ZGk1bHAwM3g1M2VwOXkzcDJocnFuIn0.65mSwnqFVa_SlKp_rPSuEw"
    >

      {intProducts.map((product) => (
        product.showOnMap ? (
          <Marker
            key={product._id}
            latitude={product.location.coordinates[0]}
            longitude={product.location.coordinates[1]}
          >
            <div className="Marker">
              <button
                className="btn btn-primary "
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedProduct(product);
                }}
              >
                {product.name}
              </button>
            </div>
          </Marker>
        ) : null
      ))}
      
      {selectedProduct && (
        <BookModal
          book={selectedProduct}
          onClose={closeShow}
          show={true}
        />
      )}

      {/* {selectedProduct? (
        <Popup
          latitude={selectedProduct.location.coordinates[0]}
          longitude={selectedProduct.location.coordinates[1]}
          onClose={() => {
            setSelectedProduct(null);
          }}
        >
         
          <Cards
          key={selectedProduct._id}
            _id={selectedProduct._id}
            src={selectedProduct.src}
            name={selectedProduct.name}
            price={selectedProduct.price}
            userName={selectedProduct.user.name}
            userWhats={selectedProduct.user.whatsapp}
          />
        </Popup>
      ) : null} */}

   
    </Map>
   
    </>

  );
}

export default App;
