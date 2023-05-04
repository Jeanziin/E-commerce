import React from 'react';
import '../Trotes/Trotes.css'
import '../Cards/cardsStyle.css'
import imge from '../img/harry.png'
import imge2 from '../img/assans.png'
import imge3 from '../img/got.png'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { AiOutlineHeart, AiFillHeart  } from 'react-icons/ai'
import {AiOutlineInfoCircle} from'react-icons/ai'
import {MdOutlineDiscount
} from'react-icons/md'


const BookContainer = (name, price, src) => {
  return (
<div className='container alig'>
<h2 id="edit-h2">Melhores <span>Ofertas</span></h2>
<div className='car-cont'>
<div class="card-tr card-full">
    <div>
      <h6>Harry Potter</h6>
      <p>Até 50% de Desconto <MdOutlineDiscount
/></p>
    </div>
    <div>
    <img alt='img' id='img-tr' src={imge}></img>
    </div>
</div>
<div class="card-tr2 card-full">
    <div>
      <h6>Assassin’s Creed</h6>
      <p>Até 50% de Desconto <MdOutlineDiscount
/></p>
    </div>
    <div>
    <img alt='img' id='img-tr2' src={imge2}></img>
    </div>
</div>
<div class="card-tr3 card-full">
    <div>
      <h5>Game of Thrones</h5>
      <p>Até 45% de Desconto <MdOutlineDiscount
/></p>
    </div>
    <div>
    <img alt='img' id='img-tr' src={imge3}></img>
    </div>
</div>
</div>
</div>
  );
};

export default BookContainer;