import './MaCarte.css'
import carte from '../../assets/carte.png'
import { useEffect, useState } from 'react';
import {fetchWrapper} from '../../lib/useGestDB'


function MaCarte(){  

    const idRestaurant=localStorage.getItem("CurrentRestaurant");
    const [nomRestaurant, setNomRestaurant] = useState([]);
    const [menus, setMenus] = useState([]);

    const getNomRestaurant = async () => {
        const NR = (await fetchWrapper.get(`http://localhost:3001/restaurant/${idRestaurant}`))
        setNomRestaurant(NR[0].nom)
    }
useEffect( () => {
    getNomRestaurant()
}, [])
    
const getMenus = async () => {
    const mns = (await fetchWrapper.get(``))
}

    return(
        <div id="MaCarte">
            <div>
                <img src={carte} alt="carte" className='logo' /><br/>
                <label><h2>Bienvenue chez {`${nomRestaurant}`}</h2></label><br/>
            </div>
            <div>
                <h2>Menus disponibles : </h2>

                    <ul>
                        <li>Menu 1<br/><i>description</i><br/><div align="right">Prix &ensp;<input type='submit' value='Commander'/></div></li>
                        <li>Menu 1<br/><i>description</i><br/><div align="right">Prix &ensp;<input type='submit' value='Commander'/></div></li>
                        <li>Menu 1<br/><i>description</i><br/><div align="right">Prix &ensp;<input type='submit' value='Commander'/></div></li>
                        <li>Menu 1<br/><i>description</i><br/><div align="right">Prix &ensp;<input type='submit' value='Commander'/></div></li>
                        <li>Menu 1<br/><i>description</i><br/><div align="right">Prix &ensp;<input type='submit' value='Commander'/></div></li>
                    </ul>
                <h2>A la Carte : </h2>
                <h3>Catégorie 1</h3>
                    <ul>
                        <li>Element 1<br/><i>description</i><div align="right">Prix &ensp;<input type='submit' value='Commander'/></div></li>
                        <li>Element 1<br/><i>description</i><div align="right">Prix &ensp;<input type='submit' value='Commander'/></div></li>
                        <li>Element 1<br/><i>description</i><div align="right">Prix &ensp;<input type='submit' value='Commander'/></div></li>
                        <li>Element 1<br/><i>description</i><div align="right">Prix &ensp;<input type='submit' value='Commander'/></div></li>

                    </ul>
                    <h3>Catégorie 2</h3>
                    <ul>
                        <li>Element 1<br/><i>description</i><div align="right">Prix &ensp;<input type='submit' value='Commander'/></div></li>
                        <li>Element 1<br/><i>description</i><div align="right">Prix &ensp;<input type='submit' value='Commander'/></div></li>
                        <li>Element 1<br/><i>description</i><div align="right">Prix &ensp;<input type='submit' value='Commander'/></div></li>
                        <li>Element 1<br/><i>description</i><div align="right">Prix &ensp;<input type='submit' value='Commander'/></div></li>

                    </ul>

                    <h3>Catégorie 3</h3>
                    <ul>
                        <li>Element 1<br/><i>description</i><div align="right">Prix &ensp;<input type='submit' value='Commander'/></div></li>
                        <li>Element 1<br/><i>description</i><div align="right">Prix &ensp;<input type='submit' value='Commander'/></div></li>
                        <li>Element 1<br/><i>description</i><div align="right">Prix &ensp;<input type='submit' value='Commander'/></div></li>
                        <li>Element 1<br/><i>description</i><div align="right">Prix &ensp;<input type='submit' value='Commander'/></div></li>

                    </ul>
                
            </div>
                    
    

    </div>
    )};
    
    
    
    
    
    
    export default MaCarte


    /*    
const updateMenu = (e) =>{
    const dispo = elementsDispo
    const dispoInit = elementsDispoInit
    setTotalBrut(totalBrut+e.prix_HT)
    setMenuActuel(menuActuel => [...menuActuel, e])
    dispo.splice(dispo.indexOf(e), 1)
    dispoInit.splice(dispoInit.indexOf(e), 1)
    setElementsDispo(dispo)
    setElementsDispoInit(dispoInit)
}


const updateBD = async () => {
    const url = 'http://localhost:3001/menu'
    try {
        await fetchWrapper.post(url,{nom, prix_HT:totalNet, remise,idRestaurant,elements:menuActuel})
        setFin(true)
    }
    catch(err)
    {
        setFieldValidationErrors({message : err, error:true})
    }

}

  
    const logOut =() => {
      gestLogin.logout()
      setIsLogin(gestLogin.getState())
      navigate(`/`);
    }
  
    const onRestaurantClick = (id) => {
      setCurrentRestaurant(id)
      localStorage.setItem("CurrentRestaurant",id);
      navigate(`/listetable/${id}`);
      setDeMenu(false)
    }
  
    


const delMenuActuelEl = (e) =>{
    const actuel = menuActuel
    const newBrut = totalBrut-e.prix_HT
    actuel.splice(actuel.indexOf(e), 1)
    setMenuActuel(actuel)
    setElementsDispo(elementsDispo => [...elementsDispo, e])
    setElementsDispoInit(elementsDispoInit => [...elementsDispoInit, e])
    setTotalBrut(newBrut)
}
*/