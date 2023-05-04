import React, { useEffect, useState } from 'react'
import api from '../../../Services/Api'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar2 from '../../Navbar2/Navbar2'
import Cards from '../../Cards/Cards'
import Footer from '../../Footer/Footer'
import { BsRewind } from 'react-icons/bs'

const BookDetails = () => {
    const [currentImage, setCurrentImage] = useState(0)
    const [response, setResponse] = useState([])
    const images = [
        `{http://localhost:3333/${response.src}}`,
        `{http://localhost:3333/${response.src}}`
    ]
    const [searchProducts, setSearchProducts] = useState('')
    const [intProducts, setIntProducts] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [userPost, setUserPost] = useState([])

    async function getProducts() {
        try {
            const Products = await api.get(`/product/`)
            const { data } = Products
            setIntProducts(data)
        } catch (err) {
            console.log('Erro ao carregar os produtos')
        }
    }

    useEffect(() => {
        getProducts()
    }, [intProducts])

    function getSearchProducts() {
        const filteredProducts = intProducts.filter(product =>
            product.name.toLowerCase().includes(searchProducts.toLowerCase())
        )
        setFilteredData(filteredProducts)
    }

    useEffect(() => {
        getSearchProducts()
    }, [searchProducts])

    const handleImageClick = index => {
        setCurrentImage(index)
    }

    const { _id } = useParams()

    async function getProductsId() {
        try {
            const Products = await api.get(`/product/this/${_id}`)
            const { data } = Products
            setResponse(data)
            console.log(response)
        } catch (err) {
            console.log('Erro ao carregar os produtos')
        }
    }

    useEffect(() => {
        getProductsId()
    }, [])

    async function getUserPost() {
        try {
            const Products = await api.get(`/user/${response.user}`)
            const { data } = Products
            setUserPost(data)
            console.log(userPost)
        } catch (err) {
            console.log('Erro ao carregar os produtos')
        }
    }

    useEffect(() => {
        getUserPost()
    }, [response])

    return (
        <>
            <Navbar2 setSearchProducts={setSearchProducts} />
            {searchProducts ? (
                filteredData ? (
                    <div className="d-flex">
                        {filteredData.map(product => (
                            <Cards
                                _id={product._id}
                                key={product._id}
                                name={product.name}
                                price={product.price}
                                synopsis={product.synopsis}
                                src={product.src}
                            />
                        ))}
                    </div>
                ) : null
            ) : (
                <div>
                    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 my-1 mb-10">
                        <div className="max-w-6xl bg-white p-5 rounded-lg shadow-lg">
                            <div className="flex flex-col sm:flex-row">
                                <div className="sm:w-1/3">
                                    <img
                                        src={`http://localhost:3333/${response.src}`}
                                        alt="Book Cover"
                                        className="w-full rounded-lg shadow-lg"
                                    />
                                </div>
                                <div className="sm:w-2/3 sm:pl-6 mt-4 sm:mt-0">
                                    <h1 className="text-3xl font-bold mb-4">
                                        {response.name}
                                    </h1>
                                    <p className="text-gray-800 text-lg font-medium mb-4">
                                        {response.synopsis}
                                    </p>
                                    <span className="text-gray-600 text-sm mb-2">
                                        Autor(a): {response.author}
                                    </span>
                                    <div className="flex items-center mb-4">
                                        <span className="text-gray-600 text-sm">
                                            (12)
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="text-2xl font-bold">
                                            <h4>
                                                Postado por:{' '}
                                                <Link
                                                    to={`/user_presentation/${response.user}`}
                                                >
                                                    {userPost.name}
                                                </Link>{' '}
                                            </h4>
                                        </div>
                                        <div className="text-2xl font-bold">
                                            <h4>
                                                Preço: R${response.price},00
                                            </h4>
                                        </div>

                                        <button className="rounded-3xl bg-black px-6 py-2 text-xl font-medium uppercase text-white">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    )
}

export default BookDetails
