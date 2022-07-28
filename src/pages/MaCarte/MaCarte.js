import './MaCarte.css'
import carte from '../../assets/carte.png'
import { useEffect, useState } from 'react';
import {fetchWrapper} from '../../lib/useGestDB'


function MaCarte(){  

    const idRestaurant=localStorage.getItem("CurrentRestaurant");
    const [nomRestaurant, setNomRestaurant] = useState([]);
    const [menus, setMenus] = useState([]);
    const [elements, setElements] = useState([]);
    const [currentCategorie, setCurrentCategorie] = useState('');

    const getNomRestaurant = async () => {
        const NR = (await fetchWrapper.get(`http://localhost:3001/restaurant/${idRestaurant}`))
        setNomRestaurant(NR[0].nom)
    }

const getMenus = async () => {
    const mns = (await fetchWrapper.get(`http://localhost:3001/menu/ByRestaurant/${idRestaurant}`))
    setMenus(mns)
    console.log('test1', mns)
}


const getElements = async () => {
    const elmts = (await fetchWrapper.get(`http://localhost:3001/element/ByRestaurant/${idRestaurant}`))
    setElements(elmts)
    console.log('test1', elmts)
}
const verifCategorie = (newCategorie) => {
if (newCategorie === currentCategorie){
console.log('false')
return false}

else{ 
    console.log('true')
    setCurrentCategorie(newCategorie)
return true
}}

useEffect( () => {
    getNomRestaurant()
    getMenus()
    getElements()
}, [idRestaurant])
    


    return(
        <div id="MaCarte">
            <div>
                <img src={carte} alt="carte" className='logo' /><br/>
                <label><h2>Bienvenue chez {`${nomRestaurant}`}</h2></label><br/>
            </div>
            <div>
                <h2>Menus disponibles : </h2>

                    <ul>
                        {menus.map((menu) => 
                                <li value={menu.nom} key={menu._id}>{menu.nom}<br/><i>{menu.description}</i><br/><div align="right">{menu.prix_HT.toFixed(2)}€ &ensp;<input type='submit' value='Commander'/></div> </li>
                            )}
                    </ul>
                <h2>A la Carte : </h2>
                    <ul>
                    {elements.map((element) => 
                    <div>
                                <li value={element.nom} key={element._id}>{element.nom}<br/><i>{element.description}</i><br/><div align="right">{element.prix_HT.toFixed(2)}€ &ensp;<input type='submit' value='Commander'/></div> </li>
                                </div>)}
                      
                    </ul>
                    
                
            </div>
                    
    

    </div>
    )};
    
    
    
    
    
    
    export default MaCarte


    /*    
{(verifCategorie(element.categorie))&&<h3>{element.categorie}</h3>}
*/