import React, { useEffect, useState } from 'react';

import {useParams} from 'react-router-dom';

import menu from '../../assets/menu.png'
import { fetchWrapper } from '../../lib/useGestDB';
import './AjouterunMenu.css'

function AjouterunMenu() {
    const params = useParams();
    let idRestaurant =params.restaurantID
    const [nom, setNom] = useState("")
    const [menuActuel,setMenuActuel]=useState([])
    const [totalNet,setTotalNet]=useState(0)
    const [totalBrut,setTotalBrut]=useState(0)
    const [remise,setRemise]=useState(0)
    const [categories,setCategories]=useState([{}])
    const [categorie,setCategorie]=useState('')
    const [fin,setFin]=useState(false)
    const [elementsDispoInit,setElementsDispoInit]=useState([{}])
    const [elementsDispo,setElementsDispo]=useState([{}])
    const [fieldValidationErrors,setFieldValidationErrors] = useState({
        message:'',
        error:false})

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

const delMenuActuelEl = (e) =>{
    const actuel = menuActuel
    const newBrut = totalBrut-e.prix_HT
    actuel.splice(actuel.indexOf(e), 1)
    setMenuActuel(actuel)
    setElementsDispo(elementsDispo => [...elementsDispo, e])
    setElementsDispoInit(elementsDispoInit => [...elementsDispoInit, e])
    setTotalBrut(newBrut)
}

const updateTotalNet = (b,v) => {
    (v>0) ? setTotalNet(b*((1-(v/100)))):
    setTotalNet(totalBrut)
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



const updateCat = (c) => 
{
    if (c === '')  setElementsDispo(elementsDispoInit)
    else {
    const dispo = elementsDispoInit
    setElementsDispo(dispo.filter(el => el.categorie===c))
}
}

    const handleChange = (e) => {
        const name = e.currentTarget.name
        const value = e.currentTarget.value
        if ((name === "remise") && (value>0)) {
            setRemise(value)
            if(totalBrut >0 ) updateTotalNet(value)
        }
        if (name=== 'categorie') 
        {
            setCategorie(e.target.value)
            updateCat(e.target.value)
        }
    }
    useEffect(() => {   
        updateTotalNet(totalBrut,remise)
        updateCat(categorie)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalBrut,remise]);
    useEffect(()=>
    {
        async function updateCategories() {
            setCategories(await fetchWrapper.get(`http://localhost:3001/categorie/ByRestaurant/${idRestaurant}`))
            const e = await fetchWrapper.get(`http://localhost:3001/element/ByRestaurant/${idRestaurant}`)
            setElementsDispo(e)
            setElementsDispoInit(e)
        }
        updateCategories()


    },[])

    return (
        <div>
            {(fin) ?
            <div>
                <h3>Menu ajouté !!!</h3>
            </div>
            :
            <div id='AjouterunMenuForm'>
                <div>
                <img src={menu} alt="Logo" className='logo' />
                </div>
                <div className='AUMdiv'>
                    <div className='AUMdiv'> 
                    <label className='AUMtitre'><b>Créez vos menus personnalisés</b><br/></label><br/><br/>
                    <label><b>Nom de votre menu :&ensp;</b></label>
                    <input type="text" className='input' placeholder="nom" onChange={(e) => setNom(e.currentTarget.value)} name='nom'value={nom} required/>
                    </div><br/><br/>

                    <div>
                        <h2>Eléments disponibles : </h2><br/>
                        <div>
                        Filtre : &ensp;
                        <select  value={categorie}  name="categorie" onChange={handleChange}>
                            <option></option>
                            {categories.map((cat) => 
                                <option value={cat.nom} key={cat._id}>{cat.nom} </option>
                            )}
                            </select><br/><br/>
                    </div>
                        <table className='tableItem'>
                            <thead>
                                <tr className='cattableau'>
                                    <th>Nom de l'élément</th>
                                    <th>Description</th>
                                    <th>Catégorie</th>
                                    <th>Prix HT</th>
                                    <th></th>
                                </tr>
                            </thead>
                        <tbody>

                            {
                            (elementsDispo) &&
                            elementsDispo.map((element) =>                        
                            <tr key={element._id}>
                                <td >{element.nom}</td>
                                <td >{element.description}</td>
                                <td className='petitecolonne'>{element.categorie}</td>
                                <td className='petitecolonne'>{element.prix_HT}</td>
                                <td className='petitecolonne'><button onClick={() =>updateMenu(element)}>➕</button></td>
                            </tr> )

                            }
                        </tbody>
                        </table>
                    </div><br/><br/><br/>
                    <div>
                        <h2>Actuellement dans votre menu : </h2><br/>
                        {
                        (menuActuel) &&
                        <table className='tableItem'>
                            <thead>
                                <tr>
                                    <th>Nom de l'élément</th>
                                    <th>Description</th>
                                    <th>Catégorie</th>
                                    <th>Prix HT</th>
                                    <th></th>
                                </tr>
                            </thead>
                        <tbody>
                        {menuActuel.map((element) =>                        
                            <tr key={element._id}>
                                <td >{element.nom}</td>
                                <td >{element.description}</td>
                                <td className='petitecolonne'>{element.categorie}</td>
                                <td className='petitecolonne'>{element.prix_HT}</td>
                                <td className='petitecolonne'><button onClick={() =>delMenuActuelEl(element)}>➖</button></td>
                            </tr> )}
                        </tbody>
                        </table>
                        }
                    </div><br/><br/>
                    <div>
                        <h4>Montant total Brut : {totalBrut.toFixed(2)} €  </h4><br/>
                        <div>
                            Remise (en %) &ensp;
                        <input type="number" className='input' name="remise" value={remise} onChange={handleChange} />
                        </div><br/>
                        <h4>Montant total Net : {totalNet.toFixed(2)} €  </h4>
                    </div>
                    <div className='endbutton'>
                        <button className='buttonstyle' onClick={() => updateBD()}>Enregistrer</button><br/><br/>
                        <button className='buttonstyle' >Annuler</button>
                    </div>
                </div>
                {(fieldValidationErrors.error) && 
                <div className='error'>
                <label >{fieldValidationErrors.message}</label>
                </div>}
            </div>}
        </div> 
        );
}

export default AjouterunMenu;
