import './MaCarte.css'
import carte from '../../assets/carte.png'
import { useEffect, useState } from 'react';
import {fetchWrapper} from '../../lib/useGestDB'
import {useParams} from 'react-router-dom';


function MaCarte(){  
    const params = useParams()
    const [idRestaurant,setIdRestaurant]=useState(localStorage.getItem("CurrentRestaurant"));
    const [numTable,setNumTable]=useState(0)
    const [restaurant, setRestaurant] = useState([]);
    const [menus, setMenus] = useState([]);
    const [elements, setElements] = useState([]);
    const [client, setClient] = useState(false);
    const [commandeFlag, setCommandeFlag] = useState(false);
    const [commandeElement,setCommandeElement]= useState([])
    const [commandeMenu,setCommandeMenu]= useState([])
    const [commande,setCommande]= useState({menus:[],elements:[]})
    const [btCommande,setBtCommande]= useState(true)
    let currentCategorie='';
    let total =0;
    let totalTTC =0;

    const getRestaurant = async () => {
        const NR = (await fetchWrapper.get(`http://localhost:3001/restaurant/${idRestaurant}`))
        setRestaurant(NR[0])
    }

    const getMenus = async () => {
        const mns = (await fetchWrapper.get(`http://localhost:3001/menu/ByRestaurant/${idRestaurant}`))
        setMenus(mns)
    }
  

    const createCommande = async () => {
        try {
        const nC = (await fetchWrapper.post(`http://localhost:3001/commande/`,{idRestaurant,numTable}))
        setCommande({_id:nC.message,elements:commandeElement,menus:commandeMenu})
        setCommandeFlag(true)
    }
        catch(err)
        {
            console.log(err)
        }
    }

    const updateCommandeMenu =  async (m) => {
        await fetchWrapper.put(`http://localhost:3001/commande/addMenu/${commande._id}`,{menu:m})
        const newMenu = commandeMenu
        newMenu.push(m)
        setCommandeMenu(newMenu)
        const newCommand = {_id:commande._id,elements:commandeElement,menus:newMenu}
        setCommande(newCommand)
    }
    const updateCommandeElement =  async (e) => {
        try{
    await fetchWrapper.put(`http://localhost:3001/commande/addElement/${commande._id}`,{element:e})
    const newEle = commandeElement
    newEle.push(e)
    setCommandeElement(newEle)
    const newCommand = {_id:commande._id,elements:newEle,menus:commandeMenu}
    setCommande(newCommand)
    }
    catch(err) {
        console.log(err.message)
    }
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

const handleChangeNbTable =(e) =>
{
    const value = e.currentTarget.value

    if((value<restaurant.nbTable)&&(value>0)) 
    {
        setNumTable(value)
        checkTable(value)
    }
    
}

const checkTable = async (n) => 
{
    try {
        const c = (await fetchWrapper.get(`http://localhost:3001/commande/checkTable/${idRestaurant}/${n}`))
        if(c) 
        {   
            setCommande(c)
            setCommandeMenu(c.menus)
            setCommandeElement(c.elements)
            setBtCommande(true)
            setCommandeFlag(true)
            console.log('commande')
        }
        else 
        {
            setBtCommande(false)
            setCommandeFlag(false)
            console.log('âs commande')
        } 
    }
    catch (err)
    {
        console.log(err)
    }
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
        //on vérifie si la table est libre
        
    }
    console.log(numTable)
    getRestaurant()
    getMenus()
    getElements()
}, [idRestaurant,numTable])
    


    return(
    <div id='carte'>
        <div id="MaCarte">
            <div>
                <img src={carte} alt="carte" className='logo' /><br/>
                <label><h2>Bienvenue chez {`${restaurant.nom}`} {restaurant.nbTable}</h2></label><br/>
            </div>
            <div>
                {((client)&&(!commandeFlag))&&
                    <div>
                        <span>Pour commander merci de saissir le numéro de votre table : </span>
                        <input className='input' type="number" placeholder="nbTable" onChange={(e) => { handleChangeNbTable(e)}} name='nbTable' value={numTable} required/>
                    </div>
                    }
                {
                ((client)&&(!btCommande)) ?
                    <button onClick={() => createCommande() }>Commander</button>
                :
                <button onClick={() =>  { setBtCommande(false)
                    setCommandeFlag(false)} }>Changer table</button>
                }   
                <h2>Menus disponibles : </h2>

                    <ul>
                        {menus.map((menu) => 
                                <li value={menu.nom} key={menu._id}>{menu.nom}<br/><i>{menu.description}</i><br/><div align="right">{menu.prix_HT.toFixed(2)}€ &ensp;
                                <input type='submit' value='Commander' onClick={()=> updateCommandeMenu(menu)} hidden={!commandeFlag}/></div> </li>
                            )}
                    </ul>
                <h2>A la Carte : </h2>
                    <ul>
                    {elements.map((element) => 
                    <div>
                        {(verifCategorie(element.categorie))&&<h3>{currentCategorie}</h3>}
                                <li value={element.nom} key={element._id}>{element.nom}<br/><i>{element.description}</i><br/><div align="right">{element.prix_HT.toFixed(2)} € HT {(element.prix_HT * (1+(element.tva/100))).toFixed(2) }€ TTC{} &ensp;
                                <input type='submit' value='Commander' onClick={()=> updateCommandeElement(element)} hidden={!commandeFlag}/></div> </li>
                                </div>)}
                      
                    </ul>
                    
                
            </div>
        </div>
        <div hidden={!commandeFlag}>
            <h2>Votre commande : </h2>
            <div id="commande">
            
            {(commande.menus) &&
            <ul >
                <li className="titreCommandeLi liMenu">Menu : </li>

                <ul className="detailCommandeul">
                    {commande.menus.map((me,index) => 
                        <li key={index}>{me.nom}{updateTotal(me.prix_HT,me.tva)}</li>
                    )}
                </ul>
                 
            </ul>
            }
            {
            (commande.elements) &&
            <ul >
                <li className="titreCommandeLi liCarte">A la carte : </li>
                <ul className="detailCommandeul">
                    {commande.elements.map((el,index) => 
                        <li key={index}>{el.nom} {updateTotal(el.prix_HT,el.tva)}</li>
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