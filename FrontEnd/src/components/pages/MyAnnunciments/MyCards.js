import React from 'react'
import styles from './myCards.module.css'
import api from '../../../Services/Api';
import { useEffect ,useContext } from 'react'
import { UserContext } from "../../UseContext/UserContext";
import { Link } from 'react-router-dom';
import { Dropdown, IconButton } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import MoreIcon from '@rsuite/icons/More';
import TrashIcon from '@rsuite/icons/Trash';
import EditIcon from '@rsuite/icons/Edit';

const renderIconButton = (props, ref) => {
  return (
    <IconButton {...props} ref={ref} icon={<MoreIcon />} circle color="blue" appearance="primary" className='z-3 position-absolute ' />
  );
};

const MyCards = ({name, price, synopsis, _id, src}) => {
  const [userData, setUserData] = useContext(UserContext);


  async function deleteProduct() {
    try {
      await api.delete(`${userData._id}/product/${_id}`,{
        headers: {
          auth: userData._id
        }
      });
      alert("Anuncio deletado com sucesso")
    } catch (err) {
      console.log("Erro ao apagar anuncio");
    }
  }

  return (
    <div className={` cards container d-flex`}>
      
      <div>
        
      <div className={`${styles.cardinho} `}>
      <div>
        <Dropdown className={`${styles.drops} z-3`} title="" renderToggle={renderIconButton}>
          
                <Dropdown.Item icon={<TrashIcon />}onClick={deleteProduct}>
                </Dropdown.Item>
                <Link to={`/editar_produto/${_id}`}>
                  <Dropdown.Item icon={<EditIcon/>} >
                  </Dropdown.Item>
                </Link>
                
            </Dropdown>
        </div>
        <img
          src={`http://localhost:3333/${src}`}
          alt="Denim Jeans"
        ></img>
        <h1>{name}</h1>
        <p className="price">R$ {price}</p>
        <p>{synopsis}</p>
        
      </div>
        
      </div>
      
    </div>

  )
}

export default MyCards
