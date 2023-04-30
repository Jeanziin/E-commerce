import 'bootstrap/dist/css/bootstrap.min.css'
import '../Categorias/categorias.css'
import { AiFillHeart } from 'react-icons/ai'
import {GiPistolGun, GiMaterialsScience, GiScreaming } from 'react-icons/gi'
import {RiSpyFill} from 'react-icons/ri'
import {MdHistoryToggleOff} from 'react-icons/md'
import  {BsFillPersonBadgeFill} from 'react-icons/bs'
import {SiApachemaven} from 'react-icons/si'


function Categorias({setCategory}) {
  

  function updateAction(){
    setCategory("Ação")
  }
  function updateFiction(){
    setCategory("Ficção")
  }
  function updateSuspense(){
    setCategory("Suspense")
  }
  function updateHistory(){
    setCategory("Historia")
  }
  function updateBibiografia(){
    setCategory("bibiografia")
  }
  function updateTerror(){
    setCategory("Terror")
  }
  function updateFantasy(){
    setCategory("Fantasia")
  }
  function updateRomance(){
    setCategory("Romance")
  }

  return (
    <div className="categories">
    <div className="container cont_edit">
      <div className="icons_cartegory text-center">
        <AiFillHeart className='icon' onClick={updateRomance}/> <p>Romance</p>
      </div>
      <div className="icons_cartegory text-center">
          <GiPistolGun className='icon' onClick={updateAction}/> <p>Ação</p>
      </div>
      <div className="icons_cartegory text-center">
        <GiMaterialsScience className='icon' onClick={updateFiction}/> <p>Ficção</p>
      </div>
      <div className="icons_cartegory text-center">
        <RiSpyFill onClick={updateSuspense} className='icon'/> <p>Suspense</p>
      </div>
      <div className="icons_cartegory text-center">
        <MdHistoryToggleOff onClick={updateHistory} className='icon'/> <p>História</p>
      </div>
      <div className="icons_cartegory text-center">
        <BsFillPersonBadgeFill onClick={updateBibiografia} className='icon'/> <p>Biografia</p>
      </div>
      <div className="icons_cartegory text-center">
        <GiScreaming className='icon' onClick={updateTerror} /> <p>Terror</p>
      </div>
      <div className="icons_cartegory text-center">
        <SiApachemaven className='icon' onClick={updateFantasy} /> <p>Fantasia</p>
      </div>
    </div>
    </div>
  )
}

export default Categorias
