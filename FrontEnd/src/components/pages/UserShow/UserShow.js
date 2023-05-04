import React, { useState, useEffect } from 'react'
import Navbar2 from '../../Navbar2/Navbar2'
import Footer from '../../Footer/Footer'
import Cards from '../../Cards/Cards'
import { useParams } from 'react-router-dom'
import api from '../../../Services/Api'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import logoUser from '../../img/noUser.jpg'

const UserShow = () => {
    const [response, setResponse] = useState([])
    const [product, setProduct] = useState([])
    const { _id } = useParams()

    async function getUserId() {
        try {
            const Products = await api.get(`/user/${_id}`)
            const { data } = Products
            setResponse(data)
            console.log(response)
        } catch (err) {
            console.log('Erro ao carregar os produtos')
        }
    }

    useEffect(() => {
        getUserId()
    }, [api])

    async function getUserProducts() {
        try {
            const Products = await api.get(`/product/${_id}`)
            const { data } = Products
            setProduct(data)
            console.log(product)
        } catch (err) {
            console.log('Erro ao carregar os produtos')
        }
    }

    useEffect(() => {
        getUserProducts()
    }, [api])

    return (
        <>
            <Navbar2 />
            <div>
                <div className="flex flex-col items-center justify-center h-screen bg-gray-200 my-1 mb-10">
                    <div className="max-w-6xl bg-white p-5 rounded-lg shadow-lg">
                        <div className="flex flex-col sm:flex-row">
                            <div className="sm:w-1/3">
                                <img
                                    src={logoUser}
                                    alt="Book Cover"
                                    className="w-full rounded-lg shadow-lg"
                                />
                            </div>
                            <div className="sm:w-2/3 sm:pl-6 mt-4 sm:mt-0">
                                <h1 className="text-3xl font-bold mb-4">
                                    {response.name}
                                </h1>
                                <p className="text-gray-800 text-lg font-medium mb-4">
                                    {response.email}
                                </p>
                                <span className="text-gray-600 text-sm mb-2">
                                    Telefone: {response.phone}
                                </span>
                                <div className="flex items-center mb-4">
                                    <span className="text-gray-600 text-sm"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                    <img
                        className="w-full"
                        src="https://source.unsplash.com/random"
                        alt="User"
                    />
                    <div className=" px-6 py-4">
                        <div className="font-bold text-xl mb-2">
                            {response.name}
                        </div>
                        <p className="text-gray-700 text-base">
                            {response.email}
                        </p>
                        <p className="text-gray-700 text-base">
                            {response.phone}
                        </p>
                    </div>
                </div>
            </div> */}
            <div className=" bg-gray-100">
                <Slider slidesToShow={5}>
                    {product.map(product => (
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
            <Footer />
        </>
    )
}
export default UserShow
