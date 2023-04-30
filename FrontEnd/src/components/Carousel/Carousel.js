import Carousel from 'react-bootstrap/Carousel'
import banner01 from '../img/banner.jpg'
import '../Carousel/Carousel.css'
function CarouselFadeExample() {
  return (
    <div className='container edit-car'>
    <Carousel fade>
      <Carousel.Item>
        <img className="d-block img-fluid" src={banner01} alt="First slide" />
        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={banner01}
          alt="Second slide"
        />

       
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={banner01}
          alt="Third slide"
        />

     
      </Carousel.Item>
    </Carousel>
    </div>
  )
}

export default CarouselFadeExample
/*
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>*/