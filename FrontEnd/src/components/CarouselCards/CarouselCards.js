import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Cards from "../Cards/Cards";

function CarouselCards({ data }) {
    
    const dataSlice = data.slice(5,10)
  return (
    <Carousel>
      <Carousel.Item interval={1000}>
        <div className="d-flex">
          {data.slice(0, 5).map((product) => (
            <Cards
              key={product._id}
              src={product.src}
              _id={product._id}
              name={product.name}
              price={product.price}
              synopsis={product.synopsis}
            />
          ))}
        </div>
      </Carousel.Item>
      {dataSlice.length > 0 ? (
        <Carousel.Item interval={1000}>
          <div className="d-flex">
            {data.slice(5,10).map((product) => (
              <Cards
                key={product._id}
                _id={product._id}
                src={product.src}
                name={product.name}
                price={product.price}
                synopsis={product.synopsis}
              />
            ))}
          </div>
        </Carousel.Item>
      ) : null}
    </Carousel>
  );
}

export default CarouselCards;
