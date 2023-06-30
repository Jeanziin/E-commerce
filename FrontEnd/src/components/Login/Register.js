import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../UseContext/UserContext";
import TextMask from 'react-text-mask';
import api from '../../Services/Api.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login/StyleLoginRs.css'
import banner07 from '../img/banner_02.png'
import logos from '../img/logoFullWhite.png'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const RegisterPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [dateBirth, setDateBirth] = useState("")
  const [gender, setGender] = useState("")
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const navigate = useNavigate()
  const MySwal = withReactContent(Swal)


  const phoneMask = ['(', /\d/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

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
        dateBirth,
        gender,
        latitude,
        longitude
      } )
      MySwal.fire({
        title: 'Sucesso',
        text: 'Cadastro Realizado',
        icon: 'success',
        confirmButtonText: 'Ok',
        didOpen: () => {
          // `MySwal` is a subclass of `Swal` with all the same instance & static methods
          MySwal.stopTimer()
        },
      })
      navigate('/login')
     } catch(err){
      MySwal.fire({
        title: 'Erro',
        text: 'Não foi possível cadastrar, tente novamente',
        icon: 'error',
        confirmButtonText: 'Ok',
        didOpen: () => {
          // `MySwal` is a subclass of `Swal` with all the same instance & static methods
          MySwal.stopTimer()
        },
      })
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
    <div className='cont-centrer'>
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
         <div className="inputbox">
      <TextMask
        type="text"
        value={phone}
        id="telefone"
        onChange={(e) => setPhone(e.target.value)}
        name="telefone"
        mask={phoneMask}
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


         <div className='inputbox-date'>
          <input
            type='date'
            value={dateBirth}
            onChange={(e) => setDateBirth(e.target.value)}
            id='birthdate'
            name='birthdate'
            required
          
          />
          <span>Data de Nascimento</span>
          <i></i>
</div>

<div className='text-center edit-gen'>
  <select
    className='custom-select'
    value={gender}
    onChange={(e) => setGender(e.target.value)}
    id='gender'
    name='gender'
    required
  >
    <option value=''>Gênero</option>
    <option value='masculino'>Masculino</option>
    <option value='feminino'>Feminino</option>
    <option value='outro'>Outro</option>
  </select>
</div>

     <button
           onClick={registerHandler}
        type="submit"
          className='w-full button-name rounded-3xl text-black'
          >
            Registrar
          </button>
          <p className="text-center mt-2  edit-p text-white-600">
        Já Possui uma conta?{' '}
        <button  >
          <Link className="etr-edit" to="/login">Entre aqui</Link>
        </button>
      </p>
      
    <div className='edit-p'>
      </div>
      </form>
      </div>
      <div className='col-login4'>
      <img alt='img' id='img-lg-mb' src={banner07}></img>
      </div>
    </div>
  </div>
  </div>
  );
};

export default RegisterPage;