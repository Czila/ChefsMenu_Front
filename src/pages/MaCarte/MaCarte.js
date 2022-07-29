import './MaCarte.css'
import carte from '../../assets/carte.png'
import { useEffect, useState } from 'react';
import {fetchWrapper} from '../../lib/useGestDB'
import {useParams} from 'react-router-dom';


function MaCarte(){  
    const params = useParams()
    const [idRestaurant,setIdRestaurant]=useState(localStorage.getItem("CurrentRestaurant"));
    const [numTable,setNumTable]=useState(0)
    const [nomRestaurant, setNomRestaurant] = useState([]);
    const [menus, setMenus] = useState([]);
    const [elements, setElements] = useState([]);
    const [client, setClient] = useState(false);
    const [commandeElement,setCommandeElement]= useState([])
    const [commandeMenu,setCommandeMenu]= useState([])
    const [commande,setCommande]= useState({menus:[],elements:[]})
    let currentCategorie='';
    let total =0;
    let totalTTC =0;

    const getNomRestaurant = async () => {
        const NR = (await fetchWrapper.get(`http://localhost:3001/restaurant/${idRestaurant}`))
        setNomRestaurant(NR[0].nom)
    }

const getMenus = async () => {
    const mns = (await fetchWrapper.get(`http://localhost:3001/menu/ByRestaurant/${idRestaurant}`))
    setMenus(mns)
}

const updateCommandeElement =  (e) => {
    
    setCommandeElement(commandeElement => [...commandeElement,e])
    const newCommand = [{elements:commandeElement,menus:commandeMenu}]
    setCommande(newCommand)
    console.log(commande)
}
const updateCommandeMenu =  (e) => {
    setCommandeMenu(commandeMenu => [...commandeMenu,e])
    setCommande({elements:commandeElement,menus:commandeMenu})
    console.log(commande)
}

const getElements = async () => {
    const elmts = (await fetchWrapper.get(`http://localhost:3001/element/ByRestaurant/${idRestaurant}`))
    setElements(elmts)
}

const updateTotal = (m,t) =>
{
    total=total+m
    totalTTC=totalTTC+(m*((t/100)+1))
}

function verifCategorie (newCategorie){
if (newCategorie === currentCategorie){
return false}
else{ 
    currentCategorie=newCategorie
return true
}}


useEffect( () => {
    if (params.restaurantID)  
    {
        setIdRestaurant(params.restaurantID)
        if (!params.numTable) setClient(true)
        else setNumTable(params.numTable)
    }
    console.log(numTable)
    getNomRestaurant()
    getMenus()
    getElements()
}, [idRestaurant,numTable])
    


    return(
    <div>
        <div id="MaCarte">
            <div>
                <img src={carte} alt="carte" className='logo' /><br/>
                <label><h2>Bienvenue chez {`${nomRestaurant}`}</h2></label><br/>
            </div>
            <div>
                {(client)&&
                <div>
                    <span>Si vous souhaitez commandé merci de saissir le numéro de votre table : </span>
                    <input className='input' type="number" placeholder="nbTable" onChange={(e) => {if(e.currentTarget.value>0) setNumTable(e.currentTarget.value)}} name='nbTable' value={numTable} required/>
                </div>
                }
                <h2>Menus disponibles : </h2>

                    <ul>
                        {menus.map((menu) => 
                                <li value={menu.nom} key={menu._id}>{menu.nom}<br/><i>{menu.description}</i><br/><div align="right">{menu.prix_HT.toFixed(2)}€ &ensp;
                                <input type='submit' value='Commander' onClick={()=> updateCommandeMenu()} hidden={numTable===0}/></div> </li>
                            )}
                    </ul>
                <h2>A la Carte : </h2>
                    <ul>
                    {elements.map((element) => 
                    <div>
                        {(verifCategorie(element.categorie))&&<h3>{currentCategorie}</h3>}
                                <li value={element.nom} key={element._id}>{element.nom}<br/><i>{element.description}</i><br/><div align="right">{element.prix_HT.toFixed(2)} € HT {(element.prix_HT * (1+(element.tva/100))).toFixed(2) }€ TTC{} &ensp;
                                <input type='submit' value='Commander' onClick={()=> updateCommandeElement()} hidden={numTable===0}/></div> </li>
                                </div>)}
                      
                    </ul>
                    
                
            </div>
        </div>
        <div>
            <h2>Votre commande : </h2>
            <div id="commande">
            
            {(commande.menus.length>0) &&
            <ul >
                <li className="titreCommandeLi liMenu">Menu : </li>

                <ul className="detailCommandeul">
                    {commande.menus.map((me) => 
                        <li key={me._id}>{me.nom}{updateTotal(me.prix_HT,me.tva)}</li>
                    )}
                </ul>
                 
            </ul>
            }
            {
            (commande.elements.length>0) &&
            <ul >
                <li className="titreCommandeLi liCarte">A la carte : </li>
                <ul className="detailCommandeul">
                    {commande.elements.map((el) => 
                        <li key={el._id}>{el.nom} {updateTotal(el.prix_HT,el.tva)}</li>
                    )}
                </ul>
            </ul>
            }
          </div>
          <div className="total">
            <div>
                <h3>Total HT</h3>
                <span>{total.toFixed(2)} €</span>
            </div>
            <div>
                <h3>Total TTC</h3>
                <span>{totalTTC.toFixed(2)} €</span>
            </div>
          </div>
        </div>
    </div>
    )};
    
    
    
    
    
    
    export default MaCarte


    /*    

*/