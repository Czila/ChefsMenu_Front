import './MaCarte.css'
import carte from '../../assets/carte.png'
import { useEffect, useState } from 'react';
import {fetchWrapper} from '../../lib/useGestDB'


function MaCarte(){  

    const idRestaurant=localStorage.getItem("CurrentRestaurant");
    const [nomRestaurant, setNomRestaurant] = useState([]);
    const [menus, setMenus] = useState([]);
    const [elements, setElements] = useState([]);
    const [numTable,setNumTable]=useState();
    let currentCategorie='';

    const getNomRestaurant = async () => {
        const NR = (await fetchWrapper.get(`http://localhost:3001/restaurant/${idRestaurant}`))
        setNomRestaurant(NR[0].nom)
    }

const getMenus = async () => {
    const mns = (await fetchWrapper.get(`http://localhost:3001/menu/ByRestaurant/${idRestaurant}`))
    setMenus(mns)
}


const getElements = async () => {
    const elmts = (await fetchWrapper.get(`http://localhost:3001/element/ByRestaurant/${idRestaurant}`))
    setElements(elmts)
}
function verifCategorie (newCategorie){
if (newCategorie === currentCategorie){
return false}
else{ 
    currentCategorie=newCategorie
return true
}}

useEffect( () => {
    getNomRestaurant()
    getMenus()
    getElements()
}, [])
    


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
                                <li value={menu.nom} key={menu._id}>{menu.nom}<br/><i>{menu.description}</i><br/><div align="right">{menu.prix_HT.toFixed(2)}€ &ensp;
                                <input type='submit' value='Commander'  hidden={numTable!==''}/></div> </li>
                            )}
                    </ul>
                <h2>A la Carte : </h2>
                    <ul>
                    {elements.map((element) => 
                    <div>
                        {(verifCategorie(element.categorie))&&<h3>{currentCategorie}</h3>}
                                <li value={element.nom} key={element._id}>{element.nom}<br/><i>{element.description}</i><br/><div align="right">{element.prix_HT.toFixed(2)} € HT {(element.prix_HT * (1+(element.tva/100))).toFixed(2) }€ TTC{} &ensp;
                                <input type='submit' value='Commander' hidden={numTable!==''}/></div> </li>
                                </div>)}
                      
                    </ul>
                    
                
            </div>
                    
    

    </div>
    )};
    
    
    
    
    
    
    export default MaCarte


    /*    

*/