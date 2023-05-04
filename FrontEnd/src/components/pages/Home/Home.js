import React from 'react'
import Cards from '../../Cards/Cards.js'
import CarouselFadeExample from '../../Carousel/Carousel.js'
import Categorias from '../../Categorias/Categorias.js'
import Navbar2 from '../../Navbar2/Navbar2.js'
import Trotes from '../../Trotes/Trotes.js'
import Footer from '../../Footer/Footer.js'
import api from '../../../Services/Api'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../UseContext/UserContext.js'
import CarouselCards from '../../CarouselCards/CarouselCards.js'
import { GoLocation } from 'react-icons/go'
import '../Home/Home.css'
import Carousel from 'react-bootstrap/Carousel'
import { Container, Row, Col, Modal } from 'react-bootstrap'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { FcPrevious, FcNext } from 'react-icons/fc'

const Home = () => {
    const [index, setIndex] = useState(0)

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [productsData, setProductsData] = useState([])
    const [allBooks, setAllBooks] = useState([])
    const [searchProducts, setSearchProducts] = useState('')
    const [intProducts, setIntProducts] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [category, setCategory] = useState('')
    const [CategoredProducts, setCategoredProducts] = useState([])
    const [userData, setUserData] = useContext(UserContext)

    useEffect(() => {
        getUserLocation()
    }, [])
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex)
    }
    async function getUserLocation() {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords
                setLatitude(latitude)
                setLongitude(longitude)
            },
            err => {
                console.log(err)
            },
            { timeout: 10000 }
        )
    }

    useEffect(() => {
        getNearProducts()
    }, [latitude, longitude])

    async function getNearProducts() {
        try {
            const nearProducts = await api.get(
                `/product/cords?latitude=${latitude}&longitude=${longitude}`
            )
            const { data } = nearProducts
            const limitedItens = data.slice(0, 5)
            setProductsData(limitedItens)
        } catch (err) {
            console.log('Erro ao carregar os produtos')
        }
    }

    async function getProducts() {
        try {
            const Products = await api.get(`/product/`)
            const { data } = Products
            const allProducts = data.slice(0, 5)
            setAllBooks(allProducts)
            setIntProducts(data)
        } catch (err) {
            console.log('Erro ao carregar os produtos')
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    function getSearchProducts() {
        const filteredProducts = intProducts.filter(product =>
            product.name.toLowerCase().includes(searchProducts.toLowerCase())
        )
        setFilteredData(filteredProducts)
    }

    useEffect(() => {
        getSearchProducts()
    }, [searchProducts, allBooks, intProducts])

    function getCategoryBooks() {
        const CategoredProducts = intProducts.filter(product =>
            product.category.toLowerCase().includes(category.toLowerCase())
        )
        const categories = CategoredProducts.slice(0, 6)
        setCategoredProducts(categories)
    }

    useEffect(() => {
        getCategoryBooks()
    }, [allBooks, category, intProducts])

    return (
        <div>
            <Navbar2 setSearchProducts={setSearchProducts} />

            <div className="">
                {searchProducts ? (
                    filteredData ? (
                        <div className="cards d-flex">
                            {filteredData.map(product => (
                                <Cards
                                    key={product._id}
                                    name={product.name}
                                    _id={product._id}
                                    price={product.price}
                                    author={product.author}
                                    synopsis={product.synopsis}
                                    src={product.src}
                                />
                            ))}
                        </div>
                    ) : (
                        'Produto não Encontrado'
                    )
                ) : (
                    <div>
                        <CarouselFadeExample />
                        <Categorias setCategory={setCategory} />
                        <div className=" container">
                            <h2 id="edit-h2">
                                Livros <span>Usados</span>
                            </h2>
                            <h2>{category}</h2>

                            <Slider slidesToShow={5}>
                                {CategoredProducts.map(product => (
                                    <Cards
                                        key={product._id}
                                        _id={product._id}
                                        name={product.name}
                                        src={product.src}
                                        author={product.author}
                                        price={product.price}
                                        synopsis={product.synopsis}
                                    />
                                ))}
                            </Slider>
                        </div>

                        <Trotes />
                        <div className="container">
                            <h2 id="edit-h2">
                                Veja os Livros Próximos a <span>Você</span>
                            </h2>

                            <div className="cards text-center d-flex">
                                {productsData.map(product => (
                                    <Cards
                                        key={product._id}
                                        _id={product._id}
                                        name={product.name}
                                        src={product.src}
                                        price={product.price}
                                        author={product.author}
                                        synopsis={product.synopsis}
                                    />
                                ))}
                            </div>
                            <div className="text-center link_map">
                                {userData.isLogged ? (
                                    <Link id="link-tx" to="/map_products">
                                        <button className="btn_map link_map">
                                            Veja no Mapa{' '}
                                            <GoLocation id="icon-map" />
                                        </button>
                                    </Link>
                                ) : null}
                            </div>
                        </div>
                        {/* <div className="text-center">
              <h2>LIVROS:</h2>
              <div className="d-flex">
                {allBooks.map((product) => (
                  <Cards
                    key={product._id}
                    name={product.name}
                    price={product.price}
                    synopsis={product.synopsis}
                  />
                ))}
              </div>
               {userData.isLogged ? (
                <Link to="/map_products">
                  <p>Veja no Mapa <GoLocation/></p>
                </Link>
              ) : null}

            </div> */}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}

export default Home
