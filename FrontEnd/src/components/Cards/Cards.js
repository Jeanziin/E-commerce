import '../Cards/cardsStyle.css'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { AiOutlineHeart, AiFillHeart  } from 'react-icons/ai'
import {AiOutlineInfoCircle} from'react-icons/ai'

function Cards({name, price, synopsis, src, _id}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };


  return (
    

    
    
    
    
      <div className="card">
        <img
         src={`http://localhost:3333/${src}`}
         id='img-card text-center'
          alt="Denim Jeans"
        ></img>
        
        <h1 id='edit-name'>{name}</h1>
        <div className='col-master'>
        <div className='col-price'>
        <p className="price">R${price},00</p>
        </div>
        <div className="btn-group">
        <p className='details-edit'><Link id='details-edit' to={`/details/${_id}`}><AiOutlineInfoCircle/></Link></p>
        <p>
        <button className='btn-favorite' onClick={handleFavoriteClick}>
        {isFavorite ? '❤️' : '🤍'}
      </button>
        </p>
        </div>
        </div>
      </div>
        

  )
}
export default Cards

/*
<div class="card">
<form control="" class="form-group">
            <div class="row">
              <input type="text" name="username" id="username" class="form__input" placeholder="Username"></input>
            </div>
            <div class="row">
            
              <input type="password" name="password" id="password" class="form__input" placeholder="Password"></input>
            </div>
            <div class="row">
              <input type="checkbox" name="remember_me" id="remember_me" class=""></input>
              <label for="remember_me">Remember Me!</label>
            </div>
            <div class="row">
              <input type="submit" value="Submit" class="btn-op"></input>
            </div>
          </form>
<img src={imgBook}></img>
</div>
*/