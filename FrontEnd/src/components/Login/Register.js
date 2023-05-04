import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../UseContext/UserContext";
import api from '../../Services/Api.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login/StyleLoginRs.css'
import banner07 from '../img/banner_02.png'
import logos from '../img/logoFullWhite.png'
const RegisterPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const navigate = useNavigate()
  useEffect(()=> {
    getUserLocation()
  }, [])

  async function registerHandler(e) {
    e.preventDefault();
    try {
      await api.post('user', {
        name,
        email,
        password,
        phone,
        latitude,
        longitude
      } )
      alert("Cadastro realizado com sucesso!")
      navigate('/login')
     } catch(err){
      alert("Error ao cadastrar usuario, tente novamente");
    }
  }


  async function getUserLocation(){
    navigator.geolocation.getCurrentPosition((position) => {
      const {latitude, longitude} = position.coords
      setLatitude(latitude)
      setLongitude(longitude)
      console.log(latitude,longitude)
    }, (err)=> {
      console.log(err)
    }, {timeout: 10000})
  }




  return (
    <div className='col-login1 container'>
    <div className='col-login2'>
      <div className='col-login3'>
        <img alt='' id='logo-lg' src={logos}></img>
      <form>
     
      <div class="inputbox">
      <input
              type="text"
              id="nome"
              name="nome"
              value={name}
              onChange={e => setName(e.target.value)}
              required
          
              
            />
          <span>Nome</span>
          <i></i>
</div>
         
          <div class="inputbox">
          <input
             
              value={email}
              onChange={e => setEmail(e.target.value)}
              id='email'
              type='text'
              name="email"
           
              required

            />
              <span>Email</span>
            <i></i>
         </div>
         <div class="inputbox">
         <input
                  type="text"
                  value={phone}
                  id="telefone"
                  onChange={e => setPhone(e.target.value)}
                  name="telefone"
                  required
/>
              <span>Telefone</span>
            <i></i>
         </div>
         <div class="inputbox">
         <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              id="password"
              name="password"
              required
             
            />
              <span>Senha</span>
            <i></i>
         </div>
     <button
           onClick={registerHandler}
        type="submit"
          className='w-full button-name rounded-3xl text-black'
          >
            Registrar
          </button>
    <div className='edit-p'>
      </div>
      </form>
      </div>
      <div className='col-login4'>
      <img alt='img' id='img-lg-mb' src={banner07}></img>
      </div>
    </div>
  </div>



    /*
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="Nome" className="block text-gray-800 font-bold mb-2">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Seu Nome"
            />
            <label htmlFor="email" className="block text-gray-800 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              id="email"
              name="email"
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your email address"
            />
           <label htmlFor="Telefone" className="block text-gray-800 font-bold mb-2">
  Telefone
</label>
<input
  type="tel"
  value={phone}
  id="telefone"
  onChange={e => setPhone(e.target.value)}
  name="telefone"
  className="w-full border border-gray-300 p-2 rounded-lg"
  placeholder="(XX) XXXX-XXXX"
  pattern="[0-9]{2} [0-9]{4,5}-[0-9]{4}"
  required
/>

          </div>
          <div>
            <label htmlFor="password" className="block text-gray-800 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              id="password"
              name="password"
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <button
              type="submit" onClick={registerHandler}
              className="w-full rounded-3xl bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 text-xl font-medium uppercase"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
      <p className="mt-4 text-gray-600">
        Já Possui uma conta?{' '}
        <button  className="text-blue-500 hover:text-blue-600">
          <Link to="/login">Entre aqui</Link>
        </button>
      </p>
    </div>
    */
  );
};

export default RegisterPage;