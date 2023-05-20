import '../Cards/cardsStyle.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { AiOutlineInfoCircle, AiOutlineShopping } from 'react-icons/ai'
import { MdFavoriteBorder } from 'react-icons/md'

import './cardsStyle.css'

function Cards({
    src,
    name,
    author,
    price,
    _id,
    isFavorite,
    handleFavoriteClick
}) {
    const [hovered, setHovered] = useState(false)

    function handleMouseEnter() {
        setHovered(true)
    }

    function handleMouseLeave() {
        setHovered(false)
    }

    return ( 

     
        <div className="product-card">
        
        <div className="product-tumb">
        <img
                src={`https://swap-backend.onrender.com/${src}`}
                id="img-card"
                alt="Denim Jeans"
            />
        </div>
        <div className="product-details">
          <span className="product-catagory">Por <span id='author-edit'>{author}</span></span>
          <h6><a href="">{name}</a></h6>
          <div className="product-bottom-details">
            <div className="product-price">R${price}</div>
            <div className="product-links">
              <a href=""> <AiOutlineShopping id="icon-info" /></a>
              <a href=""><MdFavoriteBorder id="icon-info" /></a>              
              <a href={`/details/${_id}`}> <AiOutlineInfoCircle id="icon-info" /></a>
            </div>
          </div>
        </div>
      </div>
   
        /*
        <div
            className="card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img
                src={`http://localhost:3333/${src}`}
                id="img-card"
                alt="Denim Jeans"
            />
            <div className="col-text-et container">
                <span class="card__category">R${price},00</span>
                <h6 class="card__title">{name}</h6>
                <span class="card__by">
                    by{' '}
                    <a href="#" class="card__author" title="author">
                        {author}
                    </a>
                </span>
            </div>
            <div className="col-master">
                <div className={`btn-group ${hovered ? 'show' : ''}`}>
                    <p className="details-edit">
                        <a id="details-edit" href={`/details/${_id}`}>
                            <AiOutlineInfoCircle id="icon-info" />
                        </a>
                    </p>
                    <p>
                        <AiOutlineShopping id="icon-info" />
                    </p>
                    <p>
                        <button
                            className="btn-favorite"
                            onClick={handleFavoriteClick}
                        >
                            <MdFavoriteBorder id="icon-info" />
                        </button>
                    </p>
                </div>
            </div>
        </div>
        */
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
